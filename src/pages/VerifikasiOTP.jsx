import { createSignal, onMount, onCleanup, Show } from "solid-js";
import { FiAlertCircle, FiCheckCircle } from "solid-icons/fi";

export default function VerifikasiOTP() {
  const [otp, setOtp] = createSignal(["", "", "", "", "", ""]);
  const [email, setEmail] = createSignal("");
  const [loading, setLoading] = createSignal(false);

  // --- resend state ---
  const [resendLoading, setResendLoading] = createSignal(false);
  const [resendMsg, setResendMsg] = createSignal({ type: "", text: "" }); // 'success' | 'error'
  const [cooldown, setCooldown] = createSignal(0); // detik
  let timerId;

  // ===== POPUP STATE =====
  // type: "success" | "error" | "info"
  const [popupOpen, setPopupOpen] = createSignal(false);
  const [popupType, setPopupType] = createSignal("info");
  const [popupTitle, setPopupTitle] = createSignal("");
  const [popupMsg, setPopupMsg] = createSignal("");
  const [popupPrimaryText, setPopupPrimaryText] = createSignal("OK");
  const [popupSecondaryText, setPopupSecondaryText] = createSignal("");
  let popupPrimaryAction = () => setPopupOpen(false);
  let popupSecondaryAction = () => setPopupOpen(false);

  const openPopup = ({
    type = "info",
    title = "",
    msg = "",
    primaryText = "OK",
    onPrimary = () => setPopupOpen(false),
    secondaryText = "",
    onSecondary = () => setPopupOpen(false),
  }) => {
    setPopupType(type);
    setPopupTitle(title);
    setPopupMsg(msg);
    setPopupPrimaryText(primaryText);
    setPopupSecondaryText(secondaryText);
    popupPrimaryAction = onPrimary;
    popupSecondaryAction = onSecondary;
    setPopupOpen(true);
  };
  const closePopup = () => setPopupOpen(false);

  const IconByType = () =>
    popupType() === "success" ? (
      <FiCheckCircle size={60} class="text-green-500 mb-3" />
    ) : popupType() === "error" ? (
      <FiAlertCircle size={60} class="text-red-500 mb-3" />
    ) : (
      <FiAlertCircle size={60} class="text-[#264653] mb-3" />
    );

  // ambil email yg disimpan saat register + fokus input pertama
  onMount(() => {
    const pending = localStorage.getItem("pendingEmail");
    if (pending) setEmail(pending);
    const el = document.getElementById("otp-0");
    if (el) el.focus();
  });

  // ESC untuk nutup popup
  const onKeyDownGlobal = (e) => {
    if (e.key === "Escape" && popupOpen()) closePopup();
  };
  onMount(() => window.addEventListener("keydown", onKeyDownGlobal));
  onCleanup(() => {
    window.removeEventListener("keydown", onKeyDownGlobal);
    if (timerId) clearInterval(timerId);
  });

  const startCooldown = (seconds = 30) => {
    setCooldown(seconds);
    if (timerId) clearInterval(timerId);
    timerId = setInterval(() => {
      setCooldown((c) => {
        if (c <= 1) {
          clearInterval(timerId);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
  };

  const handleResend = async () => {
    if (!email()) {
      setResendMsg({
        type: "error",
        text: "Email tidak ditemukan. Ulangi proses registrasi.",
      });
      return;
    }
    if (cooldown() > 0 || resendLoading()) return;

    setResendLoading(true);
    setResendMsg({ type: "", text: "" });

    try {
      const res = await fetch("http://127.0.0.1:8080/users/resend_otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email().trim() }),
      });

      let ok = res.ok;
      let payload;
      try {
        payload = await res.json();
      } catch {
        payload = { message: await res.text() };
      }

      if (!ok) {
        setResendMsg({
          type: "error",
          text: payload?.message || "Gagal mengirim ulang OTP.",
        });
        return;
      }

      setResendMsg({
        type: payload?.sent ? "success" : "error",
        text:
          payload?.message ||
          (payload?.sent
            ? "OTP telah dikirim ulang."
            : "OTP dibuat ulang, namun email gagal dikirim."),
      });

      startCooldown(30);
    } catch (e) {
      console.error(e);
      setResendMsg({
        type: "error",
        text: "Kesalahan jaringan saat mengirim ulang OTP.",
      });
    } finally {
      setResendLoading(false);
    }
  };

  const handleOtpInput = (index, e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    const newOtp = [...otp()];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp()[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleVerify = async () => {
    const code = otp().join("").trim();
    if (!email() || code.length !== 6) {
      openPopup({
        type: "error",
        title: "Data Belum Lengkap",
        msg: "Email atau kode OTP belum lengkap. Pastikan 6 digit OTP terisi.",
        primaryText: "Tutup",
      });
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("http://127.0.0.1:8080/users/verified", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email().trim(), otp: code }),
      });

      const text = await res.text();
      if (!res.ok) {
        openPopup({
          type: "error",
          title: "Verifikasi Gagal",
          msg: text || "Kode OTP tidak valid atau sudah kadaluarsa.",
          primaryText: "Tutup",
        });
        return;
      }

      // sukses
      localStorage.removeItem("pendingEmail");
      openPopup({
        type: "success",
        title: "Verifikasi Berhasil",
        msg: "Akun kamu sudah terverifikasi. Silakan login untuk melanjutkan.",
        primaryText: "Masuk Sekarang",
        onPrimary: () => {
          setPopupOpen(false);
          window.location.href = "/signin";
        },
        secondaryText: "Nanti Saja",
        onSecondary: () => setPopupOpen(false),
      });
    } catch (err) {
      console.error(err);
      openPopup({
        type: "error",
        title: "Kesalahan Jaringan",
        msg: "Tidak dapat terhubung ke server. Periksa koneksi internet kamu lalu coba lagi.",
        primaryText: "Tutup",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section class="flex flex-col lg:flex-row min-h-screen bg-white rounded-3xl overflow-hidden">
      <div class="w-full lg:w-1/2 flex flex-col justify-between px-2 lg:px-8">
        <div>
          <a href="/" class="flex items-center justify-center lg:justify-start">
            <h1 class="font-semibold text-2xl text-black">RuangNusantara</h1>
          </a>
        </div>

        <div class="flex-1 flex flex-col justify-center max-w-md mx-auto w-full mt-20 lg:mt-0">
          <p class="text-3xl font-bold text-center mb-3 text-black">
            Verifikasi Kode OTP Anda
          </p>
          <p class="text-gray-500 text-center mb-8">
            Kami telah mengirimkan kode verifikasi ke email Anda. Masukkan kode
            untuk melanjutkan.
          </p>
          <label class="block mb-3 text-black font-medium text-base">
            Masukan Kode Otp
          </label>

          <div class="flex gap-2 justify-center mb-6">
            {[...Array(6)].map((_, idx) => (
              <input
                id={`otp-${idx}`}
                key={idx}
                type="text"
                inputMode="numeric"
                maxLength={1}
                autoComplete="one-time-code"
                class="input input-bordered w-12 h-12 text-2xl text-center rounded-lg focus:outline-none focus:ring-2 focus:ring-[#264653] text-black bg-white"
                style="box-shadow: 0px 1px 2px rgba(13,13,18,0.06); border:1px solid #DFE1E6;"
                value={otp()[idx]}
                onInput={(e) => handleOtpInput(idx, e)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
              />
            ))}
          </div>

          <button
            type="button"
            class="btn w-full bg-[#1E3A40] hover:bg-[#25484f] text-white rounded-xl mt-2"
            disabled={loading()}
            onClick={handleVerify}
          >
            {loading() ? "Memverifikasi..." : "Verify Account"}
          </button>

          <p class="text-center text-sm mt-6 text-gray-500 font-medium">
            Masukkan 6 digit kode OTP yang baru saja kami kirimkan.
          </p>

          <div class="flex items-center justify-center mt-1">
            <button
              class="btn btn-link text-[#264653] underline p-0"
              type="button"
              disabled={resendLoading() || cooldown() > 0}
              onClick={handleResend}
              title={
                cooldown() > 0
                  ? `Tunggu ${cooldown()}s`
                  : "Kirim ulang kode ke email"
              }
            >
              {resendLoading()
                ? "Mengirim ulang…"
                : cooldown() > 0
                ? `Kirim Ulang Kode (${cooldown()}s)`
                : "Kirim Ulang Kode"}
            </button>

            {resendMsg().text && (
              <span
                class={`text-sm ${
                  resendMsg().type === "success"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {resendMsg().text}
              </span>
            )}
          </div>
        </div>

        <footer class="text-center text-gray-500 text-sm mt-10">
          © 2025 <span class="font-semibold text-black">Ruang Nusantara</span>
        </footer>
      </div>

      <div class="hidden lg:flex w-1/2">
        <img
          src="/src/assets/images/VerifikasiOtpPict.png"
          alt="Tarian Nusantara"
          class="object-cover w-full h-full"
        />
      </div>

      {/* ===== POPUP ===== */}
      <Show when={popupOpen()}>
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div class="bg-white rounded-lg shadow-xl p-6 w-96">
            <div class="flex flex-col items-center text-center">
              <IconByType />
              <h2 class="text-lg font-semibold text-gray-800 mb-2">
                {popupTitle()}
              </h2>
              <p class="text-sm text-gray-600 mb-6">{popupMsg()}</p>

              <div class="flex gap-4">
                <button
                  onClick={() => popupPrimaryAction()}
                  class="px-4 py-2 bg-[#264653] text-white rounded-lg hover:bg-[#516B75] transition"
                >
                  {popupPrimaryText()}
                </button>

                <Show when={popupSecondaryText()}>
                  <button
                    onClick={() => popupSecondaryAction()}
                    class="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                  >
                    {popupSecondaryText()}
                  </button>
                </Show>
              </div>
            </div>
          </div>
        </div>
      </Show>
    </section>
  );
}

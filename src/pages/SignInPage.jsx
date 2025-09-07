import { createSignal, Show } from "solid-js";
import { FiAlertCircle, FiCheckCircle } from "solid-icons/fi";

export default function SignInPage() {
  const [showPassword, setShowPassword] = createSignal(false);
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [loading, setLoading] = createSignal(false);

  // ===== POPUP STATE =====
  const [popupOpen, setPopupOpen] = createSignal(false);
  const [popupType, setPopupType] = createSignal("info"); // "success" | "error" | "info"
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

  const IconByType = () =>
    popupType() === "success" ? (
      <FiCheckCircle size={60} class="text-green-500 mb-3" />
    ) : popupType() === "error" ? (
      <FiAlertCircle size={60} class="text-red-500 mb-3" />
    ) : (
      <FiAlertCircle size={60} class="text-[#264653] mb-3" />
    );

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch("http://127.0.0.1:8080/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          login: email().trim(),
          password: password(),
        }),
      });

      let payload;
      try {
        payload = await res.json();
      } catch {
        payload = await res.text();
      }

      // === khusus email belum terverifikasi ===
      if (res.status === 403) {
        const msg =
          (typeof payload === "string" ? payload : "") ||
          (payload?.message ?? "Email belum terverifikasi.");
        openPopup({
          type: "error",
          title: "Email Belum Terverifikasi",
          msg,
          primaryText: "Verifikasi Sekarang",
          onPrimary: () => {
            if (typeof payload !== "string" && payload?.email) {
              localStorage.setItem("pendingEmail", payload.email);
            } else if (email()) {
              localStorage.setItem("pendingEmail", email().trim());
            }
            setPopupOpen(false);
            window.location.href = "/verifikasi";
          },
          secondaryText: "Tutup",
          onSecondary: () => setPopupOpen(false),
        });
        return;
      }

      if (!res.ok) {
        const msg =
          (typeof payload === "string" ? payload : "") ||
          (payload?.message ?? "Login gagal.");
        openPopup({
          type: "error",
          title: "Login Gagal",
          msg,
          primaryText: "Tutup",
        });
        return;
      }

      // === sukses login ===
      const data = typeof payload === "string" ? JSON.parse(payload) : payload; // { token, user_id, username, email }
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("currentUser", JSON.stringify(data));

      // Ambil role, simpan, dan tentukan redirect
      let nextHref = "/";
      try {
        const meRes = await fetch("http://127.0.0.1:8080/users/me", {
          headers: { Authorization: `Bearer ${data.token}` },
        });
        if (meRes.ok) {
          const me = await meRes.json(); // { id, username, email, role }
          const role = (me.role || "").toLowerCase();
          localStorage.setItem(
            "currentUser",
            JSON.stringify({ ...data, role })
          );
          if (role === "admin") nextHref = "/usersmanagement";
        }
      } catch {
        /* biarkan fallback ke "/" */
      }

      openPopup({
        type: "success",
        title: "Berhasil Masuk",
        msg: `Selamat datang, ${data.username}!`,
        primaryText: "Lanjut",
        onPrimary: () => {
          setPopupOpen(false);
          window.location.href = nextHref;
        },
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
      {/* Left - Form */}
      <div class="w-full lg:w-1/2 flex flex-col justify-between px-2 lg:px-8">
        <a href="/" class="flex items-center justify-center lg:justify-start">
          <h1 class="font-semibold text-2xl text-black">RuangNusantara</h1>
        </a>

        <div class="flex-1 flex flex-col justify-center max-w-md mx-auto w-full mt-20 lg:mt-0">
          <p class="text-3xl font-bold text-center mb-3 text-black">
            Selamat Datang Kembali di <br /> RuangNusantara
          </p>
          <p class="text-gray-500 text-center mb-8">
            Masuk untuk melanjutkan perjalananmu menjelajahi seni, musik, dan
            budaya Nusantara.
          </p>

          <form class="space-y-4" onSubmit={handleSignIn}>
            {/* Email / Username */}
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text text-black">Email / Username</span>
              </label>
              <div
                class="flex items-center gap-2 w-full rounded-lg px-3 py-2 bg-white"
                style="border: 1px solid #DFE1E6; box-shadow: 0px 1px 2px rgba(13, 13, 18, 0.06);"
              >
                <img
                  src="/src/assets/images/EmailIcon.svg"
                  alt="email icon"
                  class="w-5 h-5"
                />
                <input
                  type="text"
                  placeholder="Masukkan email atau username"
                  class="grow outline-none bg-transparent text-black"
                  required
                  value={email()}
                  onInput={(e) => setEmail(e.currentTarget.value)}
                />
              </div>
            </div>

            {/* Password */}
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text text-black">Password</span>
              </label>
              <div
                class="flex items-center gap-2 w-full rounded-lg px-3 py-2 bg-white"
                style="border: 1px solid #DFE1E6; box-shadow: 0px 1px 2px rgba(13, 13, 18, 0.06);"
              >
                <img
                  src="/src/assets/images/LockIcon.svg"
                  alt="lock icon"
                  class="w-5 h-5"
                />
                <input
                  type={showPassword() ? "text" : "password"}
                  placeholder="Masukkan Password"
                  class="grow outline-none bg-transparent text-black"
                  required
                  value={password()}
                  onInput={(e) => setPassword(e.currentTarget.value)}
                />
                <img
                  src={
                    showPassword()
                      ? "/src/assets/images/EyeIcon.svg"
                      : "/src/assets/images/EyeSlashIcon.svg"
                  }
                  alt="toggle password"
                  class="w-5 h-5 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword())}
                />
              </div>

              <label class="label flex justify-between mt-3">
                <div class="flex items-center gap-2">
                  <input type="checkbox" class="checkbox checkbox-sm" />
                  <span class="label-text text-[#959595]">Ingatkan Saya</span>
                </div>
                <a href="/forgot-password" class="text-sm text-red-500">
                  Lupa Password?
                </a>
              </label>
            </div>

            <button
              class="btn w-full bg-[#1E3A40] hover:bg-[#25484f] text-white rounded-xl"
              disabled={loading()}
            >
              {loading() ? "Memproses..." : "Masuk"}
            </button>
          </form>

          <p
            class="text-center text-sm mt-6"
            style="color: #959595; font-weight: 500"
          >
            Belum Punya Akun?{" "}
            <a
              href="/signup"
              class="font-medium"
              style="color: #264653; font-weight: 600;"
            >
              Registrasi Sekarang!
            </a>
          </p>
        </div>

        <footer class="text-center text-gray-500 text-sm mt-10">
          © 2025 <span class="font-semibold text-black">Ruang Nusantara</span>
        </footer>
      </div>

      <div class="hidden lg:flex w-1/2">
        <img
          src="/src/assets/images/SignInPict.png"
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

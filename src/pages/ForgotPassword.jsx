import { createSignal, Show } from "solid-js";
import { FiAlertCircle, FiCheckCircle } from "solid-icons/fi";

const securityQuestions = [
  "Siapa nama ibu kandung Anda?",
  "Apa nama sekolah dasar Anda?",
  "Di kota mana Anda lahir?",
  "Apa makanan favorit Anda?",
  "Siapa nama hewan peliharaan Anda?",
];

export default function ForgotPassword() {
  const [showPassword, setShowPassword] = createSignal(false);
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [securityQuestion, setSecurityQuestion] = createSignal("");
  const [securityAnswer, setSecurityAnswer] = createSignal("");
  const [submitting, setSubmitting] = createSignal(false);

  // ===== POPUP STATE =====
  const [popupOpen, setPopupOpen] = createSignal(false);
  const [popupType, setPopupType] = createSignal("info"); // success | error | info
  const [popupTitle, setPopupTitle] = createSignal("");
  const [popupMsg, setPopupMsg] = createSignal("");
  const [popupPrimaryText, setPopupPrimaryText] = createSignal("OK");
  const [popupSecondaryText, setPopupSecondaryText] = createSignal("");
  let popupPrimaryAction = () => setPopupOpen(false);
  let popupSecondaryAction = () => setPopupOpen(false);

  const openPopup = ({
    type,
    title,
    msg,
    primaryText = "OK",
    onPrimary,
    secondaryText = "",
    onSecondary,
  }) => {
    setPopupType(type);
    setPopupTitle(title);
    setPopupMsg(msg);
    setPopupPrimaryText(primaryText);
    setPopupSecondaryText(secondaryText);
    popupPrimaryAction = onPrimary || (() => setPopupOpen(false));
    popupSecondaryAction = onSecondary || (() => setPopupOpen(false));
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

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    // Validasi ringan
    if (!email() || !password() || !securityQuestion() || !securityAnswer()) {
      openPopup({
        type: "error",
        title: "Form Belum Lengkap",
        msg: "Harap isi semua kolom sebelum melanjutkan.",
      });
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch("http://127.0.0.1:8080/users/forgot_password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email().trim(),
          security_question: securityQuestion(),
          security_answer: securityAnswer(),
          password: password(),
        }),
      });

      // fleksibel: bisa JSON atau text
      let payload;
      try {
        payload = await res.json();
      } catch {
        payload = await res.text();
      }

      if (!res.ok) {
        openPopup({
          type: "error",
          title: "Gagal Reset Password",
          msg:
            (typeof payload === "string"
              ? payload
              : payload?.error || payload) ||
            "Terjadi kesalahan saat mereset password.",
        });
        return;
      }

      openPopup({
        type: "success",
        title: "Berhasil!",
        msg:
          (typeof payload === "string" ? payload : payload?.message) ||
          "Password berhasil direset.",
        primaryText: "Masuk Sekarang",
        onPrimary: () => {
          setPopupOpen(false);
          window.location.href = "/signin";
        },
      });
    } catch (err) {
      console.error(err);
      openPopup({
        type: "error",
        title: "Kesalahan Jaringan",
        msg: "Tidak dapat terhubung ke server. Coba lagi nanti.",
      });
    } finally {
      setSubmitting(false);
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
            Reset Password
          </p>
          <p class="text-gray-500 text-center mb-8">
            Masukkan email, pilih pertanyaan keamanan, dan masukkan password
            baru Anda.
          </p>

          <form class="space-y-4" onSubmit={handleForgotPassword}>
            {/* Email */}
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text text-black">Email</span>
              </label>
              <div
                class="flex items-center gap-2 w-full rounded-lg px-3 py-2 bg-white"
                style="border: 1px solid #DFE1E6; box-shadow: 0px 1px 2px rgba(13,13,18,0.06);"
              >
                <img
                  src="/src/assets/images/EmailIcon.svg"
                  alt="email icon"
                  class="w-5 h-5"
                />
                <input
                  type="email"
                  class="grow outline-none bg-transparent text-black"
                  required
                  placeholder="Masukkan email"
                  value={email()}
                  onInput={(e) => setEmail(e.currentTarget.value)}
                />
              </div>
            </div>

            {/* Pertanyaan Keamanan */}
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text text-black">Pertanyaan Keamanan</span>
              </label>
              <div
                class="flex items-center gap-2 w-full rounded-lg px-3 py-2 bg-white"
                style="border: 1px solid #DFE1E6; box-shadow: 0px 1px 2px rgba(13,13,18,0.06);"
              >
                <select
                  class="grow outline-none bg-transparent text-black appearance-none"
                  required
                  style="border:none;box-shadow:none;font-size:1rem;"
                  value={securityQuestion()}
                  onInput={(e) => setSecurityQuestion(e.currentTarget.value)}
                >
                  <option value="" disabled selected style="color:#959595;">
                    Pilih pertanyaan keamanan
                  </option>
                  {securityQuestions.map((q) => (
                    <option value={q} style="color:#111827;background:white;">
                      {q}
                    </option>
                  ))}
                </select>
                <img
                  src="/src/assets/images/DropdownIcon.svg"
                  alt="dropdown arrow"
                  class="w-4 h-4"
                />
              </div>
            </div>

            {/* Jawaban Keamanan */}
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text text-black">
                  Jawab Pertanyaan Keamanan
                </span>
              </label>
              <div
                class="flex items-center gap-2 w-full rounded-lg px-3 py-2 bg-white"
                style="border: 1px solid #DFE1E6; box-shadow: 0px 1px 2px rgba(13,13,18,0.06);"
              >
                <input
                  type="text"
                  class="grow outline-none bg-transparent text-black"
                  required
                  placeholder="Masukkan jawaban Anda"
                  value={securityAnswer()}
                  onInput={(e) => setSecurityAnswer(e.currentTarget.value)}
                />
              </div>
            </div>

            {/* Password Baru */}
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text text-black">Password Baru</span>
              </label>
              <div
                class="flex items-center gap-2 w-full rounded-lg px-3 py-2 bg-white"
                style="border: 1px solid #DFE1E6; box-shadow: 0px 1px 2px rgba(13,13,18,0.06);"
              >
                <img
                  src="/src/assets/images/LockIcon.svg"
                  alt="lock icon"
                  class="w-5 h-5"
                />
                <input
                  type={showPassword() ? "text" : "password"}
                  class="grow outline-none bg-transparent text-black"
                  required
                  placeholder="Masukkan password baru"
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
            </div>

            {/* Button */}
            <button
              class="btn w-full bg-[#1E3A40] hover:bg-[#25484f] text-white rounded-xl"
              disabled={submitting()}
            >
              {submitting() ? "Memproses..." : "Simpan"}
            </button>
          </form>

          <p
            class="text-center text-sm mt-6"
            style="color:#959595; font-weight:500"
          >
            Ingat password Anda?{" "}
            <a
              href="/signin"
              class="font-medium"
              style="color:#264653; font-weight:600;"
            >
              Masuk Sekarang!
            </a>
          </p>
        </div>

        <footer class="text-center text-gray-500 text-sm mt-10">
          © 2025 <span class="font-semibold text-black">Ruang Nusantara</span>
        </footer>
      </div>

      {/* Right - Image */}
      <div class="hidden lg:flex w-1/2">
        <img
          src="/src/assets/images/SignUpPict.png"
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

import { createSignal } from "solid-js";

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

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:8080/users/forgot_password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email(),
          security_question: securityQuestion(),
          security_answer: securityAnswer(),
          password: password(),
        }),
      });

      if (!res.ok) {
        const msg = await res.text();
        alert("Gagal reset password: " + msg);
        return;
      }

      const data = await res.json();
      alert(data || "Password berhasil direset!");
      window.location.href = "/signin";
    } catch (err) {
      console.error(err);
      alert("Terjadi error koneksi ke server.");
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
            baru anda.
          </p>

          {/* ubah jadi handleForgotPassword */}
          <form class="space-y-4" onSubmit={handleForgotPassword}>
            {/* Email */}
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text text-black">Email</span>
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
                  type="email"
                  class="grow outline-none bg-transparent text-black"
                  required
                  placeholder="Masukkan email"
                  value={email()}
                  onInput={(e) => setEmail(e.target.value)}
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
                  onChange={(e) => setSecurityQuestion(e.target.value)}
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

            {/* Jawab Keamanan */}
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text text-black">
                  Jawab Pertanyaan Keamanan
                </span>
              </label>
              <div
                class="flex items-center gap-2 w-full rounded-lg px-3 py-2 bg-white"
                style="border: 1px solid #DFE1E6; box-shadow: 0px 1px 2px rgba(13, 13, 18, 0.06);"
              >
                <input
                  type="text"
                  class="grow outline-none bg-transparent text-black"
                  required
                  placeholder="Masukkan jawaban Anda"
                  value={securityAnswer()}
                  onInput={(e) => setSecurityAnswer(e.target.value)}
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
                style="border: 1px solid #DFE1E6; box-shadow: 0px 1px 2px rgba(13, 13, 18, 0.06);"
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
                  placeholder="Masukkan Password baru"
                  value={password()}
                  onInput={(e) => setPassword(e.target.value)}
                />
                <img
                  src={
                    showPassword()
                      ? "/src/assets/images/EyeIcon.svg"
                      : "/src/assets/images/EyeSlashIcon.svg"
                  }
                  alt="toggle password"
                  class="w-5 h-5 cursor-pointer"
                  onclick={() => setShowPassword(!showPassword())}
                />
              </div>
            </div>

            {/* Button */}
            <button class="btn w-full bg-[#1E3A40] hover:bg-[#25484f] text-white rounded-xl">
              Simpan
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
    </section>
  );
}

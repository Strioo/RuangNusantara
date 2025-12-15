import AOS from "aos";
import { createSignal, onMount } from "solid-js";
import "aos/dist/aos.css";

export default function SignUpPage() {
  onMount(() => {
    AOS.init({ once: true });
  });

  const [showPassword, setShowPassword] = createSignal(false);
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");

  const handleSignIn = (e) => {
    e.preventDefault();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.length === 0) {
      alert("Belum ada akun. Silakan daftar dulu.");
      window.location.href = "/signup";
      return;
    }

    const user = users.find(
      (u) => u.email === email() && u.password === password()
    );

    if (user) {
      alert(`Selamat datang, ${user.username}!`);
      localStorage.setItem("currentUser", JSON.stringify(user));
      window.location.href = "/"; // ganti sesuai page setelah login
    } else {
      alert("Email atau password salah!");
    }
  };

  return (
    <section class="flex flex-col lg:flex-row min-h-screen bg-white rounded-3xl overflow-hidden">
      {/* Left - Form */}
      <div data-aos="fade-right" class="w-full lg:w-1/2 flex flex-col justify-between px-2 lg:px-8">
        {/* Logo / Back Home */}
          <a href="/" class="flex items-center justify-center lg:justify-start">
            <h1 class="font-semibold text-2xl text-black">RuangNusantara</h1>
          </a>

        {/* Form Section */}
        <div class="flex-1 flex flex-col justify-center max-w-md mx-auto w-full mt-20 lg:mt-0">
          <p data-aos="fade-up" class="text-3xl font-bold text-center mb-3 text-black">
            Selamat Datang Kembali di <br /> RuangNusantara
          </p>
          <p data-aos="fade-up" class="text-gray-500 text-center mb-8">
            Masuk untuk melanjutkan perjalananmu menjelajahi seni, musik, dan
            budaya Nusantara.
          </p>

          <form data-aos="fade-up" class="space-y-4" onSubmit={handleSignIn}>
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
                  src="/src/assets/images/icons/EmailIcon.svg"
                  alt="email icon"
                  class="w-5 h-5"
                />
                <input
                  type="email"
                  placeholder="Masukkan email"
                  class="grow outline-none bg-transparent text-black"
                  required
                  value={email()}
                  onInput={(e) => setEmail(e.target.value)}
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
                  src="/src/assets/images/icons/LockIcon.svg"
                  alt="lock icon"
                  class="w-5 h-5"
                />
                <input
                  type={showPassword() ? "text" : "password"}
                  placeholder="Masukkan Password"
                  class="grow outline-none bg-transparent text-black"
                  required
                  value={password()}
                  onInput={(e) => setPassword(e.target.value)}
                />
                <img
                  src={
                    showPassword()
                      ? "/src/assets/images/icons/EyeIcon.svg"
                      : "/src/assets/images/icons/EyeSlashIcon.svg"
                  }
                  alt="toggle password"
                  class="w-5 h-5 cursor-pointer"
                  onclick={() => setShowPassword(!showPassword())}
                />
              </div>

              {/* Ingatkan Saya & Lupa Password */}
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

            {/* Button */}
            <button class="btn w-full bg-[#1E3A40] hover:bg-[#25484f] text-white rounded-xl">
              Masuk
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

        {/* Footer */}
        <footer class="text-center text-gray-500 text-sm mt-10">
          © 2025 <span class="font-semibold text-black">Ruang Nusantara</span>
        </footer>
      </div>

      {/* Right - Image */}
      <div data-aos="fade-left" class="hidden lg:flex w-1/2">
        <img
          src="/src/assets/images/auth/SignInPict.png"
          alt="Tarian Nusantara"
          class="object-cover w-full h-full"
        />
      </div>
    </section>
  );
}

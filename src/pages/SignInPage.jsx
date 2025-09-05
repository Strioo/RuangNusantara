import { createSignal } from "solid-js";

export default function SignInPage() {
  const [showPassword, setShowPassword] = createSignal(false);
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [loading, setLoading] = createSignal(false);

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

      const data = await res.json();
      if (!res.ok) {
        alert(data || "Login gagal.");
        return;
      }

      // simpan token + user info ke localStorage
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("currentUser", JSON.stringify(data));

      alert(`Selamat datang, ${data.username}!`);
      window.location.href = "/"; // arahkan ke halaman utama/dashboard
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan jaringan. Coba lagi.");
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
            {/* Email */}
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
    </section>
  );
}

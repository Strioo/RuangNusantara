import { createSignal } from "solid-js";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = createSignal(false);

  return (
    <section class="flex flex-col lg:flex-row min-h-screen bg-white rounded-3xl overflow-hidden">
      {/* Left - Form */}
      <div class="w-full lg:w-1/2 flex flex-col justify-between p-6 lg:p-12">
        {/* Logo / Back Home */}
        <div>
          <a href="/" class="flex items-center gap-2">
            <img src="/logo.svg" alt="Logo" class="h-8" />
            <span class="font-bold text-xl text-black">Ruang Nusantara</span>
          </a>
        </div>

        {/* Form Section */}
        <div class="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
          <h1 class="text-3xl font-bold text-center mb-3 text-black">
            Selamat Datang di <br /> Ruang Nusantara
          </h1>
          <p class="text-gray-500 text-center mb-8">
            Masuk untuk melanjutkan perjalananmu menjelajahi seni, musik, dan
            budaya Nusantara.
          </p>

          <form class="space-y-4">
            
            {/* Username */}
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text text-black">Username</span>
              </label>
              <div
                class="flex items-center gap-2 w-full rounded-lg px-3 py-2 bg-white"
                style="border: 1px solid #DFE1E6; box-shadow: 0px 1px 2px rgba(13, 13, 18, 0.06);"
              >
                <img
                  src="/src/assets/images/UserCircle.svg"
                  alt="user icon"
                  class="w-5 h-5"
                />
                <input
                  type="text"
                  placeholder="Enter your username"
                  class="grow outline-none bg-transparent text-black"
                />
              </div>
            </div>

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
                  placeholder="Enter your email"
                  class="grow outline-none bg-transparent text-black"
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
                  placeholder="Enter your password"
                  class="grow outline-none bg-transparent text-black"
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
              Registrasi
            </button>
          </form>

          <p class="text-center text-sm mt-6" style="color: #959595; font-weight: 500">
            Sudah Punya Akun?{" "}
            <a href="/login" class="font-medium" style="color: #264653; font-weight: 600;">
              Masuk Sekarang!
            </a>
          </p>
        </div>

        {/* Footer */}
        <footer class="text-center text-gray-500 text-sm mt-10">
          © 2025 <span class="font-semibold">Ruang Nusantara</span>
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

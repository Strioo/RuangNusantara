import { createSignal } from "solid-js";

export default function VerifikasiOTP() {
  const [otp, setOtp] = createSignal(["", "", "", "", "", ""]);

  // Fokus otomatis saat input angka
  const handleOtpInput = (index, e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    // Update hanya satu karakter
    const newOtp = [...otp()];
    newOtp[index] = value;
    setOtp(newOtp);
    // Pindah ke kotak berikutnya
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  // Backspace: pindah ke kotak kiri
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp()[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  return (
    <section class="flex flex-col lg:flex-row min-h-screen bg-white rounded-3xl overflow-hidden">
      {/* Left - Form */}
      <div class="w-full lg:w-1/2 flex flex-col justify-between px-2 lg:px-8">
        {/* Logo */}
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
            Kami telah mengirimkan kode verifikasi ke nomor/email Anda. Masukkan kode untuk melanjutkan.
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
          <button class="btn w-full bg-[#1E3A40] hover:bg-[#25484f] text-white rounded-xl mt-2">
            Verify Account
          </button>
          <p class="text-center text-sm mt-6 text-gray-500 font-medium">
            Masukkan 6 digit kode OTP yang baru saja kami kirimkan.
          </p>
          <button class="btn btn-link text-[#264653] underline mt-1" type="button" style="padding:0;">
            Kirim Ulang Kode
          </button>
        </div>
        <footer class="text-center text-gray-500 text-sm mt-10">
          © 2025 <span class="font-semibold text-black">Ruang Nusantara</span>
        </footer>
      </div>
      {/* Right - Image */}
      <div class="hidden lg:flex w-1/2">
        <img
          src="/src/assets/images/VerifikasiOtpPict.png"
          alt="Tarian Nusantara"
          class="object-cover w-full h-full"
        />
      </div>
    </section>
  );
}

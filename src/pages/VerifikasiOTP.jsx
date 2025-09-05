import { createSignal, onMount } from "solid-js";

export default function VerifikasiOTP() {
  const [otp, setOtp] = createSignal(["", "", "", "", "", ""]);
  const [email, setEmail] = createSignal("");
  const [loading, setLoading] = createSignal(false);

  // ambil email yg disimpan saat register
  onMount(() => {
    const pending = localStorage.getItem("pendingEmail");
    if (pending) setEmail(pending);
  });

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
      alert("Email atau kode OTP belum lengkap.");
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
        alert(text || "Verifikasi gagal.");
        return;
      }

      // sukses
      localStorage.removeItem("pendingEmail");
      alert("Verifikasi berhasil. Silakan login.");
      window.location.href = "/signin";
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan jaringan.");
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
          <button
            class="btn btn-link text-[#264653] underline mt-1"
            type="button"
            style="padding:0;"
          >
            Kirim Ulang Kode
          </button>
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
    </section>
  );
}

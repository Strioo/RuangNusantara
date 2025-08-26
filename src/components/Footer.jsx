export default function Footer() {
  return (
    <footer class="bg-[#1B323B] -mx-5 -mb-5 text-white px-8 pt-10 pb-0 relative overflow-hidden">
      <div class="flex flex-col md:flex-row md:items-start md:justify-start gap-12">
        {/* Kiri: Info */}
        <div class="md:w-[35%] w-full mb-12 z-10">
          <p class="text-lg font-bold mb-2">RuangNusantara</p>
          <p class="text-[16px] leading-relaxed opacity-80">
            Menjaga warisan, merangkai masa
            <br />
            depan. Bersama, kita lestari budaya <br />
            Indonesia agar tetap hidup di setiap generasi.
          </p>
        </div>

        {/* Tengah: Navigation */}
        <div class="md:w-1/3 w-full mb-12 z-10">
          <p class="text-lg font-bold mb-2">Navigation</p>
          <ul class="flex flex-col gap-1 text-base opacity-90">
            <li>
              <a class="hover:underline" href="#">
                Home
              </a>
            </li>
            <li>
              <a class="hover:underline" href="#">
                Tentang Kami
              </a>
            </li>
            <li>
              <a class="hover:underline" href="#">
                Fitur
              </a>
            </li>
            <li>
              <a class="hover:underline" href="#">
                Cerita Budaya
              </a>
            </li>
            <li>
              <a class="hover:underline" href="#">
                Kontak
              </a>
            </li>
          </ul>
        </div>

        {/* Kanan: Gambar */}
        <div class="absolute w-full flex justify-end top-5 mb-12">
          <img
            src="/src/assets/images/tari-nusantara.png"
            alt="Tarian Nusantara"
            class="object-contain drop-shadow-lg"
          />
        </div>
      </div>

      <div class="relative flex flex-col md:flex-row items-center pt-5 pb-1 mt-3 mb-0 gap-48 z-20">
        <div class="text-sm opacity-70">
          &copy; 2025 Budaya. All rights reserved.
        </div>
        <div class="flex gap-10 text-sm opacity-70">
          <a href="#" class="hover:underline">
            Privacy & Policy
          </a>
          <a href="#" class="hover:underline">
            Terms & Conditions
          </a>
        </div>
      </div>

      {/* Tulisan NUSANTARA besar di bawah */}
      <div class="relative w-full">
        <span class="text-[260px] font-extrabold text-white tracking-tight leading-none select-none opacity-100">
          NUSANTARA
        </span>
      </div>
    </footer>
  );
}

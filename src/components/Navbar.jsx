export default function Navbar() {
  return (
    <nav class="navbar max-w-max bg-white/20 border border-gray-100 rounded-full min-h-0 p-1">
      <div class="flex gap-3">
        <button class="btn py-6 px-7 text-xl btn-primary rounded-full font-light">
          Beranda
        </button>
        <button class="btn py-6 px-7 text-xl btn-ghost rounded-full hover:btn-primary text-white font-normal">
          Tentang
        </button>
        <button class="btn py-6 px-7 text-xl btn-ghost rounded-full hover:btn-primary text-white font-normal">
          Artikel
        </button>
        <button class="btn py-6 px-7 text-xl btn-ghost rounded-full hover:btn-primary text-white font-normal">
          Galeri
        </button>
      </div>
    </nav>
  );
}

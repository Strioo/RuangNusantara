export default function NavKategori() {
  return (
    <div class="flex flex-wrap gap-2 mb-8 bg-white/20 border border-gray-100 p-1 rounded-3xl sm:rounded-full justify-center w-full max-w-max mx-auto">
      <span class="px-4 py-3 rounded-full bg-white text-gray-900 font-semibold">
        Kategori:
      </span>
      <button class="btn btn-primary rounded-full my-auto">Seni & Musik</button>
      <div class="w-px h-7 bg-white/40 mx-2 my-auto hidden md:block"></div>
      <button class="btn btn-ghost rounded-full my-auto  font-normal hover:btn-primary">
        Pakaian Adat
      </button>
      <div class="w-px h-7 bg-white/40 mx-2 my-auto hidden md:block"></div>
      <button class="btn btn-ghost rounded-full my-auto font-normal hover:btn-primary">
        Tarian Tradisional
      </button>
      <div class="w-px h-7 bg-white/40 mx-2 my-auto hidden md:block"></div>
      <button class="btn btn-ghost rounded-full my-auto font-normal hover:btn-primary">
        Rumah Adat
      </button>
    </div>
  );
}

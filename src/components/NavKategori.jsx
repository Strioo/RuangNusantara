const categories = [
  "Permainan Tradisional",
  "Seni & Musik",
  "Pakaian Adat",
  "Tarian Tradisional",
];

function toSlug(name) {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "dan");
}

export default function NavKategori({ activeCategory, setActiveCategory }) {
  return (
    <div class="flex flex-wrap gap-2 mb-8 bg-white/20 border border-gray-100 p-1 rounded-3xl sm:rounded-full justify-center w-full max-w-max mx-auto">
      <span class="px-4 py-3 rounded-full bg-white text-gray-900 font-semibold whitespace-nowrap">
        Kategori:
      </span>
      {categories.map((cat, idx) => {
        const slug = toSlug(cat);
        const isActive = activeCategory() === slug;  // Perubahan di sini!
        return (
          <div key={slug} class="flex items-center">
            <button
              type="button"
              class={`btn rounded-full my-auto whitespace-nowrap ${
                isActive ? "btn-primary" : "btn-ghost font-normal hover:btn-primary"
              }`}
              onClick={() => setActiveCategory(slug)}
              aria-pressed={isActive ? "true" : "false"}
            >
              {cat}
            </button>
            {idx < categories.length - 1 && (
              <div class="w-px h-7 bg-white/40 mx-2 my-auto hidden md:block"></div>
            )}
          </div>
        );
      })}
    </div>
  );
}


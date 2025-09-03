import { createSignal, createResource, onMount } from "solid-js";
import CardArtikel from "../../components/CardArtikel";

const fetchArticles = async () => {
  const res = await fetch("http://localhost:4000/artikel");
  if (!res.ok) throw new Error("Gagal memuat artikel");
  return await res.json();
};

export default function All() {
  const [articles] = createResource(fetchArticles);
  const [index, setIndex] = createSignal(0);
  let containerRef;

  const cardWidth = 340;        // Sesuaikan dengan lebar kartu
  const gapWidth = 24;          // gap antara kartu (misal gap-6 = 1.5rem = 24px)
  const stepWidth = cardWidth + gapWidth;
  const maxVisible = 3;

  // Total langkah maksimal yang bisa digeser
  const maxIndex = () => Math.max(0, (articles()?.length ?? 0) - maxVisible);

  // Scroll ke posisi index
  const scrollToIndex = (i) => {
    if (containerRef) {
      containerRef.scrollTo({
        left: i * stepWidth,
        behavior: "smooth",
      });
    }
  };

  // Reaktif scroll saat index berubah
  onMount(() => {
    createResource(index, scrollToIndex);
  });

  // Navigasi panah
  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(maxIndex(), i + 1));

  return (
    <div class="relative max-w-[1330px] mx-auto p-6">
      <div
        ref={containerRef}
        class="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-6 py-6 pl-6"
        style={{ scrollSnapType: "x mandatory" }}
      >
        <For each={articles()}>
          {(article) => (
            <div class="snap-center flex-shrink-0">
              <CardArtikel
                id={article.id}
                imgSrc={article.imgSrc}
                title={article.title}
                description={article.description}
                author={article.author}
                date={article.date}
              />
            </div>
          )}
        </For>
      </div>
      {/* Navigation arrows below carousel */}
      <div class="flex justify-between mt-4 max-w-[1080px] mx-auto px-4">
        <button
          class="btn btn-circle btn-outline"
          onClick={prev}
          disabled={index() === 0}
          aria-label="Previous"
        >
          &#8592;
        </button>
        <button
          class="btn btn-circle btn-outline"
          onClick={next}
          disabled={index() === maxIndex()}
          aria-label="Next"
        >
          &#8594;
        </button>
      </div>
    </div>
  );
}

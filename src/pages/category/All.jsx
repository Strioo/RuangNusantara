// src/pages/user/All.jsx
import { createSignal, createResource, For, Show } from "solid-js";
import CardArtikel from "../../components/CardArtikel";

const fetchArticles = async () => {
  const res = await fetch("http://127.0.0.1:8080/articles/data");
  if (!res.ok) throw new Error("Gagal memuat artikel");
  const data = await res.json();

  // Ambil hanya yang published, urut terbaru
  const published = data
    .filter((a) => String(a.status || "").toLowerCase() === "published")
    .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));

  // Mapping supaya cocok dengan props CardArtikel
  return published.map((a) => ({
    id: a.id,
    imgSrc: a.image || "",
    title: a.title || "",
    description: a.description || "",
    author: a.author || "",
    date: a.date ? String(a.date).slice(0, 10) : "", // yyyy-mm-dd
  }));
};

export default function All() {
  const [articles] = createResource(fetchArticles);
  const [index, setIndex] = createSignal(0);

  // Slider config
  const cardWidth = 340;
  const gapWidth = 80;
  const stepWidth = cardWidth + gapWidth;
  const maxShow = 1; // jumlah kartu yang “terlihat” untuk hitung batas geser

  const count = () => articles()?.length ?? 0;
  const maxIndex = () => Math.max(0, count() - maxShow);

  const prev = () => setIndex((i) => Math.max(i - 1, 0));
  const next = () => setIndex((i) => Math.min(maxIndex(), i + 1));

  const containerWidth = () => {
    const c = count();
    if (c <= 0) return 0;
    return c * cardWidth + (c - 1) * gapWidth;
    // total = kartu*N + gap*(N-1)
  };

  return (
    <div class="max-w-full mx-auto overflow-hidden my-7">
      <div
        class="flex transition-transform duration-500 gap-20 ease-in-out"
        style={{
          width: `${containerWidth()}px`,
          transform: `translateX(-${index() * stepWidth}px)`,
        }}
      >
        <Show
          when={!articles.loading}
          fallback={
            <div class="px-4 py-6 text-gray-600">Memuat artikel...</div>
          }
        >
          <Show
            when={count() > 0}
            fallback={
              <div class="px-4 py-6 text-gray-600 italic">
                Belum ada artikel.
              </div>
            }
          >
            <For each={articles()}>
              {(artikel, idx) => (
                <div
                  class="flex-shrink-0"
                  style={{
                    width: `${cardWidth}px`,
                    marginRight:
                      idx() === count() - 1 ? "0px" : `${gapWidth}px`,
                  }}
                >
                  <CardArtikel
                    id={artikel.id}
                    imgSrc={artikel.imgSrc}
                    title={artikel.title}
                    description={artikel.description}
                    author={artikel.author}
                    date={artikel.date}
                  />
                </div>
              )}
            </For>
          </Show>
        </Show>
      </div>

      <div class="flex justify-between mt-6 max-w-[1080px] mx-auto px-4">
        <button
          class="btn btn-circle btn-outline"
          onClick={prev}
          disabled={index() === 0}
          aria-label="Previous"
        >
          <img
            src="/src/assets/images/ArrowRight.png"
            class="rotate-180 w-6 h-6"
            alt=""
          />
        </button>
        <button
          class="btn btn-circle btn-outline"
          onClick={next}
          disabled={index() === maxIndex() || count() <= maxShow}
          aria-label="Next"
        >
          <img src="/src/assets/images/ArrowRight.png" class="w-6 h-6" alt="" />
        </button>
      </div>
    </div>
  );
}

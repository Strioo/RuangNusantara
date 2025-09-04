import { createSignal, createResource, For, Show } from "solid-js";
import CardArtikel from "../../components/CardArtikel";

const fetchArticles = async () => {
  const res = await fetch("http://localhost:4000/artikel");
  if (!res.ok) throw new Error("Gagal memuat artikel");
  return await res.json();
};

export default function All() {
  const [articles] = createResource(fetchArticles);
  const [index, setIndex] = createSignal(0);

  const cardWidth = 340; // lebar kartu (w-[340px])
  const gapWidth = 80; // jarak antar kartu (80px)
  const stepWidth = cardWidth + gapWidth;
  const maxShow = 1;

  const maxIndex = () => Math.max(0, (articles()?.length ?? 0) - maxShow);

  const prev = () => setIndex((i) => Math.max(i - 1, 0));
  const next = () => setIndex((i) => Math.min(maxIndex(), i + 1));

  // Hitung lebar wrapper berdasarkan seluruh jumlah artikel
  const containerWidth = () => {
    const count = articles()?.length ?? 0;
    if (count === 0) return 0;
    return count * cardWidth + (count - 1) * gapWidth;
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
        <Show when={articles()} fallback={<div>Memuat artikel...</div>}>
          <For each={articles()}>
            {(artikel, idx) => (
              <div
                class="flex-shrink-0"
                style={{
                  width: `${cardWidth}px`,
                  marginRight:
                    idx() === articles().length - 1 ? "0px" : `${gapWidth}px`,
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
          disabled={index() === maxIndex()}
          aria-label="Next"
        >
          <img src="/src/assets/images/ArrowRight.png" class="w-6 h-6" alt="" />
        </button>
      </div>
    </div>
  );
}

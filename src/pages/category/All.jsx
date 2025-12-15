import AOS from "aos";
import { createSignal, For, Show, onMount } from "solid-js";
import "aos/dist/aos.css";
import CardArtikel from "../../components/CardArtikel";
import { artikelData } from "../../data/staticData";

export default function All() {
  onMount(() => {
    AOS.init({ once: true });
  });

  const articles = () => artikelData;
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
    <div data-aos="fade-up" class="max-w-full mx-auto overflow-hidden my-7">
      <div
        data-aos="fade-right"
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
                data-aos="fade-up"
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

      <div
        data-aos="fade-up"
        class="flex justify-between mt-6 max-w-[1080px] mx-auto px-4"
      >
        <button
          class="btn btn-circle btn-outline"
          onClick={prev}
          disabled={index() === 0}
          aria-label="Previous"
        >
          <img
            src="/images/icons/ArrowRight.png"
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
          <img src="/images/icons/ArrowRight.png" class="w-6 h-6" alt="" />
        </button>
      </div>
    </div>
  );
}

import { Show, For, onMount } from "solid-js";
import ListCardArtikel from "../../components/ListCardArtikel";
import MainCardArtikel from "../../components/MainCardArtikel";
import { getArtikelByCategory } from "../../data/staticData";
import AOS from "aos";
import "aos/dist/aos.css";

export default function TarianTradisional() {
  onMount(() => {
    AOS.init({ once: true });
  });

  // Filter kategori "Tarian Tradisional"
  const tarianList = () => getArtikelByCategory("Tarian Tradisional");

  // Section pertama: main card + list cards slice 1..3 (3 item max)
  const firstMainArticle = () =>
    tarianList().length > 0 ? tarianList()[0] : null;
  const firstListArticles = () =>
    tarianList().length > 1 ? tarianList().slice(1, 4) : [];

  // Section kedua: ambil semua artikel setelah index 3 (dari index 4 hingga akhir)
  const secondSectionArticles = () =>
    tarianList().length > 4 ? tarianList().slice(4) : [];

  return (
    <div>
      <section class="mt-10 px-4 sm:px-8">
        <div data-aos="fade-up" class="w-full flex flex-col md:flex-row gap-6 md:gap-8 mt-5 bg-white rounded-lg">
          {/* Kiri: Label dan Judul */}
          <div data-aos="fade-right" class="md:w-[65%] w-full flex flex-col">
            <h1 class="text-center md:text-left text-3xl sm:text-4xl md:text-5xl font-medium text-black leading-tight mb-4 md:mb-0">
              Artikel Pilihan
              <br />
              Tarian Tradisional
            </h1>
          </div>
          {/* Kanan: Deskripsi */}
          <div data-aos="fade-left" class="md:w-[35%] w-full flex justify-center md:justify-normal">
            <p class="text-center md:text-left sm:text-lg text-gray-500 max-w-md font-normal">
              Temukan kisah-kisah menarik tentang tarian tradisional Nusantara yang terus hidup, berkembang, dan
              menginspirasi generasi baru.
            </p>
          </div>
        </div>
      </section>

      <hr class="text-gray-400 mt-10" />

      <section data-aos="fade-up" class="mx-auto mt-10">
        <div class="flex flex-col lg:flex-row gap-6">
          <Show when={firstMainArticle()}>
            <div data-aos="fade-right" class="w-full lg:w-3/5">
              <MainCardArtikel
                imgSrc={firstMainArticle().imgSrc}
                title={firstMainArticle().title}
                description={firstMainArticle().description}
                author={firstMainArticle().author}
                date={firstMainArticle().date}
                linkpage={`/artikel/${firstMainArticle().id}`}
              />
            </div>
          </Show>

          <div data-aos="fade-left" class="flex flex-col gap-4 w-full lg:w-2/5">
            <For each={firstListArticles()}>
              {(artikel) => (
                <ListCardArtikel
                  imgSrc={artikel.imgSrc}
                  title={artikel.title}
                  description={artikel.description}
                  linkpage={`/artikel/${artikel.id}`}
                />
              )}
            </For>
          </div>
        </div>
      </section>

      <section class="mt-[160px]">
        <div class="w-full flex flex-col md:flex-row gap-6 md:gap-8 mt-5 bg-white rounded-lg">
          {/* Kiri: Label dan Judul */}
          <div class="md:w-[65%] w-full flex flex-col">
            <h1 class="text-center md:text-left text-3xl sm:text-4xl md:text-5xl font-medium text-black leading-tight mb-4 md:mb-0">
              Cerita dalam
              <br />
              Irama Nusantara
            </h1>
          </div>
          {/* Kanan: Deskripsi */}
          <div class="md:w-[35%] w-full flex justify-center md:justify-normal">
            <p class="text-center md:text-left sm:text-lg text-gray-500 max-w-md font-normal">
              Gamelan, kolintang, hingga angklung bukan sekadar alat musik, tapi
              warisan penuh harmoni yang terus hidup dari masa lalu hingga kini.
            </p>
          </div>
        </div>
      </section>

      <hr class="text-gray-400 mt-10" />

      <section data-aos="fade-up" class="mx-auto mt-10">
        <div class="flex flex-col lg:flex-row gap-6">
          <Show when={secondSectionArticles().length > 0}>
            <div data-aos="fade-left" class="w-full lg:w-3/5">
              <MainCardArtikel
                imgSrc={secondSectionArticles()[0].imgSrc}
                title={secondSectionArticles()[0].title}
                description={secondSectionArticles()[0].description}
                author={secondSectionArticles()[0].author}
                date={secondSectionArticles()[0].date}
                linkpage={`/artikel/${secondSectionArticles()[0].id}`}
              />
            </div>
          </Show>

          <Show when={secondSectionArticles().length > 1}>
            <div data-aos="fade-right" class="flex flex-col gap-4 w-full lg:w-2/5">
              <For each={secondSectionArticles().slice(1)}>
                {(artikel) => (
                  <ListCardArtikel
                    imgSrc={artikel.imgSrc}
                    title={artikel.title}
                    description={artikel.description}
                    linkpage={`/artikel/${artikel.id}`}
                  />
                )}
              </For>
            </div>
          </Show>
        </div>
      </section>

      <section class="mt-[160px]">
        <div class="w-full flex flex-col md:flex-row gap-6 md:gap-8 mt-5 bg-white rounded-lg">
          {/* Kiri: Label dan Judul */}
          <div class="md:w-[65%] w-full flex flex-col">
            <h1 class="text-center md:text-left text-3xl sm:text-4xl md:text-5xl font-medium text-black leading-tight mb-4 md:mb-0">
              Seni & Musik
              <br />
              Nusantara
            </h1>
          </div>
          {/* Kanan: Deskripsi */}
          <div class="md:w-[35%] w-full flex justify-center md:justify-normal">
            <p class="text-center md:text-left sm:text-lg text-gray-500 max-w-md font-normal">
              Menghadirkan keindahan seni rupa dan musik tradisional Indonesia.
              Dari alunan gamelan, angklung, hingga karya seni modern yang
              terinspirasi budaya Nusantara.
            </p>
          </div>
        </div>
      </section>

      <hr class="text-gray-400 mt-10" />

      <section class="mx-auto mt-10 mb-20">
        {/* Grid 2 gambar atas */}
        <div data-aos="fade-up" class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <img
            data-aos="fade-right"
            src="/src/assets/images/categories/tariantradisional-1.png"
            alt="Tradisi Jawa"
            class="w-full h-[220px] md:h-[350px] object-cover rounded-2xl"
          />
          <img
            data-aos="fade-left"
            src="/src/assets/images/categories/tariantradisional-2.png"
            alt="Alat Musik Tradisional"
            class="w-full h-[220px] md:h-[350px] object-cover rounded-2xl"
          />
        </div>

        {/* Grid 3 gambar bawah */}
        <div data-aos="fade-up" class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <img
            data-aos="fade-up"
            src="/src/assets/images/categories/tariantradisional-3.png"
            alt="Pakaian Adat"
            class="w-full h-[220px] md:h-[350px] object-cover rounded-2xl"
          />
          <img
            data-aos="fade-up"
            src="/src/assets/images/categories/tariantradisional-4.png"
            alt="Tarian Daerah"
            class="w-full h-[220px] md:h-[350px] object-cover rounded-2xl"
          />
          <img
            data-aos="fade-up"
            src="/src/assets/images/categories/tariantradisional-5.png"
            alt="Festival Budaya"
            class="w-full h-[220px] md:h-[350px] object-cover rounded-2xl"
          />
        </div>
      </section>
    </div>
  );
}

import { createResource, Show, For } from "solid-js";
import ListCardArtikel from "../../components/ListCardArtikel";
import MainCardArtikel from "../../components/MainCardArtikel";

const fetchData = async () => {
  const res = await fetch("http://localhost:4000/artikel/");
  if (!res.ok) throw new Error("Gagal memuat data");
  const jsonData = await res.json();
  return jsonData;
};

export default function TarianTradisional() {
  const [artikel] = createResource(fetchData);

  // Filter kategori "Tarian Tradisional"
  const tarianList = () =>
    artikel()
      ? artikel().filter((a) => a.category === "Tarian Tradisional")
      : [];

  // Section pertama: main card + list cards slice 1..3 (3 item max)
  const firstMainArticle = () =>
    tarianList().length > 0 ? tarianList()[0] : null;
  const firstListArticles = () =>
    tarianList().length > 1 ? tarianList().slice(1, 4) : [];

  // Section kedua: list cards dari index 4..6 (maksimal 3)
  const secondSectionArticles = () =>
    tarianList().length > 4 ? tarianList().slice(4, 7) : [];

  return (
    <div>
      <section class="mt-10 px-4 sm:px-8">
        <div class="w-full flex flex-col md:flex-row gap-6 md:gap-8 mt-5 bg-white rounded-lg">
          {/* Kiri: Label dan Judul */}
          <div class="md:w-[65%] w-full flex flex-col">
            <h1 class="text-center md:text-left text-3xl sm:text-4xl md:text-5xl font-medium text-black leading-tight mb-4 md:mb-0">
              Artikel Pilihan
              <br />
              Seni & Music
            </h1>
          </div>
          {/* Kanan: Deskripsi */}
          <div class="md:w-[35%] w-full flex justify-center md:justify-normal">
            <p class="text-center md:text-left sm:text-lg text-gray-500 max-w-md font-normal">
              Temukan kisah-kisah menarik tentang alat musik, ritme, dan seni
              pertunjukan Nusantara yang terus hidup, berkembang, dan
              menginspirasi generasi baru.
            </p>
          </div>
        </div>
      </section>

      <hr class="text-gray-400 mt-10" />

      <section class="mx-auto mt-10">
        <div class="flex flex-col lg:flex-row gap-6">
          <Show when={firstMainArticle()}>
            <MainCardArtikel
              imgSrc={firstMainArticle().imgSrc}
              title={firstMainArticle().title}
              description={firstMainArticle().description}
              author={firstMainArticle().author}
              date={firstMainArticle().date}
              linkpage={`/artikel/${firstMainArticle().id}`}
            />
          </Show>

          <div class="flex flex-col gap-4 w-full lg:w-2/5">
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

      <section class="mx-auto mt-10 p-4">
        <div class="flex flex-col lg:flex-row gap-6">
          <div class="flex flex-col gap-4 w-full lg:w-2/5">
            <For each={secondSectionArticles()}>
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

          {secondSectionArticles().length > 0 && (
            <MainCardArtikel
              imgSrc={secondSectionArticles()[0].imgSrc}
              title={secondSectionArticles()[0].title}
              description={secondSectionArticles()[0].description}
              author={secondSectionArticles()[0].author}
              date={secondSectionArticles()[0].date}
              linkpage={`/artikel/${secondSectionArticles()[0].id}`}
            />
          )}
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
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <img
            src="/src/assets/images/tariantradisional-1.png"
            alt="Tradisi Jawa"
            class="w-full h-[220px] md:h-[350px] object-cover rounded-2xl"
          />
          <img
            src="/src/assets/images/tariantradisional-2.png"
            alt="Alat Musik Tradisional"
            class="w-full h-[220px] md:h-[350px] object-cover rounded-2xl"
          />
        </div>

        {/* Grid 3 gambar bawah */}
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <img
            src="/src/assets/images/tariantradisional-3.png"
            alt="Pakaian Adat"
            class="w-full h-[220px] md:h-[350px] object-cover rounded-2xl"
          />
          <img
            src="/src/assets/images/tariantradisional-4.png"
            alt="Tarian Daerah"
            class="w-full h-[220px] md:h-[350px] object-cover rounded-2xl"
          />
          <img
            src="/src/assets/images/tariantradisional-5.png"
            alt="Festival Budaya"
            class="w-full h-[220px] md:h-[350px] object-cover rounded-2xl"
          />
        </div>
      </section>
    </div>
  );
}

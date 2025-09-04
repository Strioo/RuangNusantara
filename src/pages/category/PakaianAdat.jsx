import { createResource, Show, For } from "solid-js";
import ListCardArtikel from "../../components/ListCardArtikel";
import MainCardArtikel from "../../components/MainCardArtikel";

const fetchData = async () => {
  const res = await fetch("http://localhost:4000/artikel/");
  if (!res.ok) throw new Error("Gagal memuat data");
  const jsonData = await res.json(); // pastikan response format array artikel langsung
  return jsonData;
};

export default function PakaianAdat() {
  const [artikel] = createResource(fetchData);
  const pakaianAdatList = () =>
    artikel() ? artikel().filter((a) => a.category === "Pakaian Adat") : [];

  const firstMainArticle = () =>
    pakaianAdatList().length > 0 ? pakaianAdatList()[0] : null;
  const firstListArticles = () =>
    pakaianAdatList().length > 1 ? pakaianAdatList().slice(1, 4) : []; // limit 3

  const secondSectionArticles = () =>
    pakaianAdatList().length > 4 ? pakaianAdatList().slice(4, 7) : []; // limit 3

  return (
    <div>
      <section class="mt-10 px-4 sm:px-8">
        <div class="w-full flex flex-col md:flex-row gap-6 md:gap-8 mt-5 bg-white rounded-lg">
          {/* Kiri: Label dan Judul */}
          <div class="md:w-[65%] w-full flex flex-col">
            <h1 class="text-center md:text-left text-3xl sm:text-4xl md:text-5xl font-medium text-black leading-tight mb-4 md:mb-0">
              Artikel Pilihan
              <br />
              Pakaian Adat
            </h1>
          </div>
          {/* Kanan: Deskripsi */}
          <div class="md:w-[35%] w-full flex justify-center md:justify-normal">
            <p class="text-center md:text-left sm:text-lg text-gray-500 max-w-md font-normal">
              Temukan cerita di balik setiap kain dan busana tradisional
              Nusantara. Dari batik, tenun, songket, hingga ulos — semua
              menyimpan filosofi, identitas, dan kebanggaan yang diwariskan
              lintas generasi.
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
              Cerita dalam Pakaian
              <br />
              Adat Nusantara
            </h1>
          </div>
          {/* Kanan: Deskripsi */}
          <div class="md:w-[35%] w-full flex justify-center md:justify-normal">
            <p class="text-center md:text-left sm:text-lg text-gray-500 max-w-md font-normal">
              Batik, songket, ulos, hingga tenun ikat bukan hanya busana indah,
              tapi juga warisan budaya yang menyimpan filosofi, identitas, dan
              kebanggaan bangsa
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
              Pakaian Adat
              <br />
              Nusantara
            </h1>
          </div>
          {/* Kanan: Deskripsi */}
          <div class="md:w-[35%] w-full flex justify-center md:justify-normal">
            <p class="text-center md:text-left sm:text-lg text-gray-500 max-w-md font-normal">
              Setiap helai kain dan busana tradisional menyimpan kisah,
              filosofi, dan identitas bangsa. Dari batik, songket, ulos, hingga
              tenun ikat, pakaian adat Nusantara menjadi simbol keindahan
              sekaligus warisan budaya yang terus hidup lintas generasi.
            </p>
          </div>
        </div>
      </section>

      <hr class="text-gray-400 mt-10" />

      <section class="mx-auto mt-10 mb-20">
        {/* Grid 2 gambar atas */}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <img
            src="/src/assets/images/pakaianadat-1.png"
            alt="Tradisi Jawa"
            class="w-full h-[220px] md:h-[350px] object-cover rounded-2xl"
          />
          <img
            src="/src/assets/images/pakaianadat-2.png"
            alt="Alat Musik Tradisional"
            class="w-full h-[220px] md:h-[350px] object-cover rounded-2xl"
          />
        </div>

        {/* Grid 3 gambar bawah */}
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <img
            src="/src/assets/images/pakaianadat-3.png"
            alt="Pakaian Adat"
            class="w-full h-[220px] md:h-[350px] object-cover rounded-2xl"
          />
          <img
            src="/src/assets/images/pakaianadat-4.png"
            alt="Tarian Daerah"
            class="w-full h-[220px] md:h-[350px] object-cover rounded-2xl"
          />
          <img
            src="/src/assets/images/pakaianadat-5.png"
            alt="Festival Budaya"
            class="w-full h-[220px] md:h-[350px] object-cover rounded-2xl"
          />
        </div>
      </section>
    </div>
  );
}

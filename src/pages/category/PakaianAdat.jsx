import { createResource, Show, For } from "solid-js";
import ListCardArtikel from "../../components/ListCardArtikel";
import MainCardArtikel from "../../components/MainCardArtikel";

const CATEGORY = "Pakaian Adat";

const fetchArticles = async () => {
  const res = await fetch("http://127.0.0.1:8080/articles/data");
  if (!res.ok) throw new Error("Gagal memuat data");
  const data = await res.json();

  // normalisasi + filter published
  const published = (data ?? []).filter(
    (a) => String(a.status || "").toLowerCase() === "published"
  );

  // filter kategori + urut terbaru
  const pakaian = published
    .filter((a) => a.category === CATEGORY)
    .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));

  // map ke bentuk yang dipakai komponen
  return pakaian.map((a) => ({
    id: a.id,
    imgSrc: a.image || "",
    title: a.title || "",
    description: a.description || "",
    author: a.author || "",
    date: a.date ? String(a.date).slice(0, 10) : "",
  }));
};

export default function PakaianAdat() {
  // FIX: pakai fetchArticles, bukan fetchData
  const [artikel] = createResource(fetchArticles);

  // sudah terfilter di fetchArticles, tinggal pakai saja
  const pakaianAdatList = () => artikel() ?? [];

  const firstMainArticle = () =>
    pakaianAdatList().length > 0 ? pakaianAdatList()[0] : null;

  const firstListArticles = () =>
    pakaianAdatList().length > 1 ? pakaianAdatList().slice(1, 4) : []; // limit 3

  const secondSectionArticles = () =>
    pakaianAdatList().length > 4 ? pakaianAdatList().slice(4, 7) : []; // limit 3

  return (
    <div>
      {/* STATE: Loading & Error */}
      <Show
        when={!artikel.loading}
        fallback={<div class="p-4">Memuat artikel…</div>}
      >
        <Show
          when={!artikel.error}
          fallback={<div class="p-4 text-red-600">Gagal memuat artikel.</div>}
        >
          <Show
            when={pakaianAdatList().length > 0}
            fallback={
              <div class="p-4">
                Belum ada artikel {CATEGORY} yang published.
              </div>
            }
          >
            {/* ----- Section 1 ----- */}
            <section class="mt-10 px-4 sm:px-8">
              <div class="w-full flex flex-col md:flex-row gap-6 md:gap-8 mt-5 bg-white rounded-lg">
                <div class="md:w-[65%] w-full flex flex-col">
                  <h1 class="text-center md:text-left text-3xl sm:text-4xl md:text-5xl font-medium text-black leading-tight mb-4 md:mb-0">
                    Artikel Pilihan
                    <br />
                    {CATEGORY}
                  </h1>
                </div>
                <div class="md:w-[35%] w-full flex justify-center md:justify-normal">
                  <p class="text-center md:text-left sm:text-lg text-gray-500 max-w-md font-normal">
                    Temukan cerita di balik setiap kain dan busana tradisional
                    Nusantara. Dari batik, tenun, songket, hingga ulos — semua
                    menyimpan filosofi, identitas, dan kebanggaan yang
                    diwariskan lintas generasi.
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
                    {(a) => (
                      <ListCardArtikel
                        imgSrc={a.imgSrc}
                        title={a.title}
                        description={a.description}
                        linkpage={`/artikel/${a.id}`}
                      />
                    )}
                  </For>
                </div>
              </div>
            </section>

            {/* ----- Section 2 ----- */}
            <section class="mt-[160px]">
              <div class="w-full flex flex-col md:flex-row gap-6 md:gap-8 mt-5 bg-white rounded-lg">
                <div class="md:w-[65%] w-full flex flex-col">
                  <h1 class="text-center md:text-left text-3xl sm:text-4xl md:text-5xl font-medium text-black leading-tight mb-4 md:mb-0">
                    Cerita dalam Pakaian
                    <br />
                    Adat Nusantara
                  </h1>
                </div>
                <div class="md:w-[35%] w-full flex justify-center md:justify-normal">
                  <p class="text-center md:text-left sm:text-lg text-gray-500 max-w-md font-normal">
                    Batik, songket, ulos, hingga tenun ikat bukan hanya busana
                    indah, tapi juga warisan budaya yang menyimpan filosofi,
                    identitas, dan kebanggaan bangsa
                  </p>
                </div>
              </div>
            </section>

            <hr class="text-gray-400 mt-10" />

            <section class="mx-auto mt-10 p-4">
              <div class="flex flex-col lg:flex-row gap-6">
                <div class="flex flex-col gap-4 w-full lg:w-2/5">
                  <For each={secondSectionArticles()}>
                    {(a) => (
                      <ListCardArtikel
                        imgSrc={a.imgSrc}
                        title={a.title}
                        description={a.description}
                        linkpage={`/artikel/${a.id}`}
                      />
                    )}
                  </For>
                </div>

                <Show when={secondSectionArticles().length > 0}>
                  <MainCardArtikel
                    imgSrc={secondSectionArticles()[0].imgSrc}
                    title={secondSectionArticles()[0].title}
                    description={secondSectionArticles()[0].description}
                    author={secondSectionArticles()[0].author}
                    date={secondSectionArticles()[0].date}
                    linkpage={`/artikel/${secondSectionArticles()[0].id}`}
                  />
                </Show>
              </div>
            </section>

            {/* ----- Section 3 (gallery statis) ----- */}
            <section class="mt-[160px]">
              <div class="w-full flex flex-col md:flex-row gap-6 md:gap-8 mt-5 bg-white rounded-lg">
                <div class="md:w-[65%] w-full flex flex-col">
                  <h1 class="text-center md:text-left text-3xl sm:text-4xl md:text-5xl font-medium text-black leading-tight mb-4 md:mb-0">
                    {CATEGORY}
                    <br />
                    Nusantara
                  </h1>
                </div>
                <div class="md:w-[35%] w-full flex justify-center md:justify-normal">
                  <p class="text-center md:text-left sm:text-lg text-gray-500 max-w-md font-normal">
                    Setiap helai kain dan busana tradisional menyimpan kisah,
                    filosofi, dan identitas bangsa. Dari batik, songket, ulos,
                    hingga tenun ikat, pakaian adat Nusantara menjadi simbol
                    keindahan sekaligus warisan budaya yang terus hidup lintas
                    generasi.
                  </p>
                </div>
              </div>
            </section>

            <hr class="text-gray-400 mt-10" />

            <section class="mx-auto mt-10 mb-20">
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
          </Show>
        </Show>
      </Show>
    </div>
  );
}

import { useParams } from "@solidjs/router";
import { createResource, Show } from "solid-js";
import Footer from "../components/Footer";
import NavBack from "../components/NavBack";

const fetchArtikel = async (id) => {
  if (!id) return null;
  const res = await fetch("http://localhost:4000/artikel/" + id);
  if (!res.ok) throw new Error("Gagal memuat data artikel");
  return res.json();
};

export default function ArtikelDetailPage() {
  const params = useParams();

  // createResource menggunakan getter params.id agar reaktif
  const [artikel] = createResource(() => params.id, fetchArtikel);

  return (
    <div class="w-full">
      <div class="max-w-4xl mx-auto mb-20">
        <Show
          when={artikel()}
          fallback={
            <p class="text-center py-10 text-black">Memuat data artikel...</p>
          }
        >
          {(a) =>
            a ? (
              <>
                <NavBack/>

                <h1 class="text-3xl md:text-5xl font-bold mb-2 text-black">
                  {artikel().title}
                </h1>
                <p class="text-gray-700 mb-2">{artikel().description}</p>
                <div class="flex items-center gap-3 text-gray-500 text-sm mb-5">
                  <span>{artikel().author}</span>
                  <span>•</span>
                  <span>{artikel().date}</span>
                </div>

                <img
                  src={artikel().imgSrc}
                  alt={artikel().title}
                  class="w-full h-[220px] md:h-[350px] object-cover rounded-2xl mb-8"
                />

                <section>
                  {artikel().content.map((section, idx) => (
                    <div class="mb-6" key={idx}>
                      <h2 class="text-xl font-semibold mb-2 text-black">
                        {section.heading}
                      </h2>
                      <p class="text-gray-800 text-base">{section.paragraph}</p>
                    </div>
                  ))}
                </section>

                <div class="bg-[#264653] text-white mt-10 rounded-xl p-6">
                  <div class="flex max-w-fit justify-center items-center rounded-full px-4 py-2 bg-white gap-2 mb-2 font-semibold">
                    <img
                      src="/src/assets/images/PushPin.svg"
                      class="h-[14px]"
                      alt=""
                    />
                    <span class="text-black">kesimpulan</span>
                  </div>
                  <p>{artikel().kesimpulan}</p>
                </div>
              </>
            ) : (
              <p class="text-center py-10 text-red-600">
                Artikel tidak ditemukan.
              </p>
            )
          }
        </Show>
      </div>

      <Footer />
    </div>
  );
}

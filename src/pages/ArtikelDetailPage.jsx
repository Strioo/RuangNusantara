import { useParams } from "@solidjs/router";
import { createResource, Show } from "solid-js";
import Footer from "../components/Footer";
import NavBack from "../components/NavBack";

const fetchArtikel = async (id) => {
  if (!id) return null;
  const res = await fetch(`http://127.0.0.1:8080/articles/data/${id}`, {
    cache: "no-store",
    headers: { Accept: "application/json" },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Gagal memuat data artikel");
  const a = await res.json();

  return {
    id: a.id,
    title: a.title ?? "",
    description: a.description ?? "",
    author: a.author ?? "",
    date: a.date ? String(a.date).slice(0, 10) : "",
    imgSrc: a.image || "",
    content: (a.content ?? "").trim(),
    kesimpulan: a.conclusion || "",
  };
};

export default function ArtikelDetailPage() {
  const params = useParams();
  const [artikel] = createResource(() => params.id, fetchArtikel);

  return (
    <div class="w-full">
      <div class="max-w-4xl mx-auto mb-20">
        <Show
          when={!artikel.loading && artikel()}
          fallback={
            <p class="text-center py-10 text-black">Memuat data artikel...</p>
          }
        >
          <>
            <NavBack />

            <h1 class="text-3xl md:text-5xl font-bold mb-2 text-black">
              {artikel().title}
            </h1>

            {artikel().description && (
              <p class="text-gray-700 mb-2">{artikel().description}</p>
            )}

            <div class="flex items-center gap-3 text-gray-500 text-sm mb-5">
              {artikel().author && <span>{artikel().author}</span>}
              {artikel().author && artikel().date && <span>•</span>}
              {artikel().date && <span>{artikel().date}</span>}
            </div>

            {artikel().imgSrc ? (
              <img
                src={artikel().imgSrc}
                alt={artikel().title}
                class="w-full h-[220px] md:h-[350px] object-cover rounded-2xl mb-8"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            ) : null}

            {/* Konten dari BE */}
            <section
              class="text-black prose prose-lg max-w-none"
              innerHTML={
                artikel().content &&
                !/^<p>\s*<br>\s*<\/p>\s*$/.test(artikel().content)
                  ? artikel().content
                  : "<p><i>Belum ada konten.</i></p>"
              }
            />

            {artikel().kesimpulan && (
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
            )}
          </>
        </Show>
      </div>

      <Footer />
    </div>
  );
}

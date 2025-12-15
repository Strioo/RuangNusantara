import { useParams } from "@solidjs/router";
import { Show, onMount } from "solid-js";
import Footer from "../components/Footer";
import NavBack from "../components/NavBack";
import { getArtikelById } from "../data/staticData";
import AOS from "aos";
import "aos/dist/aos.css";

export default function ArtikelDetailPage() {
  onMount(() => {
    AOS.init({ once: true });
  });

  const params = useParams();

  // Get artikel directly from static data
  const artikel = () => getArtikelById(params.id);

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
                <NavBack />

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
                
                <section
                  class="text-black prose prose-lg max-w-none"
                  innerHTML={artikel().content}
                ></section>

                <div class="bg-[#264653] text-white mt-10 rounded-xl p-6">
                  <div class="flex max-w-fit justify-center items-center rounded-full px-4 py-2 bg-white gap-2 mb-2 font-semibold">
                    <img
                      src="/src/assets/images/icons/PushPin.svg"
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

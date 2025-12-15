import AOS from "aos";
import { createSignal, onMount } from "solid-js";
import "aos/dist/aos.css";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NavKategori from "../components/NavKategori";

import SeniMusik from "./category/SeniMusik";
import PakaianAdat from "./category/PakaianAdat";
import TarianTradisional from "./category/TarianTradisional";
import PermainanTradisional from "./category/PermainanTradisional";
import All from "./category/All";

function toSlug(name) {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "dan");
}

export default function Artikel() {
  const [activeCategory, setActiveCategory] = createSignal(
    toSlug("All")
  );

  const renderCategoryContent = () => {
    switch (activeCategory()) {
      case toSlug("All"):
        return <All/>;
      case toSlug("Permainan Tradisional"):
        return <PermainanTradisional />;
      case toSlug("Seni & Musik"):
        return <SeniMusik />;
      case toSlug("Pakaian Adat"):
        return <PakaianAdat />;
      case toSlug("Tarian Tradisional"):
        return <TarianTradisional />;
      default:
        return <SeniMusik />;
    }
  };

  onMount(() => {
    AOS.init({ once: true });
  });

  return (
    <div>
      <section class="relative flex flex-col p-5 items-center justify-between h-auto min-h-[865px] bg-[url('/images/backgrounds/hero-bg-artikel.png')] bg-cover bg-center rounded-3xl">
        <Navbar />
        <div data-aos="fade-up">
          <h1 class="text-4xl sm:text-6xl md:text-7xl lg:text-8xl mt-8 md:mt-16 font-bold text-center mb-5 md:mb-5 drop-shadow-lg">
            Cerita Budaya, Dari Masa
            <br />
            Lalu Hingga Hari Ini
          </h1>
          <p data-aos="fade-up" class="text-base sm:text-xl text-gray-300 text-center max-w-xl md:max-w-4xl mx-auto mb-6 md:mb-5">
            Temukan artikel inspiratif seputar seni, tradisi, dan kearifan lokal
            Nusantara yang tidak hanya menceritakan masa lalu, tetapi juga
            menghadirkan makna yang relevan dengan kehidupan modern.
          </p>
          <div data-aos="fade-up">
            <NavKategori
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          </div>
        </div>
      </section>

      <div data-aos="fade-up">
        {renderCategoryContent()}
      </div>

      <Footer />
    </div>
  );
}

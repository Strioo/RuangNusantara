import { createSignal } from "solid-js";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NavKategori from "../components/NavKategori";

import SeniMusik from "./category/SeniMusik";
import PakaianAdat from "./category/PakaianAdat";
import TarianTradisional from "./category/TarianTradisional";
import PermainanTradisional from "./category/PermainanTradisional";

function toSlug(name) {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "dan");
}

export default function Artikel() {
  const [activeCategory, setActiveCategory] = createSignal(toSlug("Permainan Tradisional"));

  const renderCategoryContent = () => {
    switch (activeCategory()) {
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

  return (
    <div>
      <section class="relative flex flex-col p-5 items-center justify-between h-auto min-h-[865px] bg-[url('/src/assets/images/hero-bg-artikel.png')] bg-cover bg-center rounded-3xl">
        <Navbar />
        <div>
          <h1 class="text-4xl sm:text-6xl md:text-7xl lg:text-8xl mt-8 md:mt-16 font-bold text-center mb-5 md:mb-5 drop-shadow-lg">
            Cerita Budaya, Dari Masa<br />Lalu Hingga Hari Ini
          </h1>
          <p class="text-base sm:text-xl text-gray-300 text-center max-w-xl md:max-w-4xl mx-auto mb-6 md:mb-5">
            Temukan artikel inspiratif seputar seni, tradisi, dan kearifan lokal Nusantara yang tidak hanya menceritakan masa lalu, tetapi juga menghadirkan makna yang relevan dengan kehidupan modern.
          </p>
          <NavKategori
            activeCategory={activeCategory()}
            setActiveCategory={setActiveCategory}
          />
        </div>
      </section>

      {renderCategoryContent()}

      <Footer />
    </div>
  );
}

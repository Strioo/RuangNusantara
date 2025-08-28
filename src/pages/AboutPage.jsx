import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import CardPrimary from "../components/CardPrimary";

export default function About() {
  return (
    <div>
      {/* HERO SECTION */}
      <section class="relative flex flex-col p-5 items-center h-auto min-h-[865px] bg-bottom bg-[url('/src/assets/images/HeroBackground_AboutPage.svg')] bg-cover rounded-3xl">
        <Navbar />

        {/* Bungkus teks dengan div di bawah */}
        <div class="flex flex-col items-center mt-auto mb-10">
          <h1 class="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-center mb-5 md:mb-7 drop-shadow-lg">
            Menghubungkan
            <br />
            Tradisi dengan Generasi
          </h1>
          <p class="text-base sm:text-xl text-gray-300 text-center max-w-xl md:max-w-4xl mx-auto">
            Kami percaya bahwa budaya memiliki kekuatan untuk mempersatukan
            kita. Platform ini dirancang untuk menjadi jembatan yang
            menghubungkan warisan budaya kaya Indonesia dengan cara modern yang
            dapat diakses dan dinikmati oleh semua orang, terutama generasi
            muda.
          </p>
        </div>
      </section>

      {/* VISI & MISI */}
      <section class="flex flex-col lg:flex-row gap-6 mt-20">
        {/* Visi */}
        <div class="w-full lg:w-1/3 bg-[#264653] text-white p-8 rounded-2xl">
          <h2 class="text-3xl font-bold mb-4">Visi</h2>
          <p class="text-lg text-gray-200">
            Temukan kekayaan seni, musik, pakaian adat, hingga kuliner Nusantara
            dalam satu platform digital yang interaktif dan edukatif.
          </p>
        </div>

        {/* Misi */}
        <div class="w-full lg:w-2/3 bg-[#264653] text-white p-8 rounded-2xl">
          <h2 class="text-3xl font-bold mb-6">Misi</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Item 1 */}
            <div class="bg-[#1b323b] rounded-xl p-6">
              <div class="w-14 h-14 flex items-center justify-center bg-[#264653] rounded-full mb-4">
                <img src="/src/assets/images/EarthIcon_AboutPage.svg" alt="" />
              </div>
              <p class="font-semibold text-lg mb-2">Akses Mudah</p>
              <p class="text-sm text-gray-300">
                Membawa budaya lebih dekat, agar semua orang bisa menikmatinya
                tanpa batasan ruang dan waktu.
              </p>
            </div>
            {/* Item 2 */}
            <div class="bg-[#1b323b] rounded-xl p-6">
              <div class="w-14 h-14 flex items-center justify-center bg-[#264653] rounded-full mb-4">
                <img src="/src/assets/images/BookIcon_AboutPage.svg" alt="" />
              </div>
              <p class="font-semibold text-lg mb-2">Belajar Interaktif</p>
              <p class="text-sm text-gray-300">
                Menyediakan pengalaman belajar yang seru, interaktif, dan penuh
                makna.
              </p>
            </div>
            {/* Item 3 */}
            <div class="bg-[#1b323b] rounded-xl p-6">
              <div class="w-14 h-14 flex items-center justify-center bg-[#264653] rounded-full mb-4">
                <img src="/src/assets/images/LampIcon_AboutPage.svg" alt="" />
              </div>
              <p class="font-semibold text-lg mb-2">Tradisi x Teknologi</p>
              <p class="text-sm text-gray-300">
                Menggabungkan tradisi dengan inovasi, agar budaya terus hidup
                dan berkembang.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CERITA KAMI */}
      <section class="flex flex-col md:flex-row items-center gap-10 mt-20">
        {/* Gambar */}
        <div class="w-full md:w-1/2">
          <h2 class="text-3xl font-bold mb-6 text-black">Cerita Kami</h2>
          <img
            src="/src/assets/images/OurStory_AboutPage.svg"
            alt="Traditional Craft"
            class="w-120 h-64 object-cover rounded-xl shadow-lg"
          />
        </div>
        {/* Deskripsi */}
        <div class="w-full md:w-1/2">
          <p class="text-lg text-gray-800 text-xl leading-relaxed">
            Kami hadir karena percaya bahwa budaya bukan sekadar peninggalan,
            tapi bagian penting dari identitas dan masa depan kita. Dari alat
            musik yang bercerita, pakaian adat penuh makna, hingga kuliner yang
            menyatukan, setiap tradisi layak untuk terus hidup. Melalui platform
            ini, kami ingin menghadirkan cara baru untuk mengenal, merasakan,
            dan melestarikan budaya Nusantara agar generasi kini dan nanti bisa
            tetap bangga dengan warisan kita bersama.
          </p>
        </div>
      </section>

      {/* APA YANG KAMI LAKUKAN */}
      <section class="bg-[#264653] min-h-screen px-4 sm:px-8 py-10 sm:py-12 rounded-[24px] mt-[160px] text-white">
        <span class="block w-max mx-auto lg:m-0 px-5 py-2 italic rounded-full border border-white text-white text-xs sm:text-sm font-medium backdrop-blur bg-transparent">
          Budaya, Lebih Dekat Dari Sebelumnya
        </span>

        {/* Header baris row: Judul dan deskripsi */}
        <div class="flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-10 mt-6 mb-12">
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-tight max-w-full md:max-w-2xl text-center lg:text-left">
            Apa yang Kami Lakukan?
          </h1>
          <p class="text-base sm:text-lg md:text-xl font-extralight max-w-full md:max-w-2xl text-center lg:text-left">
            Kami menghubungkan tradisi dengan teknologi, menciptakan pengalaman
            interaktif, dan membangun komunitas pecinta budaya di seluruh
            Nusantara.
          </p>
        </div>

        {/* Grid fitur 1 kolom mobile, 3 kolom sm ke atas */}
        <div class="w-full grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-7 md:gap-8">
          <CardPrimary
            imgSrc="/src/assets/images/PaletteIcon_AboutPage.svg"
            title="Interaktif"
            description="elajahi seni, musik, tarian, hingga kuliner melalui pengalaman digital yang menyenangkan."
          />
          <CardPrimary
            imgSrc="/src/assets/images/LaptopIcon_AboutPage.svg"
            title="Digitalisasi"
            description="Mengangkat tradisi ke platform modern agar tetap hidup dan mudah diakses."
          />
          <CardPrimary
            imgSrc="/src/assets/images/HandsIcon_AboutPage.svg"
            title="Relevansi Modern"
            description="Menyatukan pecinta budaya dari berbagai daerah untuk saling berbagi dan melestarikan."
          />
        </div>
      </section>

      {/* CTA */}
      <section class="-mx-5 mt-[160px] px-15 bg-cover bg-[url('/src/assets/images/LastSection_AboutPage.svg')] h-[690px] flex flex-col justify-end">
        <span class="block w-max mx-auto lg:m-0 px-5 py-2 italic rounded-full border border-white text-white text-xs sm:text-sm font-medium backdrop-blur bg-transparent">
          Warisan Jadi Inspirasi
        </span>

        <div class="flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-10 mt-6 mb-12 w-full">
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-tight max-w-full md:max-w-2xl text-center lg:text-left">
            Mari Jadi Bagian dari
            <br />
            Perjalanan Ini
          </h1>

          <div class="flex flex-col items-center lg:items-start max-w-full md:max-w-[500px]">
            <p class="text-base sm:text-lg md:text-xl font-extralight text-center lg:text-left max-w-full md:max-w-[500px]">
              Setiap langkah kecilmu berarti besar bagi masa depan budaya
              Nusantara. Bersama, kita bisa menjaga dan meneruskan warisan ini
              agar tetap hidup untuk generasi mendatang.
            </p>
            <button class="btn btn-primary text-[16px] mt-6 px-7 py-5 w-max rounded-full">
              Mulai Eksplorasi
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

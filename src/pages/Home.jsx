import CardPrimary from "../components/CardPrimary";
import Footer from "../components/Footer";
import LongCard from "../components/LongCard";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div>
      <section class="relative flex flex-col p-5 items-center h-auto min-h-[865px] bg-bottom bg-[url('/src/assets/images/hero-bg.png')] bg-cover rounded-3xl">
        <Navbar />
        <h1 class="text-4xl sm:text-6xl md:text-7xl lg:text-8xl mt-8 md:mt-16 font-bold text-center mb-5 md:mb-7 drop-shadow-lg">
          Budaya Indonesia,
          <br />
          Hidup di Era Digital
        </h1>
        <p class="text-base sm:text-xl text-gray-300 text-center max-w-xl md:max-w-4xl mx-auto mb-6 md:mb-10">
          Temukan kekayaan seni, musik, pakaian adat, hingga kuliner Nusantara
          dalam satu platform digital yang mendukung interaksi edukatif!
        </p>
      </section>

      <section class="flex flex-col lg:flex-row min-h-[300px] mt-10 lg:mt-20 gap-6 lg:gap-0">
        {/* Kiri */}
        <div class="w-full lg:w-2/5 flex items-start justify-center lg:justify-start mb-4 lg:mb-0">
          <span class="mt-2 mr-3 hidden lg:inline-block">
            <span class="inline-block w-4 h-4 rounded-full bg-[#264653] align-top"></span>
          </span>
          <h2 class="text-xl sm:text-2xl font-bold text-gray-900 leading-tight text-center lg:text-left">
            Melestarikan Budaya, Menghubungkan Generasi
          </h2>
        </div>

        {/* Kanan */}
        <div class="w-full lg:w-3/5 px-0 lg:pl-10 flex flex-col gap-6">
          <h1 class="text-2xl sm:text-4xl font-bold text-gray-900 leading-tight mb-2 text-center lg:text-left">
            Dengan inovasi digital, budaya Nusantara dapat terus dikenalkan,
            dipelajari, dan diwariskan kepada generasi muda dengan cara yang
            lebih modern dan interaktif.
          </h1>
          <p class="text-base sm:text-lg text-gray-400 mb-4 max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
            Temukan kekayaan seni, musik, pakaian adat, hingga kuliner Nusantara
            dalam satu platform digital yang interaktif dan edukatif.
          </p>
          <div class="flex justify-center lg:justify-start">
            <button class="btn btn-outline btn-lg rounded-full flex items-center">
              Pelajari Lebih Lanjut&nbsp;
              <img
                src="/src/assets/images/ArrowRight.png"
                alt=""
                class="h-5 ml-1"
              />
            </button>
          </div>
        </div>
      </section>

      <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-center items-stretch mt-20 px-3">
        {/* CARD 1: Gambar Pakaian Adat */}
        <div class="bg-white rounded-2xl shadow-md overflow-hidden w-full flex-shrink-0">
          <img
            src="/src/assets/images/pakaian-adat.png"
            alt="Pakaian Adat"
            class="w-full h-full object-cover"
          />
        </div>

        {/* CARD 2: Info Pakaian Adat */}
        <div class="bg-gray-50 rounded-2xl shadow-md px-7 py-12 flex flex-col w-full flex-shrink-0">
          <p class="text-6xl font-semibold text-gray-900 mb-2">700+</p>
          <div class="flex flex-col mt-auto">
            <p class="text-4xl text-gray-900 mb-1">Pakaian Adat</p>
            <p class="text-[18px] text-gray-500">
              Koleksi dari Sabang sampai Merauke dengan filosofi unik di tiap
              daerah.
            </p>
          </div>
        </div>

        {/* CARD 3: Gambar Tarian Daerah */}
        <div class="bg-white rounded-2xl shadow-md overflow-hidden w-full flex-shrink-0">
          <img
            src="/src/assets/images/tarian-daerah.png"
            alt="Tarian Daerah"
            class="w-full h-full object-cover"
          />
        </div>

        {/* CARD 4: Info Tarian Daerah */}
        <div class="bg-[#264653] rounded-2xl shadow-md px-7 py-12 flex flex-col w-full flex-shrink-0 text-white">
          <p class="text-6xl font-semibold mb-2">300+</p>
          <div class="flex flex-col mt-auto mb-6">
            <p class="text-4xl mb-1">Tarian Daerah</p>
            <p class="text-[18px] text-gray-300">
              Gerakan penuh makna yang jadi identitas budaya daerah.
            </p>
          </div>
        </div>
      </section>

      <section class="bg-[#264653] min-h-screen px-4 sm:px-8 py-10 sm:py-12 rounded-[24px] mt-[160px] text-white">
        <span class="block w-max mx-auto lg:m-0 px-5 py-2 italic rounded-full border border-white text-white text-xs sm:text-sm font-medium backdrop-blur bg-transparent">
          Fitur Utama
        </span>

        {/* Header baris row: Judul dan deskripsi */}
        <div class="flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-10 mt-6 mb-12">
          <h1 class="text-4xl sm:text-5xl md:text-6xl font-normal leading-tight max-w-full md:max-w-2xl text-center lg:text-left">
            Melestarikan Budaya
            <br />
            Secara Modern
          </h1>
          <p class="text-base sm:text-xl font-extralight max-w-full md:max-w-2xl text-center lg:text-left">
            Dengan inovasi digital, kami menghadirkan platform yang membantu
            generasi muda menjelajahi, memahami, dan mencintai budaya Indonesia
            dengan cara yang interaktif dan menyenangkan.
          </p>
        </div>

        {/* Bagian gambar besar dan grid fitur */}
        <div class="flex flex-col lg:flex-row gap-8 md:gap-12">
          {/* Gambar kiri */}
          <div class="w-full lg:w-1/3 rounded-2xl overflow-hidden shadow-lg flex-shrink-0">
            <img
              src="/src/assets/images/budaya-modern.png"
              alt="Budaya Modern"
              class="w-full h-auto max-h-[690px] object-cover rounded-2xl"
            />
          </div>

          {/* Grid fitur dengan 2 kolom di tablet, full di mobile */}
          <div class="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-7 auto-rows-fr">
            <CardPrimary
              imgSrc="/src/assets/images/MusicNotes.svg"
              title="Eksplorasi Seni & Musik"
              description="Dengarkan alat musik tradisional dan temukan cerita di baliknya."
            />
            <CardPrimary
              imgSrc="/src/assets/images/Tshirt.svg"
              title="Galeri Pakaian Adat"
              description="Jelajahi filosofi dan makna di balik busana tradisional dari berbagai daerah."
            />
            <CardPrimary
              imgSrc="/src/assets/images/HouseLine.svg"
              title="Arsitektur Tradisional"
              description="Jelajahi keunikan rumah adat Indonesia dan nilai filosofinya."
            />
            <CardPrimary
              imgSrc="/src/assets/images/BowlSteam.svg"
              title="Kuliner Nusantara"
              description="emukan resep, cerita, dan sejarah di balik masakan khas Indonesia."
            />
          </div>
        </div>
      </section>

      <section class="mt-[160px] px-4 sm:px-8">
        <span class="block w-max mx-auto md:m-0 px-5 py-2 italic rounded-full border border-black text-black text-xs sm:text-sm font-medium backdrop-blur bg-transparent">
          Tradisi Lama, Gaya Baru.
        </span>
        <div class="w-full flex flex-col md:flex-row gap-6 md:gap-8 mt-5 bg-white rounded-lg">
          {/* Kiri: Label dan Judul */}
          <div class="md:w-[65%] w-full flex flex-col">
            <h1 class="text-center md:text-left text-3xl sm:text-4xl md:text-5xl font-bold text-black leading-tight mb-4 md:mb-0">
              Jelajahi Warisan
              <br />
              Budaya Nusantara
            </h1>
          </div>
          {/* Kanan: Deskripsi */}
          <div class="md:w-[35%] w-full flex justify-center md:justify-normal">
            <p class="text-center md:text-left sm:text-lg text-black max-w-md font-normal">
              Kami menghadirkan cara baru untuk mengenal dan melestarikan budaya
              Indonesia. Pilih tema yang ingin kamu eksplorasi, mulai dari
              musik, pakaian adat, hingga kuliner khas daerah.
            </p>
          </div>
        </div>
      </section>

      <section class="w-full bg-white mt-20 px-4 sm:px-8">
        <div class="grid grid-cols-1 gap-10 max-w-7xl mx-auto">
          <LongCard
            title="Mainan & Permainan Rakyat"
            description="Dengarkan alat musik tradisional dan temukan cerita di baliknya."
            imgSrc="/src/assets/images/permainantradisional.png"
          />
          <LongCard
            title="Ritual & Tradisi Lokal"
            description="Kenali upacara adat dari berbagai daerah, sarat makna dan filosofi hidup."
            imgSrc="/src/assets/images/ritual-tradisi.png"
          />
          <LongCard
            title="Warisan Sastra Nusantara"
            description="Jelajahi naskah kuno, aksara daerah, hingga pantun dan syair klasik."
            imgSrc="/src/assets/images/warisan-nusantra.png"
          />
          <LongCard
            title="Nilai & Kearifan Lokal"
            description="Pelajari kearifan tradisional dan filosofi hidup yang diwariskan turun-temurun."
            imgSrc="/src/assets/images/nilai-kearifan.png"
          />
        </div>
      </section>

      <section class="bg-[#264653] min-h-screen px-4 sm:px-8 py-10 sm:py-12 rounded-[24px] mt-[160px] text-white">
        <span class="block w-max mx-auto lg:m-0 px-5 py-2 italic rounded-full border border-white text-white text-xs sm:text-sm font-medium backdrop-blur bg-transparent">
          Budaya, Jembatan ke Depan
        </span>

        {/* Header baris row: Judul dan deskripsi */}
        <div class="flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-10 mt-6 mb-12">
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-tight max-w-full md:max-w-2xl text-center lg:text-left">
            Budaya, Warisan
            <br />
            untuk Masa Depan
          </h1>
          <p class="text-base sm:text-lg md:text-xl font-extralight max-w-full md:max-w-2xl text-center lg:text-left">
            Melestarikan budaya berarti menjaga identitas, mempererat
            kebersamaan, dan menjadikannya relevan di era modern.
          </p>
        </div>

        {/* Grid fitur 1 kolom mobile, 3 kolom sm ke atas */}
        <div class="w-full grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-7 md:gap-8">
          <CardPrimary
            imgSrc="/src/assets/images/globe.svg"
            title="Eksplorasi Seni & Musik"
            description="Dengarkan alat musik tradisional dan temukan cerita di baliknya."
          />
          <CardPrimary
            imgSrc="/src/assets/images/hand-fist.svg"
            title="Galeri Pakaian Adat"
            description="Jelajahi filosofi dan makna di balik busana tradisional dari berbagai daerah."
          />
          <CardPrimary
            imgSrc="/src/assets/images/rocket.svg"
            title="Arsitektur Tradisional"
            description="Jelajahi keunikan rumah adat Indonesia dan nilai filosofinya."
          />
        </div>

        <img
          src="/src/assets/images/budaya-warisan.png"
          alt=""
          class="w-full mt-8 rounded-3xl object-cover"
        />
      </section>

      <section class="-mx-5 mt-[160px] px-15 bg-cover bg-[url('/src/assets/images/budaya-nusantara.png')] h-[690px] flex flex-col justify-end">
        <span class="block w-max mx-auto lg:m-0 px-5 py-2 italic rounded-full border border-white text-white text-xs sm:text-sm font-medium backdrop-blur bg-transparent">
          Warisan Jadi Inspirasi
        </span>

        <div class="flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-10 mt-6 mb-12 w-full">
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-tight max-w-full md:max-w-2xl text-center lg:text-left">
            Selamatkan
            <br />
            Budaya Nusantara
          </h1>

          <div class="flex flex-col items-center lg:items-start max-w-full md:max-w-[500px]">
            <p class="text-base sm:text-lg md:text-xl font-extralight text-center lg:text-left max-w-full md:max-w-[500px]">
              Warisan leluhur adalah identitas bangsa. Saatnya kita melestarikan
              dan memperkenalkannya kembali dengan inovasi digital.
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

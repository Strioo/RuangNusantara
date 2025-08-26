import CardPrimary from "../components/CardPrimary";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div>
      <section class="relative flex flex-col p-5 items-center h-[965px] bg-[url('/src/assets/images/hero-bg.png')] bg-cover rounded-3xl">
        <Navbar />
        <h1 class="text-[120px] mt-16 font-bold text-center mb-7 drop-shadow-lg">
          Budaya Indonesia,
          <br />
          Hidup di Era Digital
        </h1>
        <p class="text-xl text-gray-300 text-center max-w-4xl mx-auto mb-10">
          Temukan kekayaan seni, musik, pakaian adat, hingga kuliner Nusantara
          dalam satu platform digital yang mendukung interaksi edukatif!
        </p>

        {/* Kategori */}
        <div class="flex gap-2 mb-8 bg-white/20 border border-gray-100 p-1 rounded-full">
          <span class="px-4 py-2 rounded-full bg-white text-gray-900 font-semibold">
            Kategori:
          </span>

          <button class="btn btn-primary rounded-full">Seni & Musik</button>

          <div class="w-px h-7 bg-white/40 mx-2"></div>

          <button class="btn btn-ghost rounded-full font-normal hover:btn-primary">
            Pakaian Adat
          </button>

          <div class="w-px h-7 bg-white/40 mx-2"></div>

          <button class="btn btn-ghost rounded-full font-normal hover:btn-primary">
            Tarian Tradisional
          </button>

          <div class="w-px h-7 bg-white/40 mx-2"></div>

          <button class="btn btn-ghost rounded-full font-normal hover:btn-primary">
            Rumah Adat
          </button>
        </div>
      </section>

      <section class="flex min-h-[300px] mt-20">
        {/* Kiri */}
        <div class="w-2/5 flex items-start">
          <span class="mt-2 mr-3">
            <span class="inline-block w-4 h-4 rounded-full bg-[#264653] align-top"></span>
          </span>
          <h2 class="text-2xl font-bold text-gray-900 leading-tight">
            Melestarikan Budaya, Menghubungkan Generasi
          </h2>
        </div>

        {/* Kanan */}
        <div class="w-3/5 pl-10 flex flex-col gap-6">
          <h1 class="text-4xl font-bold text-gray-900 leading-tight items-end mb-2">
            Dengan inovasi digital, budaya Nusantara dapat terus dikenalkan,
            dipelajari, dan diwariskan kepada generasi muda dengan cara yang
            lebih modern dan interaktif.
          </h1>
          <p class="text-lg text-gray-400 mb-4 max-w-lg">
            Temukan kekayaan seni, musik, pakaian adat, hingga kuliner Nusantara
            dalam satu platform digital yang interaktif dan edukatif.
          </p>
          <div>
            <button class="btn btn-outline btn-lg rounded-full">
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

      <section class="flex flex-col md:flex-row gap-10 justify-center mt-20">
        {/* CARD 1: Gambar Pakaian Adat */}
        <div class="bg-white rounded-2xl shadow-md overflow-hidden w-[23%] h-[23%]  flex-shrink-0">
          <img
            src="/src/assets/images/pakaian-adat.png"
            alt="Pakaian Adat"
            class="w-full h-full object-cover"
          />
        </div>

        {/* CARD 2: Info Pakaian Adat */}
        <div class="bg-gray-50 rounded-2xl shadow-md px-7 py-12 flex flex-col w-[23%]   flex-shrink-0">
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
        <div class="bg-white rounded-2xl shadow-md overflow-hidden w-[23%] h-[23%]  flex-shrink-0">
          <img
            src="/src/assets/images/tarian-daerah.png"
            alt="Tarian Daerah"
            class="w-full h-full object-cover"
          />
        </div>

        {/* CARD 4: Info Tarian Daerah */}
        <div class="bg-[#264653] rounded-2xl shadow-md px-7 py-12 flex flex-col w-[23%]   flex-shrink-0 text-white">
          <p class="text-6xl font-semibold mb-2">300+</p>
          <div class="flex flex-col mt-auto mb-6">
            <p class="text-4xl mb-1">Tarian Daerah</p>
            <p class="text-[18px] text-gray-300">
              Gerakan penuh makna yang jadi identitas budaya daerah.
            </p>
          </div>
        </div>
      </section>

      <section class="bg-[#264653] min-h-screen px-8 py-12 rounded-[24px] mt-[160px] text-white">
        <span class="self-start px-5 py-2 mb-10 italic rounded-full border border-white text-white text-sm font-medium backdrop-blur bg-transparent">
          Fitur Utama
        </span>
        {/* Header baris row: Judul dan deskripsi */}
        <div class="flex flex-row items-center justify-between gap-10 mt-6 mb-12">
          <h1 class="text-5xl md:text-6xl font-normal leading-tight max-w-2xl">
            Melestarikan Budaya
            <br />
            Secara Modern
          </h1>
          <p class="text-xl font-extralight max-w-2xl">
            Dengan inovasi digital, kami menghadirkan platform yang membantu
            generasi muda menjelajahi, memahami, dan mencintai budaya Indonesia
            dengan cara yang interaktif dan menyenangkan.
          </p>
        </div>

        {/* Bagian gambar besar dan grid fitur */}
        <div class="flex flex-col md:flex-row gap-12">
          {/* Gambar kiri */}
          <div class="md:w-[35%] w-full rounded-2xl overflow-hidden shadow-lg">
            <img
              src="/src/assets/images/budaya-modern.png"
              alt="Budaya Modern"
              class="w-full h-[490px] object-cover rounded-2xl"
            />
          </div>

          {/* Grid fitur 4 kotak */}
          <div class="md:w-[65%] w-full grid grid-cols-1 sm:grid-cols-2 gap-7">
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
    </div>
  );
}

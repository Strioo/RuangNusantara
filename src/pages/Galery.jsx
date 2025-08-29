import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Galery() {
  return (
    <div>
      <section class="relative flex flex-col p-5 items-center h-auto min-h-[865px] bg-bottom bg-[url('/src/assets/images/hero-bg-galery.png')] bg-cover rounded-3xl">
        <Navbar />

        {/* Bungkus teks dengan div di bawah */}
        <div class="flex flex-col items-center mt-auto mb-10">
          <h1 class="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-center mb-5 md:mb-7 drop-shadow-lg">
            Galeri Budaya Nusantara
          </h1>
          <p class="text-base sm:text-xl text-gray-300 text-center max-w-xl md:max-w-4xl mx-auto">
            Visual yang bercerita—dari pakaian adat, tarian, rumah tradisional,
            hingga kuliner khas. Setiap gambar adalah potongan kisah yang
            membangun identitas bangsa
          </p>
        </div>
      </section>

      <section class="w-full mx-auto p-4 mt-20 text-center">
        <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-[78px] font-medium leading-snug sm:leading-snug md:leading-normal lg:leading-snug text-gray-900">
          Budaya bukan hanya untuk dibaca, tapi juga untuk dilihat dan
          dirasakan. Lewat galeri ini, kamu bisa menjelajahi keindahan warisan
          Nusantara dalam bentuk foto dan ilustrasi interaktif.
        </h2>
      </section>

      <section class="mt-20 px-4 sm:px-8">
        <div class="w-full flex flex-col md:flex-row gap-6 md:gap-8 mt-5 bg-white rounded-lg">
          {/* Kiri: Label dan Judul */}
          <div class="md:w-[65%] w-full flex flex-col">
            <h1 class="text-center md:text-left text-3xl sm:text-4xl md:text-5xl font-medium text-black leading-tight mb-4 md:mb-0">
              Galeri Budaya
              <br />
              Nusantara
            </h1>
          </div>
          {/* Kanan: Deskripsi */}
          <div class="md:w-[35%] w-full flex justify-center md:justify-normal">
            <p class="text-center md:text-left sm:text-lg text-gray-500 max-w-md font-normal">
              Jelajahi koleksi foto yang merekam keindahan seni, tradisi, dan
              warisan budaya Indonesia dalam satu ruang digital.
            </p>
          </div>
        </div>
      </section>

      <section class="w-full px-0 mt-14 mb-20 mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* KIRI */}
          <div class="flex flex-col gap-4">
            {/* Kiri atas */}
            <img
              src="/src/assets/images/galery-1.png"
              alt=""
              class="w-full h-[350px] sm:h-[550px] md:h-[870px] object-cover md:rounded-tl-[60px] rounded-2xl"
            />
            {/* Tengah kiri */}
            <img
              src="/src/assets/images/galery-2.png"
              alt=""
              class="w-full h-[180px] sm:h-[300px] md:h-[411px] object-cover rounded-2xl"
            />
            {/* Bawah kiri */}
            <img
              src="/src/assets/images/galery-3.png"
              alt=""
              class="w-full h-[180px] sm:h-[300px] md:h-[411px] object-cover md:rounded-bl-[60px] rounded-2xl"
            />
          </div>

          {/* KANAN */}
          <div class="flex flex-col gap-4">
            {/* Kanan atas */}
            <img
              src="/src/assets/images/galery-4.png"
              alt=""
              class="w-full h-[180px] sm:h-[300px] md:h-[449px] object-cover md:rounded-tr-[60px] rounded-2xl"
            />
            {/* Kanan tengah */}
            <img
              src="/src/assets/images/galery-5.png"
              alt=""
              class="w-full h-[350px] sm:h-[650px] md:h-[908px] object-cover rounded-2xl"
            />
            {/* Kanan bawah */}
            <img
              src="/src/assets/images/galery-6.png"
              alt=""
              class="w-full h-[140px] sm:h-[250px] md:h-[335px] object-cover md:rounded-br-[60px] rounded-2xl"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

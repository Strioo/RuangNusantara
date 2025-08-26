import CardPrimary from "../components/CardPrimary";
import Navbar from "../components/Navbar";

export default function About() {
  return (
    <div>
      {/* Hero Section */}
      <section class="relative flex flex-col p-5 items-center h-[965px] bg-[url('/src/assets/images/HeroBackground_AboutPage.svg')] bg-cover rounded-3xl">
        <Navbar />
        <h1 class="text-8xl mt-16 font-bold text-center mb-7 drop-shadow-lg">
          Menghubungkan
          <br />
          Tradisi dengan Generasi
        </h1>
        <p class="text-xl text-gray-300 text-center max-w-4xl mx-auto mb-10">
          Kami percaya setiap budaya menyimpan cerita berharga—tentang identitas, kebersamaan, dan perjalanan panjang sebuah bangsa. Dan setiap cerita itu pantas diteruskan, agar generasi hari ini dan esok tetap bisa merasakan, memahami, serta bangga akan warisan Nusantara.
        </p>

        {/* Kategori */}
        {/* <div class="flex gap-2 mb-8 bg-white/20 border border-gray-100 p-1 rounded-full">
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
        </div> */}
      </section>

      {/* Vision Section */}
      <section class="flex gap-10 mt-20">
        {/* Left Card */}
        <div class="w-1/2 bg-[#264653] text-white p-8 rounded-2xl">
          <h2 class="text-4xl font-bold mb-6">Visi</h2>
          <p class="text-lg leading-relaxed">
            Terwujudnya kekayaan seni, musik, pakaian adat, hingga kuliner
            Nusantara dalam satu platform digital yang interaktif dan edukatif.
          </p>
        </div>

        {/* Right Card */}
        <div class="w-1/2 bg-[#264653] text-white p-8 rounded-2xl">
          <h2 class="text-4xl font-bold mb-6">Visi</h2>
          <div class="grid grid-cols-3 gap-6 mt-8">
            <div class="text-center">
              <div class="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-3 mx-auto">
                <img
                  src="src\assets\images\EarthIcon_AboutPage.svg"
                  alt="Users"
                  class="w-6 h-6"
                />
              </div>
              <h3 class="font-semibold mb-2">Akses Mudah</h3>
              <p class="text-sm text-gray-300">
                Memudahkan akses untuk siapa pun yang ingin mengenal dan
                mempelajari budaya Indonesia.
              </p>
            </div>
            <div class="text-center">
              <div class="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-3 mx-auto">
                <img
                  src="src\assets\images\BookIcon_AboutPage.svg"
                  alt="Interactive"
                  class="w-6 h-6"
                />
              </div>
              <h3 class="font-semibold mb-2">Belajar Interaktif</h3>
              <p class="text-sm text-gray-300">
                Pengalaman belajar yang interaktif, dan yang paling penting
                mudah dipahami.
              </p>
            </div>
            <div class="text-center">
              <div class="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-3 mx-auto">
                <img
                  src="src\assets\images\LampIcon_AboutPage.svg"
                  alt="Technology"
                  class="w-6 h-6"
                />
              </div>
              <h3 class="font-semibold mb-2">Tradisi x Teknologi</h3>
              <p class="text-sm text-gray-300">
                Menggabungkan tradisi kental dengan teknologi modern untuk
                menciptakan pengalaman yang unik.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section class="flex gap-10 items-center mt-20">
        {/* Left - Image */}
        <div class="w-1/3">
          <div class="rounded-2xl overflow-hidden shadow-lg">
            <img
              src="src\assets\images\OurStory_AboutPage.svg"
              alt="Traditional Craft"
              class="w-full h-[400px] object-cover"
            />
          </div>
        </div>

        {/* Right - Content */}
        <div class="w-2/3 pl-8">
          <h2 class="text-5xl font-bold text-gray-900 mb-8 leading-tight">
            Cerita Kami
          </h2>
          <p class="text-lg text-gray-600 leading-relaxed">
            Kami hadir karena percaya bahwa budaya bukan sekadar peninggalan,
            tapi bagian penting dari identitas dan masa depan kita. Dari alat
            musik yang bercerita, pakaian adat penuh makna, hingga kuliner yang
            menyatukan, setiap tradisi layak untuk terus hidup. Melalui platform
            ini, kami ingin menghadirkan cara baru untuk mengenal, merasakan,
            dan melestarikan budaya Nusantara— agar generasi kini dan nanti bisa
            tetap bangga dengan warisan kita bersama.
          </p>
        </div>
      </section>

      {/* What We Do Section */}
      <section class="bg-[#264653] min-h-screen px-8 py-12 rounded-[24px] mt-[160px] text-white">
        <span class="self-start px-5 py-2 mb-10 italic rounded-full border border-white text-white text-sm font-medium backdrop-blur bg-transparent">
          Budaya Lebih Dekat Dan Sederhana
        </span>

        {/* Header */}
        <div class="flex flex-row items-center justify-between gap-10 mt-6 mb-12">
          <h1 class="text-5xl md:text-6xl font-normal leading-tight max-w-2xl">
            Apa yang Kami
            <br />
            Lakukan
          </h1>
          <p class="text-xl font-extralight max-w-2xl">
            Kami menghubungkan tradisi dengan teknologi, menciptakan pengalaman
            interaktif dan membangkitkan kecintaan kepada budaya di seluruh
            Nusantara.
          </p>
        </div>

        {/* Cards Grid */}
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white/10 backdrop-blur rounded-2xl p-8">
            <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6">
              <img
                src="src\assets\images\PaletteIcon_AboutPage.svg"
                alt="Interactive"
                class="w-8 h-8"
              />
            </div>
            <h3 class="text-2xl font-bold mb-4">Interaktif</h3>
            <p class="text-gray-300 leading-relaxed">
              Menyediakan tools, fitur, hingga konten interaktif dengan
              pengalaman digital yang mempesona.
            </p>
          </div>

          <div class="bg-white/10 backdrop-blur rounded-2xl p-8">
            <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6">
              <img
                src="src\assets\images\LaptopIcon_AboutPage.svg"
                alt="Digital"
                class="w-8 h-8"
              />
            </div>
            <h3 class="text-2xl font-bold mb-4">Digitalisasi</h3>
            <p class="text-gray-300 leading-relaxed">
              Mengarsip dan melestarikan warisan budaya agar tetap hidup dan
              relevan dengan zaman.
            </p>
          </div>

          <div class="bg-white/10 backdrop-blur rounded-2xl p-8">
            <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6">
              <img
                src="src\assets\images\HandsIcon_AboutPage.svg"
                alt="Modern"
                class="w-8 h-8"
              />
            </div>
            <h3 class="text-2xl font-bold mb-4">Relevansi Modern</h3>
            <p class="text-gray-300 leading-relaxed">
              Menyajikan budaya dalam konteks yang dapat dimengerti oleh zaman
              budaya dan mencintainya.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section class="relative flex flex-col items-center justify-center h-[600px] bg-[url('/src/assets/images/temple-bg.png')] bg-cover rounded-3xl mt-20">
        <div class="absolute inset-0 bg-black/40 rounded-3xl"></div>
        <div class="relative z-10 text-center text-white max-w-4xl mx-auto px-8">
          <span class="inline-block px-4 py-2 mb-6 text-sm font-medium border border-white rounded-full bg-white/10 backdrop-blur">
            Yuk mari bersama
          </span>
          <h1 class="text-6xl font-bold mb-8 leading-tight">
            Mari Jadi Bagian dari
            <br />
            Perjalanan Ini
          </h1>
          <p class="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Dengan bergabung bersama kami, Anda menjadi bagian dari misi
            penting: melestarikan kekayaan budaya Nusantara. Bersama kita bisa
            membangun dan menyebarkan kecintaan terhadap warisan leluhur untuk
            generasi yang akan datang.
          </p>
          <button class="btn btn-primary btn-lg rounded-full px-8">
            Mulai Eksplorasi
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer class="bg-[#1a3a42] text-white mt-20 px-8 py-16 rounded-t-3xl">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 class="text-2xl font-bold mb-6 flex items-center">
              <img
                src="/src/assets/images/logo.png"
                alt="Nusantara Logo"
                class="w-8 h-8 mr-3"
              />
              NUSANTARA
            </h3>
            <p class="text-gray-400 leading-relaxed">
              Platform digital yang menghubungkan tradisi dengan generasi modern
              melalui teknologi yang inovatif dan interaktif.
            </p>
          </div>

          <div>
            <h4 class="text-lg font-semibold mb-4">Navigation</h4>
            <ul class="space-y-2">
              <li>
                <a
                  href="#"
                  class="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="text-gray-400 hover:text-white transition-colors"
                >
                  Tentang Kami
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="text-gray-400 hover:text-white transition-colors"
                >
                  Eksplorasi
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="text-gray-400 hover:text-white transition-colors"
                >
                  Cerita Budaya
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="text-gray-400 hover:text-white transition-colors"
                >
                  Kontak
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 class="text-lg font-semibold mb-4">Budaya</h4>
            <ul class="space-y-2">
              <li>
                <a
                  href="#"
                  class="text-gray-400 hover:text-white transition-colors"
                >
                  Seni & Musik
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="text-gray-400 hover:text-white transition-colors"
                >
                  Pakaian Adat
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="text-gray-400 hover:text-white transition-colors"
                >
                  Tarian Tradisional
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="text-gray-400 hover:text-white transition-colors"
                >
                  Rumah Adat
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="text-gray-400 hover:text-white transition-colors"
                >
                  Kuliner
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 class="text-lg font-semibold mb-4">Ikuti Kami</h4>
            <div class="flex space-x-4">
              <a
                href="#"
                class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <img
                  src="/src/assets/images/facebook.svg"
                  alt="Facebook"
                  class="w-5 h-5"
                />
              </a>
              <a
                href="#"
                class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <img
                  src="/src/assets/images/instagram.svg"
                  alt="Instagram"
                  class="w-5 h-5"
                />
              </a>
              <a
                href="#"
                class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <img
                  src="/src/assets/images/twitter.svg"
                  alt="Twitter"
                  class="w-5 h-5"
                />
              </a>
            </div>
          </div>
        </div>

        <div class="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p class="text-gray-400 text-sm">
            © 2024 Budaya, All rights reserved.
          </p>
          <div class="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              class="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Privacy & Policy
            </a>
            <a
              href="#"
              class="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Terms & Conditions
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

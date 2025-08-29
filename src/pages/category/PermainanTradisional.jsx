export default function PermainanTradisional() {
  return (
    <div>
      <section class="w-full px-2 py-10">
        <div class="flex flex-col md:flex-row gap-8">
          {/* Kiri */}
          <div class="flex flex-col gap-4 flex-1 md:items-start items-center">
            <h2 class="font-serif text-5xl md:text-6xl font-medium text-gray-900 text-center md:text-left leading-tight">
              Jejak Sejarah
              <br class="hidden md:block" />
              di Balik
              <br class="hidden md:block" />
              Permainan
            </h2>
            <img
              src="/src/assets/images/permainan-anak.png"
              alt="Permainan Anak"
              class="w-full max-w-full h-[300px] md:h-[210px] rounded-2xl object-cover"
            />
          </div>
          {/* Kanan */}
          <div class="flex-1">
            <p class="text-xl lg:text-[28px]  md:text-2xl  text-black leading-relaxed">
              Permainan tradisional telah ada sejak berabad-abad lalu, dimainkan
              anak-anak hingga orang dewasa sebagai hiburan sekaligus sarana
              belajar. Aturan, gerakan, dan alat sederhana di dalamnya
              mengandung nilai kebersamaan, strategi, dan filosofi hidup. Dari
              congklak yang melatih kesabaran, gobak sodor yang menuntut kerja
              sama, hingga egrang yang mengajarkan keseimbangan—semua tetap
              relevan hingga kini.
            </p>
          </div>
        </div>
      </section>

      <section class="bg-[#264653] min-h-screen px-4 sm:px-8 py-10 sm:py-12 rounded-[24px] mt-[160px] text-white">
        {/* Label */}
        <span class="block w-max mx-auto lg:m-0 px-5 py-2 italic rounded-full border border-white text-white text-xs sm:text-sm font-medium backdrop-blur bg-transparent">
          Budaya, Jembatan ke Depan
        </span>

        {/* Header */}
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

        {/* Card Grid */}
        <div class="w-full grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-7 md:gap-8">
          {/* Engklek Card */}
          <div class="card rounded-4xl bg-white transition-all duration-500 group hover:bg-[#1B323B]">
            <img
              src="/src/assets/images/engklek.png"
              alt="Engklek"
              class="w-auto object-cover p-5 rounded-[42px]"
            />
            <div class="card-body pt-0">
              <p class="card-title text-black text-2xl font-medium group-hover:text-white">
                Engklek
              </p>
              <p class="text-gray-500 group-hover:text-white">
                Permainan lompat kotak sederhana yang melatih keseimbangan,
                fokus, dan konsentrasi.
              </p>
              <div class="card-actions mt-2">
                <button class="btn btn-primary btn-sm p-5 text-sm rounded-full group-hover:bg-white group-hover:text-black">
                  Pelajari Cara Main
                </button>
              </div>
            </div>
          </div>

          {/* Congklak Card */}
          <div class="card rounded-4xl bg-white transition-all duration-500 group hover:bg-[#1B323B]">
            <img
              src="/src/assets/images/congklak.png"
              alt="congklak"
              class="w-auto object-cover p-5 rounded-[42px]"
            />
            <div class="card-body pt-0">
              <p class="card-title text-black text-2xl font-medium group-hover:text-white">
                Congklak
              </p>
              <p class="text-gray-500 group-hover:text-white">
                Permainan papan klasik dengan biji-bijian yang mengasah
                strategi, kesabaran, dan ketelitian.
              </p>
              <div class="card-actions mt-2">
                <button class="btn btn-primary btn-sm p-5 text-sm rounded-full group-hover:bg-white group-hover:text-black">
                  Pelajari Cara Main
                </button>
              </div>
            </div>
          </div>

          {/* Egrang Card */}
          <div class="card rounded-4xl bg-white transition-all duration-500 group hover:bg-[#1B323B]">
            <img
              src="/src/assets/images/egrang.png"
              alt="egrang"
              class="w-auto object-cover p-5 rounded-[42px]"
            />
            <div class="card-body pt-0">
              <p class="card-title text-black text-2xl font-medium group-hover:text-white">
                Egrang
              </p>
              <p class="text-gray-500 group-hover:text-white">
                Permainan bambu yang melatih keberanian, keseimbangan, dan
                ketangkasan.
              </p>
              <div class="card-actions mt-2">
                <button class="btn btn-primary btn-sm p-5 text-sm rounded-full group-hover:bg-white group-hover:text-black">
                  Pelajari Cara Main
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="mt-[160px] px-4 sm:px-8">
        <div class="w-full flex flex-col md:flex-row gap-6 md:gap-8 mt-5 bg-white rounded-lg">
          {/* Kiri: Label dan Judul */}
          <div class="md:w-[65%] w-full flex flex-col">
            <h1 class="text-center md:text-left text-3xl sm:text-4xl md:text-5xl font-medium text-black leading-tight mb-4 md:mb-0">
              Artikel Pilihan
              <br />
              Seni & Music
            </h1>
          </div>
          {/* Kanan: Deskripsi */}
          <div class="md:w-[35%] w-full flex justify-center md:justify-normal">
            <p class="text-center md:text-left sm:text-lg text-gray-500 max-w-md font-normal">
              Temukan kisah-kisah menarik tentang alat musik, ritme, dan seni
              pertunjukan Nusantara yang terus hidup, berkembang, dan
              menginspirasi generasi baru.
            </p>
          </div>
        </div>
      </section>

      <hr class="text-gray-400 mt-10" />

      <section class="my-20">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mx-auto">
          <div class="h-full">
            <div class="bg-[#F5F5F5] flex flex-col rounded-2xl p-7 gap-5 text-white group transition duration-500 h-full hover:scale-[1.03]">
              <div class="text-blue-900 bg-[#1B323B] w-12 h-12 flex items-center justify-center rounded-full text-2xl group-hover:bg-[#1B323B] transition duration-500">
                <img src="/src/assets/images/UserFour.svg" alt="" />
              </div>
              <div>
                <p class="font-medium text-2xl mb-1 text-black">Main Bersama</p>
                <p class="text-black text-[18px]">
                  Kumpulkan teman dan rasakan keseruan permainan klasik.
                </p>
              </div>
            </div>
          </div>

          <div class="h-full">
            <div class="bg-[#F5F5F5] flex flex-col rounded-2xl p-7 gap-5 text-white group transition duration-500 h-full hover:scale-[1.03]">
              <div class="text-blue-900 bg-[#1B323B] w-12 h-12 flex items-center justify-center rounded-full text-2xl group-hover:bg-[#1B323B] transition duration-500">
                <img src="/src/assets/images/PersonRun.svg" alt="" />
              </div>
              <div>
                <p class="font-medium text-2xl mb-1 text-black">
                  Aktif & Sehat
                </p>
                <p class="text-black text-[18px]">
                  Permainan tradisional membuat tubuh aktif dan tetap bugar.
                </p>
              </div>
            </div>
          </div>

          <div class="h-full">
            <div class="bg-[#F5F5F5] flex flex-col rounded-2xl p-7 gap-5 text-white group transition duration-500 h-full hover:scale-[1.03]">
              <div class="text-blue-900 bg-[#1B323B] w-12 h-12 flex items-center justify-center rounded-full text-2xl group-hover:bg-[#1B323B] transition duration-500">
                <img src="/src/assets/images/HandShake.svg" alt="" />
              </div>
              <div>
                <p class="font-medium text-2xl mb-1 text-black">
                  Belajar Nilai Hidup
                </p>
                <p class="text-black text-[18px]">
                  Di setiap permainan, ada pelajaran tentang kejujuran dan kerja
                  sama.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

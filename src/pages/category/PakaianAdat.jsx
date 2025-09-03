import ListCardArtikel from "../../components/ListCardArtikel";
import MainCardArtikel from "../../components/MainCardArtikel";

export default function PakaianAdat() {
  return (
    <div>
      <section class="mt-10 px-4 sm:px-8">
        <div class="w-full flex flex-col md:flex-row gap-6 md:gap-8 mt-5 bg-white rounded-lg">
          {/* Kiri: Label dan Judul */}
          <div class="md:w-[65%] w-full flex flex-col">
            <h1 class="text-center md:text-left text-3xl sm:text-4xl md:text-5xl font-medium text-black leading-tight mb-4 md:mb-0">
              Artikel Pilihan
              <br />
              Pakaian Adat
            </h1>
          </div>
          {/* Kanan: Deskripsi */}
          <div class="md:w-[35%] w-full flex justify-center md:justify-normal">
            <p class="text-center md:text-left sm:text-lg text-gray-500 max-w-md font-normal">
              Temukan cerita di balik setiap kain dan busana tradisional
              Nusantara. Dari batik, tenun, songket, hingga ulos — semua
              menyimpan filosofi, identitas, dan kebanggaan yang diwariskan
              lintas generasi.
            </p>
          </div>
        </div>
      </section>

      <hr class="text-gray-400 mt-10" />

      <section class="mx-auto mt-10">
        <div class="flex flex-col lg:flex-row gap-6">
          <MainCardArtikel
            imgSrc="/src/assets/images/gamelan-jawa.png"
            title="Gamelan: Irama Abadi dari Jawa yang Mendunia"
            description="Gamelan bukan hanya alat musik, tapi juga identitas budaya yang sudah dikenal hingga mancanegara. Dari panggung tradisional hingga konser internasional, gamelan terus hidup dan beradaptasi."
            author="Tim Nusantara"
            date="12 Maret 2025"
            linkpage="/artikel/gamelan-jawa"
          />
          {/* Kanan: List Berita */}
          <div class="flex flex-col gap-4 w-full lg:w-2/5">
            <ListCardArtikel
              imgSrc="/src/assets/images/kolintang-minahasa.png"
              title="Ritme Kolintang dari Minahasa"
              description="Kolintang jadi simbol kebersamaan masyarakat Sulawesi Utara yang terus dimainkan lintas generasi."
              linkpage=""
            />
            <ListCardArtikel
              imgSrc="/src/assets/images/musik-tradisional.png"
              title="Musisi Muda & Musik Tradisional"
              description="Kisah anak muda yang menghadirkan instrumen klasik ke dalam musik modern."
              linkpage=""
            />
            <ListCardArtikel
              imgSrc="/src/assets/images/tarian-tradisional.png"
              title="Tarian & Musik: Harmoni Nusantara"
              description="Bagaimana tarian tradisional tak bisa lepas dari alunan musik yang mengiringinya."
              linkpage=""
            />
          </div>
        </div>
      </section>

      <section class="mt-[160px]">
        <div class="w-full flex flex-col md:flex-row gap-6 md:gap-8 mt-5 bg-white rounded-lg">
          {/* Kiri: Label dan Judul */}
          <div class="md:w-[65%] w-full flex flex-col">
            <h1 class="text-center md:text-left text-3xl sm:text-4xl md:text-5xl font-medium text-black leading-tight mb-4 md:mb-0">
              Cerita dalam Pakaian
              <br />
              Adat Nusantara
            </h1>
          </div>
          {/* Kanan: Deskripsi */}
          <div class="md:w-[35%] w-full flex justify-center md:justify-normal">
            <p class="text-center md:text-left sm:text-lg text-gray-500 max-w-md font-normal">
              Batik, songket, ulos, hingga tenun ikat bukan hanya busana indah,
              tapi juga warisan budaya yang menyimpan filosofi, identitas, dan
              kebanggaan bangsa
            </p>
          </div>
        </div>
      </section>

      <hr class="text-gray-400 mt-10" />

      <section class=" mx-auto mt-10 p-4">
        <div class="flex flex-col lg:flex-row gap-6">
          <div class="flex flex-col gap-4 w-full lg:w-2/5">
            <ListCardArtikel
              imgSrc="/src/assets/images/irama-abadi.png"
              title="Irama Abadi"
              description="Dari Jawa ke dunia, gamelan jadi identitas budaya sekaligus bahasa universal dalam musik tradisional."
              linkpage=""
            />
            <ListCardArtikel
              imgSrc="/src/assets/images/kolintang2-minahasa.png"
              title="Kolintang Minahasa"
              description="Alunan kayu bergetar ini menjadi simbol kebersamaan masyarakat Sulawesi Utara lintas generasi."
              linkpage=""
            />
            <ListCardArtikel
              imgSrc="/src/assets/images/musik-tradisional.png"
              title="asando dari NTT"
              description="Instrumen berdawai unik dengan suara merdu yang membawa cerita tanah Rote ke panggung global."
              linkpage=""
            />
          </div>

          <MainCardArtikel
            imgSrc="/src/assets/images/gendang-jawa.png"
            title="Gamelan: Irama Abadi dari Jawa yang Mendunia"
            description="Gamelan bukan hanya alat musik, tapi juga identitas budaya yang sudah dikenal hingga mancanegara. Dari panggung tradisional hingga konser internasional, gamelan terus hidup dan beradaptasi."
            author="Tim Nusantara"
            date="12 Maret 2025"
            linkpage=""
          />
        </div>
      </section>

      <section class="mt-[160px]">
        <div class="w-full flex flex-col md:flex-row gap-6 md:gap-8 mt-5 bg-white rounded-lg">
          {/* Kiri: Label dan Judul */}
          <div class="md:w-[65%] w-full flex flex-col">
            <h1 class="text-center md:text-left text-3xl sm:text-4xl md:text-5xl font-medium text-black leading-tight mb-4 md:mb-0">
              Pakaian Adat
              <br />
              Nusantara
            </h1> 
          </div>
          {/* Kanan: Deskripsi */}
          <div class="md:w-[35%] w-full flex justify-center md:justify-normal">
            <p class="text-center md:text-left sm:text-lg text-gray-500 max-w-md font-normal">
              Setiap helai kain dan busana tradisional menyimpan kisah,
              filosofi, dan identitas bangsa. Dari batik, songket, ulos, hingga
              tenun ikat, pakaian adat Nusantara menjadi simbol keindahan
              sekaligus warisan budaya yang terus hidup lintas generasi.
            </p>
          </div>
        </div>
      </section>

      <hr class="text-gray-400 mt-10" />

      <section class="mx-auto mt-10 mb-20">
        {/* Grid 2 gambar atas */}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <img
            src="/src/assets/images/pakaianadat-1.png"
            alt="Tradisi Jawa"
            class="w-full h-[220px] md:h-[350px] object-cover rounded-2xl"
          />
          <img
            src="/src/assets/images/pakaianadat-2.png"
            alt="Alat Musik Tradisional"
            class="w-full h-[220px] md:h-[350px] object-cover rounded-2xl"
          />
        </div>

        {/* Grid 3 gambar bawah */}
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <img
            src="/src/assets/images/pakaianadat-3.png"
            alt="Pakaian Adat"
            class="w-full h-[220px] md:h-[350px] object-cover rounded-2xl"
          />
          <img
            src="/src/assets/images/pakaianadat-4.png"
            alt="Tarian Daerah"
            class="w-full h-[220px] md:h-[350px] object-cover rounded-2xl"
          />
          <img
            src="/src/assets/images/pakaianadat-5.png"
            alt="Festival Budaya"
            class="w-full h-[220px] md:h-[350px] object-cover rounded-2xl"
          />
        </div>
      </section>
    </div>
  );
}

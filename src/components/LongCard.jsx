export default function LongCard({ imgSrc, title, description }) {
  return (
    <div class="long-card flex relative items-center w-full max-w-full rounded-3xl py-6 px-7 transition duration-500 group hover:bg-[#264653]">
      {/* Kiri: Teks */}
      <div class="flex-grow pr-8">
        <p class="text-3xl hover:text-white font-medium text-gray-700 group-hover:text-white transition">
          {title}
        </p>
        <p class="text-xl text-gray-600 mt-2 group-hover:text-white transition max-w-full md:max-w-[450px]">
          {description}
        </p>
      </div>

      {/* Kanan: Gambar & Tombol */}
      <div class="flex items-center space-x-5 flex-shrink-0">
        <img
          src={imgSrc}
          alt=""
          class="hidden md:block absolute top-1/2 right-12 transform -translate-y-1/2 translate-x-8 opacity-0 w-96 h-[180px] object-cover rounded-2xl group-hover:opacity-100 transition duration-500"
        />
      </div>
    </div>
  );
}

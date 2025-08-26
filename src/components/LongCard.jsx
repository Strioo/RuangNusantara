export default function LongCard({imgSrc, title, description}) {
  return (
    <div class="long-card flex relative items-center w-full max-w-full rounded-3xl py-6 px-7 transition duration-500 group hover:bg-[#264653]">
      {/* Kiri: Teks */}
      <div class="flex-grow">
        <p class="text-3xl hover:text-white font-medium text-gray-700 group-hover:text-white">
          {title}
        </p>
        <p class="text-xl text-gray-600 mt-2 w-[450px] group-hover:text-white">
          {description}
        </p>
      </div>
      {/* Kanan: Gambar & Tombol */}
      <div class="flex items-center space-x-5 flex-shrink-0">
        <img
          src={imgSrc}
          alt=""
          class="absolute top-1/2 right-30 transform -translate-y-1/2 translate-x-8 opacity-0 w-96 object-cover rounded-2xl group-hover:opacity-100 transition duration-500 "
        />
        <button class="btn btn-circle bg-transparent border-white text-xl text-gray-400 group-hover:bg-white/20 group-hover:border-gray-100 ">
          <img
            src="/src/assets/images/ArrowRight.png"
            class="h-6 w-6 shadow-none arrow-img transition duration-500 group-hover:-rotate-45"
            alt=""
          />
        </button>
      </div>
    </div>
  );
}

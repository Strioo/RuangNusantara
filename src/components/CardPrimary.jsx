export default function CardPrimary({ imgSrc, title, description }) {
  return (
    <div>
      <div class="bg-[#1B323B] flex flex-col  rounded-2xl p-7 hover:shadow hover: gap-5 text-white group hover:bg-white transition duration-500">
        <div class="text-blue-900 bg-white w-12 h-12 flex items-center justify-center rounded-full text-2xl group-hover:bg-[#1B323B] transition duration-500">
          <img src={imgSrc} class="group-hover:invert" alt="" />
        </div>
        <div>
          <p class="font-medium text-2xl mb-1 group-hover:text-[#0E2810]">{title}</p>
          <p class="text-gray-400 text-[18px]">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

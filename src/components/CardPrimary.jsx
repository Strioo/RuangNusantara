export default function CardPrimary({ imgSrc, title, description }) {
  return (
    <div>
      <div class="card-primary hover:card-primary flex flex-col  rounded-2xl p-7 hover:shadow hover: gap-5 text-white">
        <div class="circle-image text-blue-900 w-12 h-12 flex items-center justify-center rounded-full text-2xl">
          <img src={imgSrc} alt="" />
        </div>
        <div>
          <p class="font-medium text-2xl mb-1">{title}</p>
          <p class="text-gray-400 text-[18px]">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

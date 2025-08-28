export default function ListCardArtikel({
  imgSrc,
  title,
  description,
  linkpage,
}) {
  return (
    <a
      href={linkpage}
      class="flex flex-col sm:flex-row gap-3 bg-white rounded-xl items-center p-2 md:p-4 transition hover:shadow-lg"
    >
      <img
        src={imgSrc}
        alt=""
        class="w-[140px] md:w-[256px] h-[110px] md:h-[192px] object-cover rounded-xl flex-shrink-0"
      />
      <div class="flex flex-col gap-2">
        <p class="font-medium text-lg md:text-2xl mb-1 text-black">{title}</p>
        <p class="text-gray-500 text-[12px] md:text-sm leading-snug">
          {description}
        </p>
      </div>
    </a>
  );
}

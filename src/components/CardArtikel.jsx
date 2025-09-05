import { useNavigate } from "@solidjs/router";

export default function CardArtikel(props) {
  const navigate = useNavigate();

  function goToDetail() {
    navigate(`/artikel/${props.id}`);
  }

  return (
    <div
      class="rounded-2xl bg-white shadow cursor-pointer p-6 flex flex-col gap-4 w-[340px] md:w-[400px] h-[480px] min-w-[340px] hover:shadow-lg transition-shadow duration-300"
      onClick={goToDetail}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && goToDetail()}
    >
      <img
        src={props.imgSrc}
        alt={props.title}
        class="w-full h-[220px] object-cover rounded-xl mb-3"
      />
      <h2 class="font-semibold text-xl text-black mb-1 line-clamp-2">{props.title}</h2>
      <p class="text-gray-600 text-base mb-2 line-clamp-3">{props.description}</p>
      <div class="flex gap-2 text-gray-500 text-sm items-center mt-auto">
        <span>{props.author}</span>
        <span>•</span>
        <span>{props.date}</span>
      </div>
    </div>
  );
}

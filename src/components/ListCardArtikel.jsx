import { useNavigate } from "@solidjs/router";

export default function ListCardArtikel(props) {
  const navigate = useNavigate();

  function goToDetail() {
    if (props.id) {
      navigate(`/artikel/${props.id}`);
    } else if (props.linkpage) {
      navigate(props.linkpage);
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={goToDetail}
      onKeyPress={(e) => e.key === "Enter" && goToDetail()}
      class="flex flex-row gap-3 bg-white rounded-xl items-center p-2 md:p-4 cursor-pointer transition hover:shadow-lg"
    >
      <img
        src={props.imgSrc}
        alt={props.title || ""}
        class="w-[140px] md:w-[256px] h-[110px] md:h-[192px] object-cover rounded-xl flex-shrink-0"
      />
      <div class="flex flex-col gap-2">
        <p class="font-medium text-lg md:text-2xl mb-1 text-black">{props.title}</p>
        <p class="text-gray-500 text-[12px] md:text-sm leading-snug">{props.description}</p>
      </div>
    </div>
  );
}

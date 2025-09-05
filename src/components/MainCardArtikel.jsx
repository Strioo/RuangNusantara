import { useNavigate } from "@solidjs/router";

export default function MainCardArtikel(props) {
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
      class="relative flex-1 min-h-[350px] lg:min-h-[620px] rounded-2xl overflow-hidden flex bg-cover bg-center cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
      style={{ background: `url('${props.imgSrc}')` }}
      onClick={goToDetail}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === "Enter" && goToDetail()}
    >
      <div class="absolute inset-0 bg-black/40"></div>
      <div class="relative z-10 flex flex-col justify-end p-6 md:p-10 w-full h-full">
        <p class="text-white text-2xl md:text-5xl font-medium mb-4 drop-shadow leading-tight">
          {props.title}
        </p>
        <p class="text-white/90 mb-6 text-base md:text-lg max-w-2xl leading-snug">
          {props.description}
        </p>
        <div class="flex items-center gap-3 text-white/80 text-sm">
          <span>{props.author}</span>
          <span>•</span>
          <span>{props.date}</span>
        </div>
      </div>
    </div>
  );
}

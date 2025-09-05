export default function CardPermainan(props) {
  const { imgSrc, title, description, onButtonClick } = props;

  return (
    <div class="card rounded-4xl bg-white transition-all duration-500 group hover:bg-[#1B323B] cursor-pointer">
      <img
        src={imgSrc}
        alt={title}
        class="w-auto object-cover p-5 rounded-[42px]"
      />
      <div class="card-body pt-0">
        <p class="card-title text-black text-2xl font-medium group-hover:text-white">{title}</p>
        <p class="text-gray-500 group-hover:text-white">
          {description}
        </p>
        <div class="card-actions mt-2">
          <button
            class="btn btn-primary btn-sm p-5 text-sm rounded-full group-hover:bg-white group-hover:text-black"
            onClick={onButtonClick}
            type="button"
          >
            Pelajari Cara Main
          </button>
        </div>
      </div>
    </div>
  );
}

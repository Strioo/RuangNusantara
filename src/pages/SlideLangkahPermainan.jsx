import { useParams } from "@solidjs/router";
import { createSignal, createResource, Show } from "solid-js";
import NavBack from "../components/NavBack";

const fetchPermainan = async (id) => {
  if (!id) return null;
  const res = await fetch("http://localhost:4000/permainan/" + id);
  if (!res.ok) throw new Error("Gagal memuat data permainan");
  const data = await res.json();
  if (!data || Object.keys(data).length === 0 || !data.title) return null;
  return data;
};

export default function SlideLangkahPermainan() {
  const params = useParams();
  const [activeStep, setActiveStep] = createSignal(0);
  const [permainan] = createResource(() => params.id, fetchPermainan);

  const getTotalSteps = () =>
    permainan()?.steps?.length ? permainan().steps.length + 1 : 1;

  const handlePrev = () => setActiveStep((s) => Math.max(s - 1, 0));
  const handleNext = () =>
    setActiveStep((s) => Math.min(s + 1, getTotalSteps() - 1));

  return (
    <Show
      when={permainan()}
      fallback={<div class="text-center text-black py-10">Memuat data...</div>}
    >
      {() => {
        const game = permainan();
        return (
          <div class="mx-auto px-4 pt-10 pb-14">
            <div class="flex flex-col md:flex-row gap-8 items-start">
              <div class="w-full flex flex-col">
                <NavBack />
                {activeStep() === 0 ? (
                  <div class="flex flex-col md:flex-row gap-12 items-center">
                    <div class="md:w-8/12 w-full">
                      <h1 class="text-4xl md:text-5xl font-bold mb-6 text-black">
                        {game.title}
                      </h1>
                      <p class="text-gray-700 text-xl md:text-2xl">
                        {game.definition}
                      </p>
                    </div>
                    <div class="md:w-4/12 w-full flex justify-center">
                      {game.imgSrc && (
                        <img
                          src={game.imgSrc}
                          alt={game.title}
                          class="w-full rounded-2xl object-cover h-[260px] md:h-[320px] max-w-[450px]"
                        />
                      )}
                    </div>
                  </div>
                ) : (
                  <div class="flex flex-col md:flex-row gap-12 items-center">
                    <div class="md:w-8/12 w-full">
                      <div class="mb-5">
                        <span class="bg-[#264653] text-white text-xl font-bold rounded-full w-11 h-11 flex items-center justify-center mb-3">
                          {activeStep()}
                        </span>
                        <h2 class="text-3xl font-semibold mb-3 text-black">
                          {game.steps[activeStep() - 1]?.title}
                        </h2>
                      </div>
                      <p class="text-gray-700 text-lg md:text-xl">
                        {game.steps[activeStep() - 1]?.description}
                      </p>
                    </div>
                    <div class="md:w-4/12 w-full flex justify-center">
                      {game.steps[activeStep() - 1]?.imgSrc && (
                        <img
                          src={game.steps[activeStep() - 1].imgSrc}
                          alt={game.steps[activeStep() - 1]?.title}
                          class="w-full rounded-2xl object-cover h-[260px] md:h-[320px] max-w-[450px]"
                        />
                      )}
                    </div>
                  </div>
                )}
                <div class="flex items-center justify-between w-full mt-10">
                  <button
                    class="w-11 h-11 rounded-full bg-gray-100 cursor-pointer hover:bg-gray-300 transition duration-300 flex items-center justify-center text-2xl"
                    disabled={activeStep() === 0}
                    style={{ opacity: activeStep() === 0 ? 0.5 : 1 }}
                    onClick={handlePrev}
                  >
                    <img
                      src="/src/assets/images/ArrowRight.png"
                      class="rotate-180 w-6 h-6"
                      alt=""
                    />
                  </button>
                  <div class="w-full mx-3 flex items-center">
                    <div class="w-full h-3 bg-gray-200 rounded-full flex items-center relative">
                      <div
                        class="h-3 bg-[#264653] rounded-full absolute top-0 left-0"
                        style={{
                          width: `${
                            (activeStep() / (getTotalSteps() - 1)) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <button
                    class="w-11 h-11 rounded-full bg-gray-100 cursor-pointer hover:bg-gray-300 transition duration-300 flex items-center justify-center text-2xl"
                    disabled={activeStep() === getTotalSteps() - 1}
                    style={{
                      opacity: activeStep() === getTotalSteps() - 1 ? 0.5 : 1,
                    }}
                    onClick={handleNext}
                  >
                    <img
                      src="/src/assets/images/ArrowRight.png"
                      class="w-6 h-6"
                      alt=""
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </Show>
  );
}

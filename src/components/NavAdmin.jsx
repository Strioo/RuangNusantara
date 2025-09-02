import { createSignal, onMount, onCleanup } from "solid-js";
import { BiSolidBell, BiSolidSearch, BiSolidChevronDown } from "solid-icons/bi";

export default function NavAdmin() {
  const [username, setUsername] = createSignal("Adhara Faliya");

  const updateUsername = () => {
    const name = localStorage.getItem("user_name");
    if (name) setUsername(name);
  };

  onMount(() => {
    updateUsername();
    const handleStorageChange = (event) => {
      if (event.key === "user_name") updateUsername();
    };
    window.addEventListener("storage", handleStorageChange);
    onCleanup(() => window.removeEventListener("storage", handleStorageChange));
  });

  return (
    <nav
      id="nav-admin"
      class="fixed top-0 left-64 right-0 bg-white border-l border-b border-[#EDEDED] px-6 z-40"
    >
      <div class="min-h-20 h-auto py-3 flex items-center justify-between">
        {/* Left: Greeting like the reference */}
        <div class="leading-tight">
          <p class="text-[22px] md:text-2xl font-semibold text-black">
            Selamat Datang, {username().split(" ")[0]}!
          </p>
          <p class="text-sm text-[#5B6B8A]">
            Berikut adalah rincian informasi tentang datamu
          </p>
        </div>

        {/* Right: Search, Bell, Avatar + Name + caret */}
        <div class="flex items-center gap-3 md:gap-4">
          {/* Search icon */}
          <button class="btn btn-ghost btn-circle">
            <BiSolidSearch size={20} />
          </button>

          {/* Notification */}
          <button class="relative btn btn-ghost btn-circle">
            <BiSolidBell size={20} />
            <span class="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Avatar + name */}
          <div class="flex items-center gap-2">
            <div class="avatar">
              <div class="w-9 md:w-10 rounded-full ring ring-[#B477D9] ring-offset-2" />
            </div>
            <span class="hidden sm:inline text-sm md:text-base text-black/80">
              {username()}
            </span>
            <BiSolidChevronDown size={18} class="text-black/60" />
          </div>
        </div>
      </div>
    </nav>
  );
}

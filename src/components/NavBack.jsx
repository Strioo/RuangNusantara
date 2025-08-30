import { createSignal } from "solid-js";
import { A, useLocation } from "@solidjs/router";

const navItems = [
  { name: "Beranda", href: "/", exact: true },
  { name: "Tentang", href: "/about" },
  { name: "Artikel", href: "/artikel" },
  { name: "Galeri", href: "/galery" },
];

export default function NavBack() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = createSignal(false);

  // Index menu Artikel ingin selalu aktif (2)
  const activeIdxStatic = 2;

  return (
    <>
      {/* Navbar utama */}
      <nav class="bg-[#264653] rounded-full px-4 py-2 w-full sm:w-fit flex items-center mx-auto justify-between sm:justify-normal gap-10 relative z-50 mt-4 mb-10">
        {/* Tombol back */}
        <button
          class="w-10 h-10 rounded-full cursor-pointer bg-[#F5F5F5] flex justify-center items-center"
          aria-label="Kembali"
          onClick={() => history.back()}
        >
          <img src="/src/assets/images/ArrowRight.png" class="h-5 rotate-180" alt="" />
        </button>

        {/* Nav desktop */}
        <div class="hidden sm:flex gap-6">
          {navItems.map((item, idx) => (
            <A
              href={item.href}
              class={`px-5 py-2 rounded-full font-medium transition ${
                idx === activeIdxStatic
                  ? "bg-[#1B323B] text-white shadow"
                  : location.pathname === item.href
                  ? "bg-[#1B323B] text-white shadow"
                  : "text-white hover:bg-[#1B323B]"
              }`}
              end={item.exact}
            >
              {item.name}
            </A>
          ))}
        </div>

        {/* Burger icon mobile */}
        <button
          aria-label="Toggle menu"
          class="sm:hidden p-2 rounded-full flex items-center justify-center text-white bg-[#1B323B]"
          onClick={() => setMenuOpen(true)}
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* Overlay */}
      <div
        class={`fixed inset-0 bg-black bg-opacity-70 z-40 transition-opacity duration-300 ${
          menuOpen() ? "opacity-50 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      ></div>

      {/* Sidebar drawer dari kiri */}
      <aside
        class={`fixed top-0 left-0 w-64 h-full bg-white z-50 shadow-lg transform transition-transform duration-300 ${
          menuOpen() ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav class="flex flex-col p-6 gap-4 mt-16">
          {navItems.map((item, idx) => (
            <A
              href={item.href}
              class={`px-4 py-2 rounded-md font-medium transition ${
                idx === activeIdxStatic
                  ? "bg-[#264653] text-white shadow"
                  : location.pathname === item.href
                  ? "bg-[#264653] text-white shadow"
                  : "text-gray-900 hover:bg-gray-200"
              }`}
              end
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </A>
          ))}
        </nav>
      </aside>
    </>
  );
}

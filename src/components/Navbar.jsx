import { createSignal } from "solid-js";
import { A, useLocation } from "@solidjs/router";

const navItems = [
  { name: "Beranda", href: "/" },
  { name: "Tentang", href: "/about" },
  { name: "Artikel", href: "/artikel" },
  { name: "Galeri", href: "/galery" },
];

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = createSignal(false);

  return (
    <>
      {/* Navbar utama */}
      <nav class="bg-white/30 backdrop-blur-lg border border-gray-100 rounded-3xl px-4 py-2 w-full flex items-center justify-between relative z-50 mt-4">
        {/* Logo dan nama */}
        <A href="/" class="flex items-center gap-2 text-white font-medium text-lg">
          <img src="/src/assets/images/logo.svg" alt="Logo" class="w-7 h-7" />
          <span>RuangNusantara</span>
        </A>

        {/* Navigasi desktop */}
        <div class="hidden lg:flex gap-8">
          {navItems.map(item => (
            <A
              href={item.href}
              class={`px-5 py-2 rounded-full font-medium transition ${
                location.pathname === item.href ? "bg-white text-black shadow-md" : "text-white hover:bg-white hover:text-black"
              }`}
              end
            >
              {item.name}
            </A>
          ))}
        </div>

        {/* Tombol register/login desktop */}
        <div class="hidden lg:flex items-center gap-4">
          <A href="/register" class="text-white font-medium hover:underline">
            register
          </A>
          <A
            href="/login"
            class="bg-[#264653] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#516B75] transition"
          >
            Login
          </A>
        </div>

        {/* Burger icon di kanan */}
        <button
          aria-label="Toggle menu"
          class="lg:hidden p-2 rounded-md flex items-center justify-center text-white hover:bg-gray-200"
          onClick={() => setMenuOpen(!menuOpen())}
        >
          <svg
            class={`w-6 h-6 transition-transform duration-300 ${menuOpen() ? "rotate-90" : "rotate-0"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* Overlay hitam background (tutup menu jika klik di luar) */}
      <div
        class={`fixed inset-0 bg-black bg-opacity-70 z-40 transition-opacity duration-300 ${
          menuOpen() ? "opacity-50 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Side drawer menu overlay muncul dari kiri */}
      <aside
        class={`fixed top-0 left-0 w-64 h-full bg-white z-50 shadow-lg transform transition-transform duration-300 ${
          menuOpen() ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav class="flex flex-col p-6 gap-4 mt-16">
          {navItems.map(item => (
            <A
              href={item.href}
              class={`px-4 py-2 rounded-md font-medium transition ${
                location.pathname === item.href ? "bg-[#264653] text-white shadow" : "text-gray-900 hover:bg-gray-200"
              }`}
              end
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </A>
          ))}
          <hr class="border-gray-300 my-2" />
          <A href="/register" class="px-4 py-2 rounded-md text-gray-900 font-medium hover:bg-gray-200" onClick={() => setMenuOpen(false)}>
            register
          </A>
          <A href="/login" class="bg-[#264653] text-white px-4 py-2 rounded-md font-semibold hover:bg-gray-700 transition text-center" onClick={() => setMenuOpen(false)}>
            Login
          </A>
        </nav>
      </aside>
    </>
  );
}

import { A, useLocation } from "@solidjs/router";

const navItems = [
  { name: "Beranda", href: "/" },
  { name: "Tentang", href: "/about" },
  { name: "Artikel", href: "/artikel" },
  { name: "Galeri", href: "/galeri" },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <nav class="navbar flex-wrap w-full max-w-max mx-auto bg-white/20 border border-gray-100 rounded-3xl sm:rounded-full min-h-0 px-2 py-2 overflow-x-auto">
      <div class="flex gap-1 sm:gap-3 flex-wrap justify-center items-center">
        {navItems.map(item => (
          <A
            href={item.href}
            class={`
              btn px-4 py-2 rounded-full font-light 
              whitespace-nowrap
              ${location.pathname === item.href
                ? "btn-primary"
                : "btn-ghost text-white font-normal hover:btn-primary"
              }
            `}
            end
          >
            {item.name}
          </A>
        ))}
      </div>
    </nav>
  );
}

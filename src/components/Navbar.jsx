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
    <nav class="navbar max-w-max bg-white/20 border border-gray-100 rounded-full min-h-0 p-1">
      <div class="flex gap-3">
        {navItems.map(item => (
          <A
            href={item.href}
            class={`btn px-4 py-5 rounded-full font-light ${
              location.pathname === item.href
                ? "btn-primary"
                : "btn-ghost text-white font-normal hover:btn-primary"
            }`}
            end
          >
            {item.name}
          </A>
        ))}
      </div>
    </nav>
  );
}

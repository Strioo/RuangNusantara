import { createSignal, onMount } from "solid-js";
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
  const [currentUser, setCurrentUser] = createSignal(null);

  // cek localStorage saat load
  onMount(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  });

  const handleLogout = async () => {
    const token = localStorage.getItem("authToken");

    try {
      const res = await fetch("http://127.0.0.1:8080/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const msg = await res.text();
        alert(msg || "Logout gagal");
      } else {
        alert("Anda berhasil logout");
      }
    } catch (err) {
      console.error(err);
      alert("Error jaringan saat logout");
    }

    // clear localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    window.location.href = "/";
  };

  return (
    <>
      <nav class="bg-white/30 backdrop-blur-lg border border-gray-100 rounded-3xl px-4 py-2 w-full flex items-center justify-between relative z-50 mt-4">
        <A
          href="/"
          class="flex items-center gap-2 text-white font-medium text-lg"
        >
          <span>RuangNusantara</span>
        </A>

        {/* Menu desktop */}
        <div class="hidden lg:flex gap-8">
          {navItems.map((item) => (
            <A
              href={item.href}
              class={`px-5 py-2 rounded-full font-medium transition ${
                location.pathname === item.href
                  ? "bg-white text-black shadow-md"
                  : "text-white hover:bg-white hover:text-black"
              }`}
              end
            >
              {item.name}
            </A>
          ))}
        </div>

        {/* kanan desktop */}
        <div class="hidden lg:flex items-center gap-4">
          {currentUser() ? (
            <>
              <span class="text-white font-medium">
                👋 {currentUser().username}
              </span>
              <button
                onClick={handleLogout}
                class="bg-[#264653] text-white px-4 py-2 rounded-md font-semibold hover:bg-[#516B75] transition text-center"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <A href="/signup" class="text-white font-medium hover:underline">
                Register
              </A>
              <A
                href="/signin"
                class="bg-[#264653] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#516B75] transition"
              >
                Login
              </A>
            </>
          )}
        </div>

        {/* Burger mobile */}
        <button
          aria-label="Toggle menu"
          class="lg:hidden p-2 rounded-md flex items-center justify-center text-white hover:bg-gray-200"
          onClick={() => setMenuOpen(!menuOpen())}
        >
          <svg
            class={`w-6 h-6 transition-transform duration-300 ${
              menuOpen() ? "rotate-90" : "rotate-0"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </nav>

      {/* Overlay */}
      <div
        class={`fixed inset-0 bg-black bg-opacity-70 z-40 transition-opacity duration-300 ${
          menuOpen()
            ? "opacity-50 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Side drawer */}
      <aside
        class={`fixed top-0 left-0 w-64 h-full bg-white z-50 shadow-lg transform transition-transform duration-300 ${
          menuOpen() ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav class="flex flex-col p-6 gap-4 mt-16">
          {navItems.map((item) => (
            <A
              href={item.href}
              class={`px-4 py-2 rounded-md font-medium transition ${
                location.pathname === item.href
                  ? "bg-[#264653] text-white shadow"
                  : "text-gray-900 hover:bg-gray-200"
              }`}
              end
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </A>
          ))}

          <hr class="border-gray-300 my-2" />

          {currentUser() ? (
            <>
              <span class="px-4 py-2 text-gray-900 font-medium">
                👋 {currentUser().username}
              </span>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                class="bg-[#264653] text-white px-4 py-2 rounded-md font-semibold hover:bg-[#516B75] transition text-center"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <A
                href="/signup"
                class="px-4 py-2 rounded-md text-gray-900 font-medium hover:bg-gray-200"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </A>
              <A
                href="/signin"
                class="bg-[#264653] text-white px-4 py-2 rounded-md font-semibold hover:bg-[#516B75] transition text-center"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </A>
            </>
          )}
        </nav>
      </aside>
    </>
  );
}

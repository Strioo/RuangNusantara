import { createSignal, onMount, Show } from "solid-js";
import { A, useLocation } from "@solidjs/router";
import { FiAlertCircle, FiCheckCircle } from "solid-icons/fi";

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
  const [loggingOut, setLoggingOut] = createSignal(false);

  // ==== POPUP STATE ====
  const [popupOpen, setPopupOpen] = createSignal(false);
  const [popupType, setPopupType] = createSignal("info"); // success | error | info
  const [popupTitle, setPopupTitle] = createSignal("");
  const [popupMsg, setPopupMsg] = createSignal("");
  const [popupPrimaryText, setPopupPrimaryText] = createSignal("OK");
  const [popupSecondaryText, setPopupSecondaryText] = createSignal("");
  let popupPrimaryAction = () => setPopupOpen(false);
  let popupSecondaryAction = () => setPopupOpen(false);

  const openPopup = ({
    type,
    title,
    msg,
    primaryText = "OK",
    onPrimary,
    secondaryText = "",
    onSecondary,
  }) => {
    setPopupType(type);
    setPopupTitle(title);
    setPopupMsg(msg);
    setPopupPrimaryText(primaryText);
    setPopupSecondaryText(secondaryText);
    popupPrimaryAction = onPrimary || (() => setPopupOpen(false));
    popupSecondaryAction = onSecondary || (() => setPopupOpen(false));
    setPopupOpen(true);
  };

  const IconByType = () =>
    popupType() === "success" ? (
      <FiCheckCircle size={60} class="text-green-500 mb-3" />
    ) : popupType() === "error" ? (
      <FiAlertCircle size={60} class="text-red-500 mb-3" />
    ) : (
      <FiAlertCircle size={60} class="text-[#264653] mb-3" />
    );

  onMount(() => {
    const user = localStorage.getItem("currentUser");
    if (user) setCurrentUser(JSON.parse(user));
  });

  const finishLogoutFE = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  };

  // 1) Tampilkan konfirmasi dulu
  const confirmLogout = () => {
    if (loggingOut()) return;
    openPopup({
      type: "info",
      title: "Konfirmasi Logout",
      msg: "Yakin ingin keluar dari akun?",
      primaryText: "Ya, Logout",
      onPrimary: () => {
        setPopupOpen(false);
        doLogout();
      },
      secondaryText: "Batal",
      onSecondary: () => setPopupOpen(false),
    });
  };

  // 2) Eksekusi logout → tampilkan popup hasil
  const doLogout = async () => {
    setLoggingOut(true);
    const token = localStorage.getItem("authToken");

    try {
      if (token) {
        const res = await fetch("http://127.0.0.1:8080/logout", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });

        let payload;
        try {
          payload = await res.json();
        } catch {
          payload = await res.text();
        }

        if (!res.ok) {
          finishLogoutFE();
          openPopup({
            type: "error",
            title: "Logout Gagal di Server",
            msg:
              (typeof payload === "string" ? payload : payload?.message) ||
              "Terjadi kesalahan saat logout di server. Sesi lokal telah dihapus.",
            primaryText: "Kembali ke Beranda",
            onPrimary: () => {
              setPopupOpen(false);
              window.location.href = "/";
            },
          });
          return;
        }
      }

      finishLogoutFE();
      openPopup({
        type: "success",
        title: "Logout Berhasil",
        msg: "Anda telah keluar dari akun.",
        primaryText: "Kembali ke Beranda",
        onPrimary: () => {
          setPopupOpen(false);
          window.location.href = "/";
        },
      });
    } catch (err) {
      console.error(err);
      finishLogoutFE();
      openPopup({
        type: "error",
        title: "Kesalahan Jaringan",
        msg: "Tidak dapat terhubung ke server. Sesi lokal telah dihapus.",
        primaryText: "Kembali ke Beranda",
        onPrimary: () => {
          setPopupOpen(false);
          window.location.href = "/";
        },
      });
    } finally {
      setLoggingOut(false);
    }
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
                onClick={confirmLogout}
                disabled={loggingOut()}
                class={`${
                  loggingOut() ? "opacity-60 cursor-not-allowed" : ""
                } bg-[#264653] text-white px-4 py-2 rounded-md font-semibold hover:bg-[#516B75] transition text-center`}
              >
                {loggingOut() ? "Logging out..." : "Logout"}
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
                  confirmLogout();
                  setMenuOpen(false);
                }}
                disabled={loggingOut()}
                class={`${
                  loggingOut() ? "opacity-60 cursor-not-allowed" : ""
                } bg-[#264653] text-white px-4 py-2 rounded-md font-semibold hover:bg-[#516B75] transition text-center`}
              >
                {loggingOut() ? "Logging out..." : "Logout"}
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

      {/* ===== POPUP ===== */}
      <Show when={popupOpen()}>
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div class="bg-white rounded-lg shadow-xl p-6 w-96">
            <div class="flex flex-col items-center text-center">
              <IconByType />
              <h2 class="text-lg font-semibold text-gray-800 mb-2">
                {popupTitle()}
              </h2>
              <p class="text-sm text-gray-600 mb-6">{popupMsg()}</p>

              <div class="flex gap-4">
                <button
                  onClick={() => popupPrimaryAction()}
                  class="px-4 py-2 bg-[#264653] text-white rounded-lg hover:bg-[#516B75] transition"
                >
                  {popupPrimaryText()}
                </button>
                <Show when={popupSecondaryText()}>
                  <button
                    onClick={() => popupSecondaryAction()}
                    class="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                  >
                    {popupSecondaryText()}
                  </button>
                </Show>
              </div>
            </div>
          </div>
        </div>
      </Show>
    </>
  );
}

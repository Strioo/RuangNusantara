// src/components/Sidebar.jsx
import { useLocation, useNavigate } from "@solidjs/router";
import { createSignal, onCleanup, onMount, Show } from "solid-js";
import { BiSolidUser, BiSolidBook, BiSolidLogOutCircle } from "solid-icons/bi";
import { FiAlertCircle, FiCheckCircle } from "solid-icons/fi";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [loggingOut, setLoggingOut] = createSignal(false);
  const [showLogoutPopup, setShowLogoutPopup] = createSignal(false);

  // simple toast: { type: 'success' | 'error', msg: string }
  const [toast, setToast] = createSignal(null);
  let toastTimer;

  const mainMenu = [
    {
      key: "users",
      label: "Users Data",
      icon: BiSolidUser,
      path: "/usersmanagement",
    },
    {
      key: "article",
      label: "Article",
      icon: BiSolidBook,
      path: "/articlemanagement",
    },
  ];

  const openLogoutPopup = () => setShowLogoutPopup(true);
  const closeLogoutPopup = () => setShowLogoutPopup(false);

  const showToast = (type, msg) => {
    clearTimeout(toastTimer);
    setToast({ type, msg });
    toastTimer = setTimeout(() => setToast(null), 3000);
  };

  const confirmLogout = async () => {
    if (loggingOut()) return;
    setLoggingOut(true);

    const token = localStorage.getItem("authToken");
    try {
      if (token) {
        const res = await fetch("http://127.0.0.1:8080/logout", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          const msg = await res.text().catch(() => "");
          console.warn("Logout server response:", msg || res.status);
        }
      }
      localStorage.removeItem("authToken");
      localStorage.removeItem("currentUser");
      showToast("success", "Berhasil logout");
      navigate("/", { replace: true });
    } catch (e) {
      console.error("Logout request failed:", e);
      showToast("error", "Gagal logout (jaringan)");
    } finally {
      setLoggingOut(false);
      closeLogoutPopup();
    }
  };

  // ESC untuk menutup popup
  const onKeyDown = (e) => {
    if (e.key === "Escape" && showLogoutPopup()) closeLogoutPopup();
  };
  onMount(() => window.addEventListener("keydown", onKeyDown));
  onCleanup(() => window.removeEventListener("keydown", onKeyDown));

  return (
    <>
      <aside class="fixed top-0 left-0 h-screen w-64 bg-white border-r border-[#EDEDED] flex flex-col">
        {/* Logo (klik ke beranda) */}
        <div class="flex items-center p-4 border-b">
          <button
            type="button"
            aria-label="Ke beranda"
            onClick={() => navigate("/")}
            class="text-left cursor-pointer focus:outline-none"
          >
            <p class="text-xl text-[#264653] font-bold hover:underline">
              Ruang<span class="text-[#264653]"> Nusantara</span>
            </p>
          </button>
        </div>

        {/* Main Menu */}
        <nav class="flex-1 p-4 overflow-y-auto">
          <p class="text-gray-400 text-sm mb-2">Main Menu</p>
          <ul class="space-y-2">
            {mainMenu.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li>
                  <button
                    class={`flex items-center w-full px-3 py-2 rounded-lg transition ${
                      isActive
                        ? "bg-[#264653] text-white"
                        : "text-gray-700 hover:bg-[#264653] hover:text-white"
                    }`}
                    onClick={() => navigate(item.path)}
                  >
                    <item.icon class="mr-2" size={20} />
                    {item.label}
                  </button>
                </li>
              );
            })}

            {/* Logout */}
            <li class="pt-4 mt-4 border-t border-[#EDEDED]">
              <button
                onClick={openLogoutPopup}
                class="flex items-center w-full px-3 py-2 rounded-lg text-gray-700 hover:bg-red-500 hover:text-white transition"
              >
                <BiSolidLogOutCircle class="mr-2" size={20} />
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* POPUP KONFIRMASI LOGOUT */}
      <Show when={showLogoutPopup()}>
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div class="bg-white rounded-lg shadow-xl p-6 w-96">
            <div class="flex flex-col items-center text-center">
              <FiAlertCircle size={60} class="text-red-500 mb-3" />
              <h2 class="text-lg font-semibold text-gray-800 mb-2">
                Konfirmasi Logout
              </h2>
              <p class="text-sm text-gray-600 mb-6">
                Yakin ingin keluar dari halaman admin?
              </p>

              <div class="flex gap-4">
                <button
                  onClick={confirmLogout}
                  disabled={loggingOut()}
                  class={`px-4 py-2 rounded-lg text-white transition ${
                    loggingOut()
                      ? "bg-red-300 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                >
                  {loggingOut() ? "Logging out..." : "Ya, Logout"}
                </button>
                <button
                  onClick={closeLogoutPopup}
                  class="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      </Show>

      {/* TOAST */}
      <Show when={toast()}>
        <div class="fixed bottom-6 right-6 z-[60]">
          <div
            class={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-white ${
              toast().type === "success" ? "bg-green-600" : "bg-red-600"
            }`}
            role="status"
          >
            {toast().type === "success" ? (
              <FiCheckCircle size={20} />
            ) : (
              <FiAlertCircle size={20} />
            )}
            <span class="text-sm">{toast().msg}</span>
          </div>
        </div>
      </Show>
    </>
  );
}

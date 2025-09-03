// src/components/Sidebar.jsx
import { createSignal } from "solid-js";
import {
  BiSolidDashboard,
  BiSolidUser,
  BiSolidBook,
  BiSolidImage,
  BiSolidLogOutCircle,
} from "solid-icons/bi";

export default function Sidebar() {
  const [active, setActive] = createSignal("dashboard");

  const mainMenu = [
    { key: "dashboard", label: "Dashboard", icon: BiSolidDashboard },
    { key: "users", label: "Users Data", icon: BiSolidUser },
    { key: "article", label: "Article", icon: BiSolidBook },
    { key: "slideshow", label: "Gallery", icon: BiSolidBook },
  ];

  const handleLogout = () => {
    // sementara FE only, nanti bisa sambung ke BE
    alert("Logout clicked!");
  };

  return (
    <aside class="fixed top-0 left-0 h-screen w-64 bg-white border-r flex flex-col">
      {/* Logo */}
      <div class="flex items-center p-4 border-b">
        {/* <img src={Logo} alt="Logo" class="w-10 h-10 mr-2" /> */}
        <h1 class="text-xl text-[#264653] font-bold ">
          Ruang<span class="text-[#264653]"> Nusantara</span>
        </h1>
      </div>

      {/* Main Menu */}
      <nav class="flex-1 p-4 overflow-y-auto">
        <h3 class="text-gray-400 text-sm mb-2">Main Menu</h3>
        <ul class="space-y-2">
          {mainMenu.map((item) => (
            <li>
              <button
                class={`flex items-center w-full px-3 py-2 rounded-lg transition ${
                  active() === item.key
                    ? "bg-[#264653] text-white"
                    : "text-gray-700 hover:bg-[#264653] hover:text-white"
                }`}
                onClick={() => setActive(item.key)}
              >
                <item.icon class="mr-2" size={20} />
                {item.label}
              </button>
            </li>
          ))}

          {/* Logout */}
          <li class="pt-4 mt-4 border-t border-[#EDEDED]">
            <button
              onClick={handleLogout}
              class="flex items-center w-full px-3 py-2 rounded-lg text-gray-700 hover:bg-red-500 hover:text-white transition"
            >
              <BiSolidLogOutCircle class="mr-2" size={20} />
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

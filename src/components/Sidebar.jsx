// src/components/Sidebar.jsx
import { useLocation, useNavigate } from "@solidjs/router";
import {
  BiSolidDashboard,
  BiSolidUser,
  BiSolidBook,
  BiSolidImage,
  BiSolidLogOutCircle,
} from "solid-icons/bi";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const mainMenu = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: BiSolidDashboard,
      path: "/dashboard",
    },
    {
      key: "users",
      label: "Users Data",
      icon: BiSolidUser,
      path: "/usersmanagement",
    },
    { key: "article", label: "Article", icon: BiSolidBook, path: "/articlemanagement" },
    {
      key: "slideshow",
      label: "Gallery",
      icon: BiSolidImage,
      path: "/gallery",
    },
  ];

  const handleLogout = () => {
    // sementara FE only, nanti bisa sambung ke BE
    alert("Logout clicked!");
  };

  return (
    <aside class="fixed top-0 left-0 h-screen w-64 bg-white border-r border-[#EDEDED] flex flex-col">
      {/* Logo */}
      <div class="flex items-center p-4 border-b">
        <p class="text-xl text-[#264653] font-bold">
          Ruang<span class="text-[#264653]"> Nusantara</span>
        </p>
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

import { createSignal, onMount, onCleanup } from "solid-js";
import { BiSolidChevronDown } from "solid-icons/bi";

export default function NavAdmin() {
  const [username, setUsername] = createSignal("Adhara Faliya"); // default
  const [loadingName, setLoadingName] = createSignal(true);

  const loadFromLocal = () => {
    // Navbar kamu menyimpan "currentUser" & "authToken"
    const raw = localStorage.getItem("currentUser");
    if (!raw) return false;
    try {
      const u = JSON.parse(raw);
      if (u?.username) {
        setUsername(u.username);
        return true;
      }
    } catch {}
    return false;
  };

  const fetchMe = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return false;

    try {
      const res = await fetch("http://127.0.0.1:8080/users/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        // token invalid/expired → biarin fallback local
        return false;
      }

      const me = await res.json();
      if (me?.username) {
        setUsername(me.username);
        // sinkronkan ke localStorage biar konsisten sama Navbar
        const raw = localStorage.getItem("currentUser");
        const curr = raw ? JSON.parse(raw) : {};
        localStorage.setItem(
          "currentUser",
          JSON.stringify({
            ...curr,
            username: me.username,
            email: me.email,
            user_id: me.id,
            role: me.role,
          })
        );
        return true;
      }
    } catch (e) {
      console.error("fetch /users/me error:", e);
    }
    return false;
  };

  const updateUsername = async () => {
    // Urutan: coba BE → fallback localStorage
    const ok = await fetchMe();
    if (!ok) {
      const usedLocal = loadFromLocal();
      if (!usedLocal) {
        // fallback terakhir: biarkan default
      }
    }
    setLoadingName(false);
  };

  onMount(() => {
    updateUsername();

    // sinkron bila tab lain mengubah currentUser/authToken
    const handleStorageChange = (event) => {
      if (event.key === "currentUser" || event.key === "authToken") {
        updateUsername();
      }
    };
    window.addEventListener("storage", handleStorageChange);
    onCleanup(() => window.removeEventListener("storage", handleStorageChange));
  });

  // tampilkan first name jika ada spasi
  const firstName = () => {
    const n = username() || "";
    const parts = n.trim().split(/\s+/);
    return parts[0] || n;
  };

  return (
    <nav
      id="nav-admin"
      class="fixed top-0 left-64 right-0 bg-white border-l border-b border-[#EDEDED] px-6 z-40"
    >
      <div class="min-h-20 h-auto py-3 flex items-center justify-between">
        {/* Left: Greeting */}
        <div class="leading-tight">
          <p class="text-[22px] md:text-2xl font-semibold text-black">
            {loadingName() ? "Loading…" : `Welcome, ${firstName()}!`}
          </p>
          <p class="text-sm text-[#5B6B8A] mt-0.5">
            Berikut adalah rincian informasi tentang RuangNusantara
          </p>
        </div>

        {/* Right */}
        <div class="flex items-center gap-3 md:gap-4">
          <div class="flex items-center gap-2">
            <div class="avatar">
              <div class="w-9 md:w-10 rounded-full ring ring-[#B477D9] ring-offset-2 overflow-hidden">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    username()
                  )}&background=264653&color=fff`}
                  alt="User Avatar"
                />
              </div>
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

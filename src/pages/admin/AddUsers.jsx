// src/pages/admin/AddUsers.jsx
import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import Sidebar from "../../components/Sidebar";
import NavAdmin from "../../components/NavAdmin";
import {
  BiSolidUserCircle,
  BiSolidEnvelope,
  BiSolidLockAlt,
  BiSolidShow,
  BiSolidHide,
} from "solid-icons/bi";
import { FiCheckCircle } from "solid-icons/fi";

export default function AddUsers() {
  const [username, setUsername] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [securityQ, setSecurityQ] = createSignal("");
  const [securityA, setSecurityA] = createSignal("");
  const [role, setRole] = createSignal("User");
  const [showPassword, setShowPassword] = createSignal(false);
  const [successOpen, setSuccessOpen] = createSignal(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      username: username().trim(),
      email: email().trim(),
      password: password(),
      security_question: securityQ(),
      security_answer: securityA(),
      role: role(),
    };

    try {
      const res = await fetch("http://127.0.0.1:8080/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      if (!res.ok) throw new Error("Failed to add user");

      setSuccessOpen(true);
      setUsername("");
      setEmail("");
      setPassword("");
      setSecurityQ("");
      setSecurityA("");
      setRole("User");
    } catch (err) {
      console.error("Error add user:", err);
      alert("Gagal menambahkan user!");
    }
  };

  const closeSuccess = () => {
    setSuccessOpen(false);
    navigate("/usersmanagement");
  };

  return (
    <div class="min-h-screen">
      <Sidebar />
      <NavAdmin />

      <main class="ml-64 pt-22 p-6">
        <p class="text-[20px] font-bold mb-6 text-black">Add New User</p>

        <form
          onSubmit={handleSubmit}
          class="max-w-lg space-y-5 bg-white rounded-xl"
        >
          {/* Username */}
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">
              Username
            </label>
            <div class="relative">
              <BiSolidUserCircle
                size={18}
                class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={username()}
                onInput={(e) => setUsername(e.target.value)}
                required
                placeholder="Masukkan username"
                class="pl-10 w-full border border-[#EDEDED] rounded-lg px-3 py-2 text-sm text-black"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <div class="relative">
              <BiSolidEnvelope
                size={18}
                class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="email"
                value={email()}
                onInput={(e) => setEmail(e.target.value)}
                required
                placeholder="Masukkan email"
                class="pl-10 w-full border border-[#EDEDED] rounded-lg px-3 py-2 text-sm text-black"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <div class="relative">
              <BiSolidLockAlt
                size={18}
                class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type={showPassword() ? "text" : "password"}
                value={password()}
                onInput={(e) => setPassword(e.target.value)}
                required
                placeholder="Masukkan password"
                class="pl-10 pr-10 w-full border border-[#EDEDED] rounded-lg px-3 py-2 text-sm text-black"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword())}
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword() ? (
                  <BiSolidHide size={18} />
                ) : (
                  <BiSolidShow size={18} />
                )}
              </button>
            </div>
          </div>

          {/* Security Question */}
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">
              Security Question
            </label>
            <select
              value={securityQ()}
              onChange={(e) => setSecurityQ(e.target.value)}
              required
              class="w-full border border-[#EDEDED] rounded-lg px-3 py-2 text-sm text-black"
            >
              <option value="" disabled selected>
                Pilih pertanyaan keamanan
              </option>
              <option value="Siapa nama ibu kandung Anda?">
                Siapa nama ibu kandung Anda?
              </option>
              <option value="Apa nama sekolah dasar Anda?">
                Apa nama sekolah dasar Anda?
              </option>
              <option value="Di kota mana Anda lahir?">
                Di kota mana Anda lahir?
              </option>
              <option value="Apa makanan favorit Anda?">
                Apa makanan favorit Anda?
              </option>
              <option value="Siapa nama hewan peliharaan Anda?">
                Siapa nama hewan peliharaan Anda?
              </option>
            </select>
          </div>

          {/* Security Answer */}
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">
              Security Answer
            </label>
            <input
              type="text"
              placeholder="Jawaban keamanan"
              value={securityA()}
              onInput={(e) => setSecurityA(e.target.value)}
              required
              class="w-full border border-[#EDEDED] rounded-lg px-3 py-2 text-sm text-black"
            />
          </div>

          {/* Role */}
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              value={role()}
              onChange={(e) => setRole(e.target.value)}
              class="w-full border border-[#EDEDED] rounded-lg px-3 py-2 text-sm text-black"
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          {/* Actions */}
          <div class="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate("/usersmanagement")}
              class="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-[#264653] text-white rounded-lg hover:bg-[#1B323B] transition"
            >
              Save
            </button>
          </div>
        </form>
      </main>

      {successOpen() && (
        <div class="fixed inset-0 z-[60] flex items-center justify-center bg-black/40">
          <div class="bg-white rounded-xl shadow-lg p-6 w-80 text-center">
            <FiCheckCircle size={56} class="text-green-500 mx-auto mb-3" />
            <p class="text-base font-semibold text-gray-800">
              User berhasil ditambahkan!
            </p>
            <button
              onClick={closeSuccess}
              class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

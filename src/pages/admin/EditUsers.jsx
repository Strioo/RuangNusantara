// src/pages/admin/EditUsers.jsx
import { createSignal, onMount } from "solid-js";
import { useParams, useNavigate } from "@solidjs/router";
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

export default function EditUsers() {
  const { email } = useParams(); // email lama dari URL
  const navigate = useNavigate();

  const [username, setUsername] = createSignal("");
  const [newEmail, setNewEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [role, setRole] = createSignal("User"); // default
  const [showPassword, setShowPassword] = createSignal(false);
  const [successOpen, setSuccessOpen] = createSignal(false);

  // ambil user sesuai email
  onMount(() => {
    const savedData = localStorage.getItem("users");
    if (savedData) {
      const users = JSON.parse(savedData);
      const user = users.find((u) => u.email === email);
      if (user) {
        setUsername(user.username);
        setNewEmail(user.email);
        setPassword(user.password);
        setRole(user.role || "User");
      }
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = {
      username: username(),
      email: newEmail(),
      password: password(),
      role: role(),
    };

    const savedData = localStorage.getItem("users");
    if (savedData) {
      let users = JSON.parse(savedData);

      // replace data user
      users = users.map((u) => (u.email === email ? updatedUser : u));

      // kalau email diubah, hapus user lama
      if (email !== newEmail()) {
        users = users.filter((u) => u.email !== email);
        users.push(updatedUser);
      }

      localStorage.setItem("users", JSON.stringify(users));
    }

    // tampilkan popup sukses
    setSuccessOpen(true);
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
        <p class="text-[20px] font-bold mb-6 text-black">Edit User</p>

        <form
          onSubmit={handleSubmit}
          class="max-w-lg space-y-4 bg-white"
        >
          {/* Username */}
          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <BiSolidUserCircle size={20} />
            </span>
            <input
              type="text"
              placeholder="Username"
              value={username()}
              onInput={(e) => setUsername(e.target.value)}
              class="pl-10 w-full border border-[#EDEDED] rounded-lg px-3 py-2 text-black focus:outline-none focus:ring-1 focus:ring-[#EDEDED]"
              required
            />
          </div>

          {/* Email */}
          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <BiSolidEnvelope size={20} />
            </span>
            <input
              type="email"
              placeholder="Email"
              value={newEmail()}
              onInput={(e) => setNewEmail(e.target.value)}
              class="pl-10 w-full border border-[#EDEDED] rounded-lg px-3 py-2 text-black focus:outline-none focus:ring-1 focus:ring-[#EDEDED]"
              required
            />
          </div>

          {/* Password */}
          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <BiSolidLockAlt size={20} />
            </span>
            <input
              type={showPassword() ? "text" : "password"}
              placeholder="Password"
              value={password()}
              onInput={(e) => setPassword(e.target.value)}
              class="pl-10 pr-10 w-full border border-[#EDEDED] rounded-lg px-3 py-2 text-black focus:outline-none focus:ring-1 focus:ring-[#EDEDED]"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword())}
              class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
            >
              {showPassword() ? (
                <BiSolidHide size={20} />
              ) : (
                <BiSolidShow size={20} />
              )}
            </button>
          </div>

          {/* Role */}
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              value={role()}
              onChange={(e) => setRole(e.target.value)}
              class="w-full border border-[#EDEDED] rounded-lg px-3 py-2 text-sm text-black focus:outline-none focus:ring-1 focus:ring-[#EDEDED]"
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          {/* Buttons */}
          <div class="flex justify-end gap-3 pt-4">
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

      {/* ✅ Success Popup */}
      {successOpen() && (
        <div class="fixed inset-0 z-[60] flex items-center justify-center bg-black/40">
          <div class="bg-white rounded-xl shadow-lg p-6 w-80 text-center">
            <FiCheckCircle size={56} class="text-green-500 mx-auto mb-3" />
            <p class="text-base font-semibold text-gray-800">
              User berhasil diperbarui!
            </p>
            <p class="text-sm text-gray-600 mb-5">
              Data user telah disimpan ke database.
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

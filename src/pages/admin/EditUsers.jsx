// src/pages/admin/EditUsers.jsx
import { createSignal, onMount } from "solid-js";
import { useParams, useNavigate } from "@solidjs/router";
import Sidebar from "../../components/Sidebar";
import NavAdmin from "../../components/NavAdmin";
import {
  BiSolidUserCircle,
  BiSolidEnvelope,
  BiSolidLockAlt,
} from "solid-icons/bi";
import { FiCheckCircle } from "solid-icons/fi";

export default function EditUsers() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [username, setUsername] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [role, setRole] = createSignal("User");
  const [status, setStatus] = createSignal("");
  const [securityQ, setSecurityQ] = createSignal("");
  const [securityA, setSecurityA] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [successOpen, setSuccessOpen] = createSignal(false);

  onMount(async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8080/users/edit/${id}`);
      if (!res.ok) throw new Error("Gagal fetch user");
      const data = await res.json();

      setUsername(data.username ?? "");
      setEmail(data.email ?? "");
      setStatus(data.status ?? "");
      setSecurityQ(data.security_question ?? "");
      setSecurityA(data.security_answer ?? "");
      setPassword(data.password ?? "");

      const r = (data.role ?? "User").toString();
      setRole(r.toLowerCase() === "admin" ? "Admin" : "User");
    } catch (err) {
      console.error("Error fetch user:", err);
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        username: username(),
        role: role().toLowerCase(),
      };

      const res = await fetch(`http://localhost:8080/users/edit/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Gagal update user");
      setSuccessOpen(true);
    } catch (err) {
      console.error("Error update user:", err);
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
        <p class="text-[20px] font-bold mb-6 text-black">Edit User</p>

        <form onSubmit={handleSubmit} class="max-w-lg space-y-5 bg-white">
          {/* Username */}
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">
              Username
            </label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <BiSolidUserCircle size={20} />
              </span>
              <input
                type="text"
                value={username()}
                onInput={(e) => setUsername(e.target.value)}
                class="pl-10 w-full border border-[#EDEDED] rounded-lg px-3 py-2 text-black"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <BiSolidEnvelope size={20} />
              </span>
              <input
                type="email"
                value={email()}
                disabled
                class="pl-10 w-full border border-[#EDEDED] bg-gray-100 rounded-lg px-3 py-2 text-black"
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">
              Status
            </label>
            <input
              type="text"
              value={status()}
              disabled
              class="w-full border border-[#EDEDED] bg-gray-100 rounded-lg px-3 py-2 text-black"
            />
          </div>

          {/* Security Question */}
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">
              Security Question
            </label>
            <input
              type="text"
              value={securityQ()}
              disabled
              class="w-full border border-[#EDEDED] bg-gray-100 rounded-lg px-3 py-2 text-black"
            />
          </div>

          {/* Security Answer */}
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">
              Security Answer
            </label>
            <input
              type="text"
              value={securityA()}
              disabled
              class="w-full border border-[#EDEDED] bg-gray-100 rounded-lg px-3 py-2 text-black"
            />
          </div>

          {/* Password */}
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">
              Password (hashed)
            </label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <BiSolidLockAlt size={20} />
              </span>
              <input
                type="text"
                value={password()}
                disabled
                class="pl-10 w-full border border-[#EDEDED] bg-gray-100 rounded-lg px-3 py-2 text-black"
              />
            </div>
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

      {/* Popup sukses */}
      {successOpen() && (
        <div class="fixed inset-0 z-[60] flex items-center justify-center bg-black/40">
          <div class="bg-white rounded-xl shadow-lg p-6 w-80 text-center">
            <FiCheckCircle size={56} class="text-green-500 mx-auto mb-3" />
            <p class="text-base font-semibold text-gray-800">
              User berhasil diperbarui!
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

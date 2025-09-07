import { createSignal, onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";
import AgGridSolid from "solid-ag-grid";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Sidebar from "../../components/Sidebar";
import NavAdmin from "../../components/NavAdmin";
import { FiAlertCircle } from "solid-icons/fi";
import { BiSolidSearch, BiSolidPlusCircle } from "solid-icons/bi";

export default function UsersData() {
  const [rowData, setRowData] = createSignal([]);
  const [filteredData, setFilteredData] = createSignal([]);
  const [searchTerm, setSearchTerm] = createSignal("");
  const [showDeletePopup, setShowDeletePopup] = createSignal(false);
  const [userToDelete, setUserToDelete] = createSignal(null);
  const navigate = useNavigate();

  // Fetch user data dari backend
  const loadUserData = async () => {
    try {
      const res = await fetch("http://localhost:8080/users/data");
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setRowData(data);
      setFilteredData(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  onMount(() => {
    loadUserData();
  });

  // Cari user
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term === "") {
      setFilteredData(rowData());
    } else {
      const filtered = rowData().filter((user) =>
        Object.values(user).some((val) =>
          String(val).toLowerCase().includes(term.toLowerCase())
        )
      );
      setFilteredData(filtered);
    }
  };

  // Konfirmasi hapus
  const confirmDeleteUser = (user) => {
    setUserToDelete(user);
    setShowDeletePopup(true);
  };

  // Delete user via backend
  const deleteUser = async () => {
    const user = userToDelete();
    if (!user?.id) return;

    try {
      const res = await fetch(`http://localhost:8080/users/delete/${user.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete user");

      // refresh data
      await loadUserData();
      setShowDeletePopup(false);
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const closePopup = () => {
    setShowDeletePopup(false);
    setUserToDelete(null);
  };

  const columnDefs = [
    { headerName: "ID", field: "id" },
    { headerName: "Username", field: "username" },
    { headerName: "Email", field: "email" },
    {
      headerName: "Role",
      field: "role",
      valueGetter: (p) => p.data?.role ?? "-",
    },
    {
      headerName: "Status",
      field: "status",
      valueGetter: (p) => p.data?.status ?? "-",
    },
    {
      headerName: "Security Question",
      field: "security_question",
      valueGetter: (p) => p.data?.security_question ?? "-",
    },
    {
      headerName: "Security Answer",
      field: "security_answer",
      valueGetter: (p) => p.data?.security_answer ?? "-",
    },
    {
      headerName: "Password (hashed)",
      field: "password",
      valueGetter: (p) => {
        const h = p.data?.password;
        if (!h) return "-";
        // tampilkan 8 awal + … + 6 akhir biar ringkas
        return h.length > 20 ? `${h.slice(0, 8)}…${h.slice(-6)}` : h;
      },
    },
    {
      headerName: "Actions",
      cellRenderer: (params) => {
        const container = document.createElement("div");
        container.className = "flex items-center gap-2 h-full";

        const updateButton = document.createElement("button");
        updateButton.innerText = "Edit";
        updateButton.className =
          "px-3 py-1 rounded-lg bg-blue-500 text-white text-sm hover:bg-blue-600 transition";
        updateButton.addEventListener("click", () =>
          navigate(`/editusers/${params.data.id}`)
        );

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.className =
          "px-3 py-1 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600 transition";
        deleteButton.addEventListener("click", () =>
          confirmDeleteUser(params.data)
        );

        container.appendChild(updateButton);
        container.appendChild(deleteButton);
        return container;
      },
    },
  ];

  const defaultColDef = {
    flex: 1,
    minWidth: 150,
    sortable: true,
    filter: true,
    resizable: true,
  };

  return (
    <div class="min-h-screen">
      <Sidebar />
      <NavAdmin />

      <main class="ml-64 pt-22 p-6">
        <p class="text-[18px] font-bold mb-6 text-black">Users Management</p>

        {/* Toolbar: Search + Add User */}
        <div class="mb-4 flex items-center justify-between">
          <div class="relative w-full max-w-sm">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <BiSolidSearch size={20} class="text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm()}
              onInput={handleSearch}
              class="pl-10 pr-4 py-2 w-full border border-[#EDEDED] rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#EDEDED]"
            />
          </div>
          <button
            onClick={() => navigate("/addusers")}
            class="flex items-center gap-2 px-4 py-2 bg-[#264653] text-white rounded-lg hover:bg-[#1B323B] transition ml-4"
          >
            <BiSolidPlusCircle size={20} />
            <span class="hidden sm:inline">Add User</span>
          </button>
        </div>

        {/* Data Grid */}
        <div
          class="ag-theme-alpine rounded-xl shadow bg-white overflow-hidden"
          style={{ height: "500px", width: "100%" }}
        >
          {filteredData().length > 0 ? (
            <AgGridSolid
              columnDefs={columnDefs}
              rowData={filteredData()}
              defaultColDef={defaultColDef}
              rowHeight={40}
              headerHeight={48}
            />
          ) : (
            <p class="p-4 text-gray-500">No data available...</p>
          )}
        </div>
      </main>

      {/* Delete Confirmation Popup */}
      {showDeletePopup() && (
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div class="bg-white rounded-lg shadow-xl p-6 w-96">
            <div class="flex flex-col items-center text-center">
              <FiAlertCircle size={60} class="text-red-500 mb-3" />
              <h2 class="text-lg font-semibold text-gray-800 mb-2">
                Konfirmasi Hapus
              </h2>
              <p class="text-sm text-gray-600 mb-6">
                Apakah kamu yakin ingin menghapus user ini?
              </p>
              <div class="flex gap-4">
                <button
                  onClick={deleteUser}
                  class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Yes
                </button>
                <button
                  onClick={closePopup}
                  class="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

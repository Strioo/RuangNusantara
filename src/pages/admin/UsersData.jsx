import { createSignal, onMount, onCleanup } from "solid-js";
import { useNavigate } from "@solidjs/router";
import AgGridSolid from "solid-ag-grid";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Sidebar from "../../components/Sidebar";
import NavAdmin from "../../components/NavAdmin";
import { FiAlertCircle } from "solid-icons/fi";
import { BiSolidSearch } from "solid-icons/bi";
import { BiSolidPlusCircle } from "solid-icons/bi";

export default function UsersData() {
  const [rowData, setRowData] = createSignal([]);
  const [filteredData, setFilteredData] = createSignal([]);
  const [searchTerm, setSearchTerm] = createSignal("");
  const [showDeletePopup, setShowDeletePopup] = createSignal(false);
  const [userToDelete, setUserToDelete] = createSignal(null);
  const navigate = useNavigate();

  const handleStorageChange = () => loadUserData();

  onMount(() => {
    loadUserData();
    window.addEventListener("storage", handleStorageChange);
  });
  onCleanup(() => window.removeEventListener("storage", handleStorageChange));

  const loadUserData = () => {
    const savedData = localStorage.getItem("users");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setRowData(parsedData);
      setFilteredData(parsedData);
    }
  };

  const updateRowData = (newData) => {
    setRowData(newData);
    setFilteredData(newData);
    localStorage.setItem("users", JSON.stringify(newData));
    window.dispatchEvent(new Event("storage"));
  };

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

  const confirmDeleteUser = (user) => {
    setUserToDelete(user);
    setShowDeletePopup(true);
  };

  const deleteUser = () => {
    const userToDeleteValue = userToDelete();
    if (userToDeleteValue) {
      const updatedData = rowData().filter(
        (user) => user.email !== userToDeleteValue.email
      );
      updateRowData(updatedData);
      setShowDeletePopup(false);
    }
  };

  const closePopup = () => {
    setShowDeletePopup(false);
    setUserToDelete(null);
  };

  const columnDefs = [
    { headerName: "Username", field: "username" },
    { headerName: "Email", field: "email" },
    {
      headerName: "Password",
      field: "password",
      cellRenderer: (p) =>
        p.value ? "•".repeat(Math.min(String(p.value).length, 8)) : "",
    },
    {
      headerName: "Actions",
      cellRenderer: (params) => {
        const container = document.createElement("div");
        container.className = "flex items-center justify-start gap-2 h-full";

        const updateButton = document.createElement("button");
        updateButton.innerText = "Edit";
        updateButton.className =
          "px-3 py-1 rounded-lg bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition";
        updateButton.addEventListener("click", () =>
          navigate(`/editusers/${params.data.email}`)
        );

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.className =
          "px-3 py-1 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition";
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
          {/* Search Input */}
          <div class="relative w-full max-w-sm">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <BiSolidSearch size={20} class="text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              bind:value={searchTerm}
              onInput={handleSearch}
              class="pl-10 pr-4 py-2 w-full border border-[#EDEDED] rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#EDEDED]"
            />
          </div>
          {/* Add User Button */}
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
          style={{
            height: "500px",
            width: "100%",
            "--ag-border-color": "transparent",
            "--ag-row-border-color": "#EDEDED",
            "--ag-header-column-separator-color": "#EDEDED",
          }}
        >
          {filteredData().length > 0 ? (
            <AgGridSolid
              columnDefs={columnDefs}
              rowData={filteredData()}
              defaultColDef={defaultColDef}
              rowHeight={40} // baris lebih tinggi supaya tombol pas di tengah
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

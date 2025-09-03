// src/pages/admin/DashboardPage.jsx
import { createSignal, onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";
import AgGridSolid from "solid-ag-grid";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Sidebar from "../../components/Sidebar";
import NavAdmin from "../../components/NavAdmin";
import { FiAlertCircle } from "solid-icons/fi";

export default function DashboardPage() {
  const [rowData, setRowData] = createSignal([]);
  const [filteredData, setFilteredData] = createSignal([]);
  const [searchTerm, setSearchTerm] = createSignal("");
  const [showDeletePopup, setShowDeletePopup] = createSignal(false);
  const [userToDelete, setUserToDelete] = createSignal(null);
  const navigate = useNavigate();

  onMount(() => {
    loadUserData();
    window.addEventListener("storage", handleStorageChange);
  });

  const loadUserData = () => {
    const savedData = localStorage.getItem("users");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setRowData(parsedData);
      setFilteredData(parsedData);
    }
  };

  const handleStorageChange = () => loadUserData();

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
        container.classList.add("flex", "gap-2");

        const updateButton = document.createElement("button");
        updateButton.innerText = "Edit";
        updateButton.className =
          "px-3 py-1 rounded-lg bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition";
        updateButton.addEventListener("click", () =>
          navigate(`/editdata/${params.data.email}`)
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
    <div class="min-h-screen bg-[#fafafa]">
      <Sidebar />
      <NavAdmin />

      <main class="ml-64 pt-16 p-6">
        <h1 class="text-2xl font-bold mb-6 text-black">Dashboard</h1>

        {/* Search Bar */}
        <div class="mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm()}
            onInput={handleSearch}
            class="border border-[#EDEDED] rounded-lg px-4 py-2 w-full max-w-sm text-black placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#EDEDED]"
          />
        </div>

        {/* Data Grid */}
        <div
          class="ag-theme-alpine rounded-xl shadow bg-white border border-[#EDEDED] overflow-hidden"
          style={{ height: "500px", width: "100%" }}
        >
          {filteredData().length > 0 ? (
            <AgGridSolid
              columnDefs={columnDefs}
              rowData={filteredData()}
              defaultColDef={defaultColDef}
              domLayout="autoHeight"
            />
          ) : (
            <p class="p-4 text-gray-500">No data available...</p>
          )}
        </div>
      </main>

      {/* Delete Confirmation Popup */}
      {showDeletePopup() && (
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div class="bg-white rounded-lg shadow-lg p-6 w-80">
            <div class="flex flex-col items-center text-center">
              <FiAlertCircle size={60} class="text-red-500 mb-2" />
              <p class="mb-4">Are you sure you want to delete this user?</p>
              <div class="flex gap-4">
                <button
                  onClick={deleteUser}
                  class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Yes
                </button>
                <button
                  onClick={closePopup}
                  class="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition"
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

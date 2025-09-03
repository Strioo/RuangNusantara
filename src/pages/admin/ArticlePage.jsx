// src/pages/admin/ArticlePage.jsx
import { createSignal, onMount, createMemo } from "solid-js"; // ⬅️ tambahin createMemo
import { useNavigate } from "@solidjs/router";
import AgGridSolid from "solid-ag-grid";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Sidebar from "../../components/Sidebar";
import NavAdmin from "../../components/NavAdmin";
import { BiSolidSearch, BiSolidPlusCircle } from "solid-icons/bi";
import { FiAlertCircle } from "solid-icons/fi";

export default function ArticlePage() {
  const [articles, setArticles] = createSignal([]);
  const [filteredArticles, setFilteredArticles] = createSignal([]);
  const [searchTerm, setSearchTerm] = createSignal("");
  const [showDeletePopup, setShowDeletePopup] = createSignal(false);
  const [articleToDelete, setArticleToDelete] = createSignal(null);
  const navigate = useNavigate();

  onMount(() => {
    loadArticles();
    window.addEventListener("storage", loadArticles);
  });

  const loadArticles = () => {
    const saved = localStorage.getItem("articles");
    if (saved) {
      const parsed = JSON.parse(saved);
      setArticles(parsed);
      setFilteredArticles(parsed);
    }
  };

  const updateArticles = (newData) => {
    setArticles(newData);
    setFilteredArticles(newData);
    localStorage.setItem("articles", JSON.stringify(newData));
    window.dispatchEvent(new Event("storage"));
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term === "") {
      setFilteredArticles(articles());
    } else {
      const filtered = articles().filter((a) =>
        Object.values(a).some((val) =>
          String(val).toLowerCase().includes(term.toLowerCase())
        )
      );
      setFilteredArticles(filtered);
    }
  };

  const confirmDelete = (article) => {
    setArticleToDelete(article);
    setShowDeletePopup(true);
  };

  const deleteArticle = () => {
    const target = articleToDelete();
    if (target) {
      const updated = articles().filter((a) => a.id !== target.id);
      updateArticles(updated);
      setShowDeletePopup(false);
    }
  };

  const closePopup = () => {
    setShowDeletePopup(false);
    setArticleToDelete(null);
  };

  // 📊 Overview stats pakai createMemo
  const totalArticles = createMemo(() => articles().length);

  const publishedArticles = createMemo(
    () =>
      articles().filter((a) => (a.status || "").toLowerCase() === "published")
        .length
  );

  const draftArticles = createMemo(
    () =>
      articles().filter((a) => (a.status || "").toLowerCase() === "draft")
        .length
  );

  const totalViews = createMemo(() =>
    articles().reduce((acc, curr) => acc + (parseInt(curr.views) || 0), 0)
  );

  const columnDefs = [
    { headerName: "Title", field: "title" },
    { headerName: "Status", field: "status" },
    { headerName: "Views", field: "views" },
    {
      headerName: "Actions",
      cellRenderer: (params) => {
        const container = document.createElement("div");
        container.className = "flex items-center justify-start gap-2 h-full";

        const editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.className =
          "px-3 py-1 rounded-lg bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition";
        editBtn.addEventListener("click", () =>
          navigate(`/editarticle/${params.data.id}`)
        );

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
        deleteBtn.className =
          "px-3 py-1 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition";
        deleteBtn.addEventListener("click", () => confirmDelete(params.data));

        container.appendChild(editBtn);
        container.appendChild(deleteBtn);
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
        <p class="text-[18px] font-bold mb-6 text-black">Articles Management</p>

        {/* 🔹 Overview Cards */}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div class="bg-white shadow rounded-lg p-4 border border-[#EDEDED]">
            <p class="text-sm text-gray-500">Total Articles</p>
            <p class="text-2xl font-bold text-black">{totalArticles()}</p>
          </div>
          <div class="bg-white shadow rounded-lg p-4 border border-[#EDEDED]">
            <p class="text-sm text-gray-500">Published</p>
            <p class="text-2xl font-bold text-green-600">
              {publishedArticles()}
            </p>
          </div>
          <div class="bg-white shadow rounded-lg p-4 border border-[#EDEDED]">
            <p class="text-sm text-gray-500">Drafts</p>
            <p class="text-2xl font-bold text-yellow-600">{draftArticles()}</p>
          </div>
          <div class="bg-white shadow rounded-lg p-4 border border-[#EDEDED]">
            <p class="text-sm text-gray-500">Total Views</p>
            <p class="text-2xl font-bold text-blue-600">{totalViews()}</p>
          </div>
        </div>

        {/* Toolbar: Search + Add Article */}
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
            onClick={() => navigate("/addarticles")}
            class="flex items-center gap-2 px-4 py-2 bg-[#264653] text-white rounded-lg hover:bg-[#1B323B] transition ml-4"
          >
            <BiSolidPlusCircle size={20} />
            <span class="hidden sm:inline">Add Article</span>
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
          {filteredArticles().length > 0 ? (
            <AgGridSolid
              columnDefs={columnDefs}
              rowData={filteredArticles()}
              defaultColDef={defaultColDef}
              rowHeight={40}
              headerHeight={48}
            />
          ) : (
            <p class="p-4 text-gray-500">No articles available...</p>
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
                Confirm Delete
              </h2>
              <p class="text-sm text-gray-600 mb-6">
                Are you sure you want to delete this article?
              </p>

              <div class="flex gap-4">
                <button
                  onClick={deleteArticle}
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

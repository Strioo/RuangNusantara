// src/pages/admin/AddArticles.jsx
import { createSignal, onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";
import Sidebar from "../../components/Sidebar";
import NavAdmin from "../../components/NavAdmin";
import { FiCheckCircle } from "solid-icons/fi";
import Quill from "quill";
import "quill/dist/quill.snow.css";

export default function AddArticles() {
  const [title, setTitle] = createSignal("");
  const [category, setCategory] = createSignal("Seni & Musik");
  const [status, setStatus] = createSignal("draft");
  const [image, setImage] = createSignal("");
  const [content, setContent] = createSignal("");
  const [successOpen, setSuccessOpen] = createSignal(false);
  const [editor, setEditor] = createSignal(null);
  const navigate = useNavigate();

  onMount(() => {
    const quill = new Quill("#editor", {
      theme: "snow",
      placeholder: "Tulis artikel di sini...",
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ align: [] }],
          ["link", "blockquote", "code-block"],
          ["clean"],
        ],
      },
    });

    quill.on("text-change", () => setContent(quill.root.innerHTML));
    setEditor(quill);
  });

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const clearImage = () => setImage("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const html = editor()?.root?.innerHTML ?? content();

    const newArticle = {
      id: Date.now(),
      title: title().trim(),
      category: category(),
      status: status(),
      image: image(),
      content: html,
      views: 0,
    };

    const saved = localStorage.getItem("articles");
    const articles = saved ? JSON.parse(saved) : [];
    articles.push(newArticle);
    localStorage.setItem("articles", JSON.stringify(articles));

    setTitle("");
    setCategory("Seni & Musik");
    setStatus("draft");
    setImage("");
    setContent("");
    editor()?.setText("");

    setSuccessOpen(true);
  };

  const closeSuccess = () => {
    setSuccessOpen(false);
    navigate("/articlemanagement");
  };

  return (
    <div class="min-h-screen">
      <Sidebar />
      <NavAdmin />

      <style>{`
    #editor .ql-container {
      height: 520px !important;
      max-height: 520px !important;
      border-bottom-left-radius: 0.5rem;
      border-bottom-right-radius: 0.5rem;
    }
    #editor .ql-editor {
      height: 100% !important;      /* isi memenuhi container */
      overflow-y: auto !important;   /* konten panjang -> scroll */
      padding-bottom: 40px;
    }
    #editor .ql-toolbar {
      border-top-left-radius: 0.5rem;
      border-top-right-radius: 0.5rem;
    }
  `}</style>

      <main class="ml-64 pt-22 p-6">
        {/* Header + hint */}
        <div class="flex items-center justify-between mb-4">
          <h1 class="text-[22px] font-bold text-black">Add New Article</h1>
        </div>
        <p class="text-sm text-[#5B6B8A] mb-6">
          Lengkapi informasi artikel di bawah. Gunakan editor untuk memformat
          teks (bold, italic, list, dll).
        </p>

        <form onSubmit={handleSubmit} class="space-y-8">
          {/* Informasi Dasar */}
          <section>
            <h2 class="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3">
              Informasi Dasar
            </h2>
            <div class="space-y-4">
              <div>
                <label class="block mb-2 text-sm font-medium text-gray-700">
                  Judul Artikel
                </label>
                <input
                  type="text"
                  value={title()}
                  onInput={(e) => setTitle(e.target.value)}
                  placeholder="Masukkan judul artikel"
                  class="w-full border border-[#EDEDED] rounded-lg px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-[#264653]/30"
                  required
                />
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block mb-2 text-sm font-medium text-gray-700">
                    Kategori
                  </label>
                  <select
                    value={category()}
                    onChange={(e) => setCategory(e.target.value)}
                    class="w-full border border-[#EDEDED] rounded-lg px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-[#264653]/30"
                  >
                    <option value="Seni & Musik">Seni & Musik</option>
                    <option value="Pakaian Adat">Pakaian Adat</option>
                    <option value="Tarian Tradisional">
                      Tarian Tradisional
                    </option>
                  </select>
                </div>

                <div>
                  <label class="block mb-2 text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    value={status()}
                    onChange={(e) => setStatus(e.target.value)}
                    class="w-full border border-[#EDEDED] rounded-lg px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-[#264653]/30"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* Gambar */}
          <section>
            <h2 class="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3">
              Gambar
            </h2>
            <div class="space-y-3">
              <div class="flex flex-col md:flex-row gap-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  class="w-full text-sm text-gray-600 file:mr-3 file:px-3 file:py-2 file:border-0 file:rounded-md file:bg-[#264653] file:text-white hover:file:bg-[#1B323B] transition"
                />
                <input
                  type="url"
                  placeholder="atau masukkan link gambar"
                  value={image()}
                  onInput={(e) => setImage(e.target.value)}
                  class="w-full border border-[#EDEDED] rounded-lg px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-[#264653]/30"
                />
              </div>

              {image() && (
                <div class="mt-2">
                  <div class="flex items-center justify-between mb-2">
                    <p class="text-sm text-gray-600">Preview</p>
                    <button
                      type="button"
                      onClick={clearImage}
                      class="text-sm px-3 py-1 rounded-md bg-red-50 text-red-600 hover:bg-red-100"
                    >
                      Hapus Gambar
                    </button>
                  </div>
                  <img
                    src={image()}
                    alt="Preview"
                    class="w-full max-w-3xl aspect-video object-cover border rounded-lg"
                  />
                </div>
              )}
            </div>
          </section>

          {/* Konten */}
          <section>
            <h2 class="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3">
              Konten
            </h2>
            <div
              id="editor"
              class="bg-white text-black border border-[#EDEDED] rounded-b-lg"
            />
            <p class="text-xs text-gray-500 mt-1">
              Tip: gunakan toolbar untuk heading, list, dan format lainnya.
            </p>
          </section>

          {/* Actions */}
          <div class="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate("/articlemanagement")}
              class="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-5 py-2.5 bg-[#264653] text-white rounded-lg hover:bg-[#1B323B] transition"
            >
              Save
            </button>
          </div>
        </form>
      </main>

      {/* Popup Sukses */}
      {successOpen() && (
        <div class="fixed inset-0 z-[60] flex items-center justify-center bg-black/40">
          <div class="bg-white rounded-xl shadow-lg p-6 w-80 text-center">
            <FiCheckCircle size={56} class="text-green-500 mx-auto mb-3" />
            <p class="text-base font-semibold text-gray-800">
              Artikel berhasil ditambahkan!
            </p>
            <p class="text-sm text-gray-600 mb-5">
              Artikel baru telah disimpan.
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

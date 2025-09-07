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
  const [author, setAuthor] = createSignal("");
  const [date, setDate] = createSignal(""); // format yyyy-mm-dd
  const [category, setCategory] = createSignal("Seni & Musik");
  const [status, setStatus] = createSignal("draft");
  const [image, setImage] = createSignal(""); // hanya URL
  const [description, setDescription] = createSignal("");
  const [content, setContent] = createSignal("");
  const [conclusion, setConclusion] = createSignal("");
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

  const clearImage = () => setImage("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const html = editor()?.root?.innerHTML ?? content();

    const payload = {
      title: title().trim(),
      author: author().trim(),
      description: description().trim(),
      category: category(),
      status: status(), // "draft" | "published"
      image: image().trim() || null,
      content: html, // <-- ini yang penting ke BE
      conclusion: conclusion().trim() || null,
    };

    try {
      const res = await fetch("http://127.0.0.1:8080/articles/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Create failed: ${res.status} ${txt}`);
      }

      // reset form
      setTitle("");
      setAuthor("");
      setDate("");
      setCategory("Seni & Musik");
      setStatus("draft");
      setImage("");
      setDescription("");
      setContent("");
      setConclusion("");
      editor()?.setText("");

      setSuccessOpen(true);
    } catch (err) {
      console.error("Create article error:", err);
      alert("Gagal menyimpan artikel. Cek console/log BE.");
    }
  };

  const closeSuccess = () => {
    setSuccessOpen(false);
    navigate("/articlemanagement");
  };

  return (
    <div class="min-h-screen">
      <Sidebar />
      <NavAdmin />

      {/* FIXED HEIGHT untuk Quill */}
      <style>{`
        #editor .ql-container {
          height: 520px !important;
          max-height: 520px !important;
          border-bottom-left-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
        }
        #editor .ql-editor {
          height: 100% !important;
          overflow-y: auto !important;
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
              {/* Title */}
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

              {/* Author & Date */}
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block mb-2 text-sm font-medium text-gray-700">
                    Author
                  </label>
                  <input
                    type="text"
                    value={author()}
                    onInput={(e) => setAuthor(e.target.value)}
                    placeholder="Nama penulis"
                    class="w-full border border-[#EDEDED] rounded-lg px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-[#264653]/30"
                    required
                  />
                </div>
                <div>
                  <label class="block mb-2 text-sm font-medium text-gray-700">
                    Tanggal
                  </label>
                  <input
                    type="date"
                    value={date()}
                    onInput={(e) => setDate(e.target.value)}
                    class="w-full border border-[#EDEDED] rounded-lg px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-[#264653]/30"
                    required
                  />
                </div>
              </div>

              {/* Category & Status */}
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

          {/* Image (URL only) */}
          <section>
            <h2 class="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3">
              Gambar (Link)
            </h2>
            <div class="space-y-3">
              <input
                type="url"
                placeholder="Masukkan link (URL) gambar"
                value={image()}
                onInput={(e) => setImage(e.target.value)}
                class="w-full border border-[#EDEDED] rounded-lg px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-[#264653]/30"
              />
              {image() && (
                <div class="mt-1">
                  <div class="flex items-center justify-between mb-2">
                    <p class="text-sm text-gray-600">Preview</p>
                    <button
                      type="button"
                      onClick={clearImage}
                      class="text-sm px-3 py-1 rounded-md bg-red-50 text-red-600 hover:bg-red-100"
                    >
                      Hapus Link
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

          {/* Description */}
          <section>
            <h2 class="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3">
              Deskripsi Singkat
            </h2>
            <textarea
              value={description()}
              onInput={(e) => setDescription(e.target.value)}
              placeholder="Tulis ringkasan/abstrak artikel (opsional)"
              class="w-full border border-[#EDEDED] rounded-lg px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-[#264653]/30 min-h-[100px]"
            />
          </section>

          {/* Content (Quill) */}
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

          {/* Conclusion */}
          <section>
            <h2 class="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3">
              Kesimpulan
            </h2>
            <textarea
              value={conclusion()}
              onInput={(e) => setConclusion(e.target.value)}
              placeholder="Tulis kesimpulan (opsional)"
              class="w-full border border-[#EDEDED] rounded-lg px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-[#264653]/30 min-h-[100px]"
            />
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

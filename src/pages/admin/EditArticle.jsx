// src/pages/admin/EditArticle.jsx
import { createSignal, onMount, createEffect, onCleanup } from "solid-js";
import { useParams, useNavigate } from "@solidjs/router";
import Sidebar from "../../components/Sidebar";
import NavAdmin from "../../components/NavAdmin";
import { FiCheckCircle } from "solid-icons/fi";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const API = "http://127.0.0.1:8080";

export default function EditArticle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = createSignal(true);
  const [saving, setSaving] = createSignal(false);
  const [error, setError] = createSignal("");

  const [title, setTitle] = createSignal("");
  const [author, setAuthor] = createSignal("");
  const [date, setDate] = createSignal(""); // display only
  const [category, setCategory] = createSignal("Seni & Musik");
  const [status, setStatus] = createSignal("draft");
  const [image, setImage] = createSignal(""); // URL
  const [description, setDescription] = createSignal("");
  const [content, setContent] = createSignal(""); // HTML dari Quill
  const [conclusion, setConclusion] = createSignal("");
  const [views, setViews] = createSignal(0); // tidak dikirim saat update

  const [successOpen, setSuccessOpen] = createSignal(false);
  const [editor, setEditor] = createSignal(null);

  // DOM node untuk Quill (hindari querySelector by id)
  let editorHost;

  const initQuill = (initialHtml = "") => {
    if (!editorHost || editor()) return; // guard: node belum ada / sudah pernah init

    const q = new Quill(editorHost, {
      theme: "snow",
      placeholder: "Edit artikel di sini...",
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

    if (initialHtml) q.clipboard.dangerouslyPasteHTML(initialHtml);
    q.on("text-change", () => setContent(q.root.innerHTML));
    setEditor(q);
  };

  const loadArticle = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${API}/articles/data/${id}`);
      if (res.status === 404) {
        setError("Artikel tidak ditemukan.");
        return;
      }
      if (!res.ok) throw new Error(await res.text());

      const a = await res.json();
      setTitle(a.title || "");
      setAuthor(a.author || "");
      setDate(a.date ? String(a.date).slice(0, 10) : "");
      setCategory(a.category || "Seni & Musik");
      setStatus(a.status || "draft");
      setImage(a.image || "");
      setDescription(a.description || "");
      setConclusion(a.conclusion || "");
      setViews(a.views ?? 0);

      const initialHtml = a.content || "";
      setContent(initialHtml);
      // ❌ JANGAN init Quill di sini (DOM editor belum pasti ada)
    } catch (e) {
      console.error(e);
      setError("Gagal memuat artikel.");
    } finally {
      setLoading(false);
    }
  };

  onMount(loadArticle);

  // Inisialisasi Quill setelah:
  // (1) loading selesai (form + <div ref> sudah ter-render)
  // (2) kita punya content awal
  createEffect(() => {
    if (!loading() && editorHost && !editor()) {
      // Tunggu microtask supaya node benar-benar terpasang
      queueMicrotask(() => initQuill(content() || ""));
    }
  });

  // Bersihkan listener saat unmount / HMR ganti route
  onCleanup(() => {
    const q = editor();
    if (q) {
      q.off("text-change");
      setEditor(null);
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (saving()) return;

    const html = editor()?.root?.innerHTML ?? content();

    const payload = {
      title: title().trim(),
      author: author().trim(),
      description: description().trim(),
      category: category(),
      status: status(), // "draft" | "published"
      image: image().trim() || null, // kosong => NULL
      content: html || "",
      conclusion: conclusion().trim() || null,
    };

    try {
      setSaving(true);
      const res = await fetch(`${API}/articles/edit/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());
      setSuccessOpen(true);
    } catch (e) {
      console.error(e);
      alert("Gagal menyimpan perubahan.");
    } finally {
      setSaving(false);
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

      {/* CSS override Quill (tinggi fixed) */}
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
        <div class="flex items-center justify-between mb-4">
          <h1 class="text-[22px] font-bold text-black">Edit Article</h1>
        </div>

        {loading() ? (
          <p class="text-sm text-gray-600">Memuat artikel...</p>
        ) : error() ? (
          <p class="text-sm text-red-600">{error()}</p>
        ) : (
          <>
            <p class="text-sm text-[#5B6B8A] mb-6">
              Perbarui informasi artikel di bawah. Gunakan editor untuk
              memformat teks.
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

                  {/* Author & Date (date hanya display) */}
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
                        Tanggal (read-only)
                      </label>
                      <input
                        type="date"
                        value={date()}
                        disabled
                        class="w-full border border-[#EDEDED] rounded-lg px-3 py-2 text-black bg-gray-50"
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

              {/* Gambar (URL only) */}
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
                          onClick={() => setImage("")}
                          class="text-sm px-3 py-1 rounded-md bg-red-50 text-red-600 hover:bg-red-100"
                        >
                          Hapus Link
                        </button>
                      </div>
                      <img
                        src={image()}
                        alt="Preview"
                        class="w-full max-w-3xl aspect-video object-cover border rounded-lg"
                        onError={(e) =>
                          (e.currentTarget.style.display = "none")
                        }
                      />
                    </div>
                  )}
                </div>
              </section>

              {/* Konten (Quill) */}
              <section>
                <h2 class="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3">
                  Konten
                </h2>
                <div
                  id="editor"
                  ref={(el) => (editorHost = el)}
                  class="bg-white text-black rounded-b-lg overflow-hidden ring-1 ring-[#EDEDED]"
                />
                <p class="text-xs text-gray-500 mt-1">
                  Tip: gunakan toolbar untuk heading, list, dan format lainnya.
                </p>
              </section>

              {/* Deskripsi */}
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

              {/* Kesimpulan */}
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
                  disabled={saving()}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="px-5 py-2.5 bg-[#264653] text-white rounded-lg hover:bg-[#1B323B] transition disabled:opacity-60"
                  disabled={saving()}
                >
                  {saving() ? "Saving..." : "Update"}
                </button>
              </div>
            </form>
          </>
        )}
      </main>

      {/* Popup Sukses */}
      {successOpen() && (
        <div class="fixed inset-0 z-[60] flex items-center justify-center bg-black/40">
          <div class="bg-white rounded-xl shadow-lg p-6 w-80 text-center">
            <FiCheckCircle size={56} class="text-green-500 mx-auto mb-3" />
            <p class="text-base font-semibold text-gray-800">
              Artikel berhasil diperbarui!
            </p>
            <p class="text-sm text-gray-600 mb-5">
              Data artikel sudah diupdate.
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

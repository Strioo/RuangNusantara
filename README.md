# 🏛️ RuangNusantara

> Platform digital untuk melestarikan dan mengenalkan budaya tradisional Indonesia ke generasi modern

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Strioo/RuangNusantara)

## 🌟 Features

- 📚 **Artikel Budaya** - Koleksi artikel tentang seni, musik, pakaian adat, dan tarian tradisional
- 🎮 **Permainan Tradisional** - Panduan interaktif bermain permainan tradisional Indonesia
- 🎨 **Galeri Visual** - Dokumentasi visual budaya Nusantara
- ✨ **Animasi Smooth** - AOS animations untuk pengalaman pengguna yang menarik
- 🚀 **Performance Optimal** - Static data bundling untuk loading cepat
- 📱 **Responsive Design** - Perfect di semua device

## 🛠️ Tech Stack

- **Framework:** SolidJS
- **Build Tool:** Vite
- **Styling:** TailwindCSS + DaisyUI
- **Animations:** AOS (Animate On Scroll)
- **Routing:** @solidjs/router
- **Deployment:** Vercel

## 📦 Installation

```bash
# Clone repository
git clone https://github.com/Strioo/RuangNusantara.git

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run serve
```

## 🚀 Quick Deploy

Project ini sudah di-optimize untuk Vercel deployment!

### Deploy via Vercel (Recommended)

1. **Via Dashboard:**
   - Push ke GitHub
   - Import project di [vercel.com/new](https://vercel.com/new)
   - Click Deploy

2. **Via CLI:**
   ```bash
   npm i -g vercel
   vercel login
   vercel --prod
   ```

📖 **Detailed Guide:** See [QUICK_DEPLOY.md](QUICK_DEPLOY.md)

## 📂 Project Structure

```
src/
├── data/
│   ├── artikelData.js       # Article data (24 articles)
│   ├── permainanData.js     # Traditional games data (3 games)
│   └── staticData.js        # Helper functions
├── pages/
│   ├── Home.jsx
│   ├── Artikel.jsx
│   ├── Galery.jsx
│   ├── AboutPage.jsx
│   └── category/
│       ├── All.jsx
│       ├── SeniMusik.jsx
│       ├── PakaianAdat.jsx
│       └── TarianTradisional.jsx
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── CardArtikel.jsx
│   └── ...
└── assets/
    └── images/              # 📁 Organized structure (see below)
        ├── icons/           # UI icons & SVG elements
        ├── backgrounds/     # Hero section backgrounds
        ├── categories/      # Category thumbnails
        ├── articles/        # Article cover images
        ├── auth/            # Authentication page images
        ├── gallery/         # Gallery images
        ├── games/           # Traditional games images
        ├── about/           # About page icons
        ├── home/            # Home page images
        └── branding/        # Brand assets (reserved)
```

### 📸 Assets Structure

Project ini menggunakan struktur folder assets yang **terorganisir dan mudah di-maintain**:

- **10 kategorisasi folder** berdasarkan fungsi
- **90+ files** organized systematically
- **Clear naming conventions** untuk easy navigation
- **Optimized for bundling** dan tree-shaking

📖 **Full Documentation:**
- [ASSETS_STRUCTURE.md](ASSETS_STRUCTURE.md) - Complete guide dengan best practices
- [ASSETS_QUICK_REFERENCE.md](ASSETS_QUICK_REFERENCE.md) - Quick reference untuk daily usage

## 🎯 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run serve` | Preview production build |

## 🔧 Configuration

- **Vercel:** `vercel.json`
- **Vite:** `vite.config.js`
- **Tailwind:** `tailwind.config.js`
- **Git:** `.gitignore`, `.vercelignore`

## 📚 Documentation

- 📖 [Deployment Guide](DEPLOYMENT.md) - Complete deployment instructions
- 🚀 [Quick Deploy](QUICK_DEPLOY.md) - Quick start guide
- ✅ [Vercel Ready](VERCEL_READY.md) - Production readiness checklist

## 🎨 Features Implemented

### Data Management
- ✅ Static data in JavaScript modules
- ✅ Tree-shaking enabled
- ✅ Optimized bundle size

### UI/UX
- ✅ Smooth scroll animations (AOS)
- ✅ Responsive design
- ✅ Fast page transitions
- ✅ Clean and modern interface

### Performance
- ✅ Code splitting
- ✅ Lazy loading
- ✅ Asset optimization
- ✅ Cache headers configured

## 🌍 Categories

1. **Seni & Musik** - Traditional music and instruments
2. **Pakaian Adat** - Traditional clothing and textiles
3. **Tarian Tradisional** - Traditional dances
4. **Permainan Tradisional** - Traditional games

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for learning and development.

## 🙏 Acknowledgments

- Indonesian cultural heritage
- SolidJS community
- Vercel for hosting

---

**Made with ❤️ for Indonesian Cultural Heritage**

🔗 [Live Demo](https://ruang-nusantara.vercel.app) | 📧 [Contact](mailto:your-email@example.com)

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "./AboutPage.css";

export default function About() {
  return (
    <div class="about-page-wrapper">
      {/* Hero Section */}
      <section class="about-hero-section">
        <Navbar />
        <div class="about-hero-content">
          <h1 class="about-hero-title">
            Menghubungkan
            <br />
            Tradisi dengan Generasi
          </h1>
          <p class="about-hero-description">
            Kami percaya bahwa budaya memiliki kekuatan untuk mempersatukan
            kita. Platform ini dirancang untuk menjadi jembatan yang
            menghubungkan warisan budaya kaya Indonesia dengan cara modern yang
            dapat diakses dan dinikmati oleh semua orang, terutama generasi
            muda.
          </p>
        </div>
      </section>

      {/* Vision Section */}
      <section class="about-vision-section">
        {/* Left Card */}
        <div class="about-vision-card-left">
          <h2 class="about-vision-title">Visi</h2>
          <p class="about-vision-text">
            Temukan kekayaan seni, musik, pakaian adat, hingga kuliner Nusantara
            dalam satu platform digital yang interaktif dan edukatif.
          </p>
        </div>

        {/* Right Card */}
        <div class="about-vision-card-right">
          <h2 class="about-vision-title">Misi</h2>
          <div class="about-vision-features">
            <div class="about-feature-item">
              <div class="about-feature-icon">
                <img src="/src/assets/images/EarthIcon_AboutPage.svg" alt="" />
              </div>
              <p class="about-feature-title">Akses Mudah</p>
              <p class="about-feature-text">
                Membawa budaya lebih dekat, agar semua orang bisa menikmatinya
                tanpa batasan ruang dan waktu.
              </p>
            </div>

            <div class="about-feature-item">
              <div class="about-feature-icon">
                <img src="/src/assets/images/BookIcon_AboutPage.svg" alt="" />
              </div>
              <p class="about-feature-title">Belajar Interaktif</p>
              <p class="about-feature-text">
                Menyediakan pengalaman belajar yang seru, interaktif, dan penuh
                makna.
              </p>
            </div>

            <div class="about-feature-item">
              <div class="about-feature-icon">
                <img src="/src/assets/images/LampIcon_AboutPage.svg" alt="" />
              </div>
              <p class="about-feature-title">Tradisi x Teknologi</p>
              <p class="about-feature-text">
                Menggabungkan tradisi dengan inovasi, agar budaya terus hidup
                dan berkembang.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section class="about-story-section">
        <div class="about-story-image">
          <h2 class="about-story-title">Cerita Kami</h2>
          <img
            src="/src/assets/images/OurStory_AboutPage.svg"
            alt="Traditional Craft"
          />
        </div>

        <div class="about-story-content">
          <p class="about-story-text">
            Kami hadir karena percaya bahwa budaya bukan sekadar peninggalan,
            tapi bagian penting dari identitas dan masa depan kita. Dari alat
            musik yang bercerita, pakaian adat penuh makna, hingga kuliner yang
            menyatukan, setiap tradisi layak untuk terus hidup. Melalui platform
            ini, kami ingin menghadirkan cara baru untuk mengenal, merasakan,
            dan melestarikan budaya Nusantara— agar generasi kini dan nanti bisa
            tetap bangga dengan warisan kita bersama.
          </p>
        </div>
      </section>

      {/* What We Do Section */}
      <section class="about-what-we-do-section">
        <span class="about-section-badge">
          Budaya Lebih Dekat Dan Sederhana
        </span>

        <div class="about-section-header">
          <h1 class="about-section-title">
            Apa yang Kami
            <br />
            Lakukan
          </h1>
          <p class="about-section-description">
            Kami menghubungkan tradisi dengan teknologi, menciptakan pengalaman
            interaktif dan membangkitkan kecintaan kepada budaya di seluruh
            Nusantara.
          </p>
        </div>

        <div class="about-action-cards">
          <div class="about-action-card">
            <div class="about-action-icon">
              <img
                src="src/assets/images/PaletteIcon_AboutPage.svg"
                alt="Interaktif"
              />
            </div>
            <p class="about-action-title">Interaktif</p>
            <p class="about-action-text">
              Menyediakan tools, fitur, hingga konten interaktif dengan
              pengalaman digital yang mempesona.
            </p>
          </div>

          <div class="about-action-card">
            <div class="about-action-icon">
              <img
                src="src/assets/images/LaptopIcon_AboutPage.svg"
                alt="Interaktif"
              />
            </div>
            <p class="about-action-title">Digitalisasi</p>
            <p class="about-action-text">
              Mengarsip dan melestarikan warisan budaya agar tetap hidup dan
              relevan dengan zaman.
            </p>
          </div>

          <div class="about-action-card">
            <div class="about-action-icon">
              <img
                src="src/assets/images/HandsIcon_AboutPage.svg"
                alt="Interaktif"
              />
            </div>
            <p class="about-action-title">Relevansi Modern</p>
            <p class="about-action-text">
              Menyajikan budaya dalam konteks yang dapat dimengerti oleh zaman
              budaya dan mencintainya.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section class="about-cta-section">
        <div class="about-cta-overlay"></div>
        <div class="about-cta-content">
          <div class="about-cta-left">
            <span class="about-cta-badge">Warisan Jadi Inspirasi</span>
            <div class="about-cta-row">
              <h1 class="about-cta-title">
                Mari Jadi Bagian dari Perjalanan Ini
              </h1>
            </div>
          </div>
          <div class="about-cta-right">
            <p class="about-cta-description">
              Setiap langkah kecilmu berarti besar bagi masa depan budaya
              Nusantara. Bersama, kita bisa menjaga dan meneruskan warisan ini
              agar tetap hidup untuk generasi mendatang.
            </p>
            <button class="about-cta-button">Mulai Eksplorasi</button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

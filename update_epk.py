import re

with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

# 1. Vermin font import & application
html = re.sub(
    r'<link href="https://fonts.googleapis.com/css2\?family=Space\+Grotesk[^"]+" rel="stylesheet" />',
    r'<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />\n  <link href="https://fonts.cdnfonts.com/css/vermin-vibes" rel="stylesheet" />',
    html
)

html = re.sub(r"\.t-hero\s*{([^}]+)}", r".t-hero {\1\n      font-family: 'Vermin Vibes', var(--ff-title);}", html)
html = re.sub(r"\.t-section\s*{([^}]+)}", r".t-section {\1\n      font-family: 'Vermin Vibes', var(--ff-title);}", html)

html = html.replace(".contact-headline {\n      font-family: var(--ff-title);", ".contact-headline {\n      font-family: 'Vermin Vibes', var(--ff-title);")


# 2. Header and Navegation (Logo size & name changes)
html = html.replace("--nav-h: 52px;", "--nav-h: 64px;")
# Change the img inline style in nav-logo.
html = re.sub(
    r'<div class="nav-logo"><img src="logo jansound\.png" alt="JANSØUND" style="height:28px;width:auto;filter:brightness\(1\);" /></div>',
    r'<div class="nav-logo" style="display:flex; align-items:center;"><img src="logo jansound.png" alt="JANSØUND" class="header-logo" /></div>',
    html
)

css_append = """
    /* Additional Styles */
    .header-logo {
      height: 48px;
      width: auto;
      filter: brightness(1);
      transition: height 0.3s ease;
    }
    @media (max-width: 768px) {
      .header-logo {
        height: 28px;
      }
    }
"""
html = html.replace("    /* ── GRAIN OVERLAY ── */", css_append + "\n    /* ── GRAIN OVERLAY ── */")

html = html.replace("DA AGENCY", "DIVERGENTE AGENCY")
html = html.replace("DA BOOKING AGENCY", "DIVERGENTE AGENCY")
html = html.replace("DA Booking Agency", "Divergente Agency")
html = html.replace("DA BOOKING", "DIVERGENTE AGENCY")


# 3. Hero layout
html = html.replace("""    #hero {
      display: grid;
      grid-template-rows: 1fr auto;
      background: var(--black);
    }""", """    #hero {
      display: flex;
      flex-direction: column;
      background: var(--black);
      height: 100vh;
      min-height: 0;
      padding-top: var(--nav-h);
      box-sizing: border-box;
    }""")

html = html.replace("""    .hero-inner {
      display: grid;
      grid-template-columns: 5fr 7fr;
      min-height: calc(100vh - var(--nav-h));
    }""", """    .hero-inner {
      display: grid;
      grid-template-columns: 5fr 7fr;
      flex: 1;
      min-height: 0;
    }""")

html = html.replace("""    .hero-title-col {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 60px 60px 60px 64px;
      position: relative;
    }""", """    .hero-title-col {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 60px 20px;
      position: relative;
    }
    .hero-eyebrow { justify-content: center; }""")

html = html.replace("""    .hero-slash {
      display: block;
      width: 48px;
      height: 2px;
      background: var(--white);
      margin-bottom: 20px;
    }""", """    .hero-slash {
      display: block;
      width: 48px;
      height: 2px;
      background: var(--white);
      margin: 0 auto 20px auto;
    }""")

# 4. Bio
html = html.replace("""      .bio-col {
      padding: 48px 44px;""", """      .bio-col {
      padding: 32px 28px;""")

html = html.replace("""        <div class="bio-stat">
          <div class="stat-num">INT'L</div>
          <div class="stat-label">B2B con referentes internacionales</div>
        </div>""", "")
        
html = html.replace("""    .bio-stats {
      border-top: var(--border);
      grid-column: 2 / 4;
      grid-row: 3;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
    }""", """    .bio-stats {
      border-top: var(--border);
      grid-column: 2 / 4;
      grid-row: 3;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }""")


html = html.replace('src="bio.png"\n          alt="JANSØUND performing"', 'src="fotos estudio 2.jpeg"\n          alt="JANSØUND performing"')

# 5. Sounds & Gallery

# Remove music-tracks entirely using strict subset
start_tracks = html.find('<div class="music-tracks">')
end_tracks = html.find('<!-- EMBEDDED SOUNDCLOUD -->')
html = html[:start_tracks] + html[end_tracks:]

# Replace Gallery Grid
old_gall = """    <div class="gallery-grid">
      <div class="gallery-item gi-1">
        <img class="gallery-img" src="IMG_6822.JPEG" alt="DJ performance" />
        <div class="gallery-item-overlay"></div>
      </div>
      <div class="gallery-item gi-2">
        <img class="gallery-img" src="IMG_7119.JPEG" alt="DJ portrait" />
        <div class="gallery-item-overlay"></div>
      </div>
      <div class="gallery-item gi-3">
        <video class="gallery-img" src="IMG_7057.MP4" autoplay loop muted playsinline aria-label="Live performance video"></video>
        <div class="gallery-item-overlay"></div>
      </div>
    </div>"""

new_gall = """    <div class="gallery-grid">
      <a href="https://drive.google.com/drive/folders/1MMNWnUKkcGbImRE58tBVL74JaX2gKcGs" target="_blank" class="gallery-item gi-1">
        <img class="gallery-img" src="fotos estudio.jpeg" alt="Fotos Studio" />
        <div class="gallery-item-overlay">
          <div class="gallery-item-title t-section">FOTOS STUDIO</div>
        </div>
      </a>
      <a href="https://drive.google.com/drive/folders/1MIA0yE_-IvbCh6p2kpzCDFm9_5j-zG8S" target="_blank" class="gallery-item gi-2">
        <img class="gallery-img" src="IMG_7119.JPEG" alt="Fotos Gigs" />
        <div class="gallery-item-overlay">
          <div class="gallery-item-title t-section">FOTOS GIGS</div>
        </div>
      </a>
      <a href="https://drive.google.com/drive/folders/1mzaKWy9LCsxWgZtZ67pmJ1jbvf9tWQbF" target="_blank" class="gallery-item gi-3">
        <video class="gallery-img" src="IMG_7057.mp4" autoplay loop muted playsinline aria-label="Videos Gigs"></video>
        <div class="gallery-item-overlay">
          <div class="gallery-item-title t-section">VIDEOS GIGS</div>
        </div>
      </a>
    </div>"""
html = html.replace(old_gall, new_gall)

html = html.replace("""    .gallery-item-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%);
      opacity: 0;
      transition: opacity 0.3s;
    }""", """    .gallery-item-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%);
      opacity: 0;
      transition: opacity 0.3s;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .gallery-item-title {
      font-size: 2rem;
      letter-spacing: 0.1em;
      transform: translateY(20px);
      transition: transform 0.3s;
      text-align: center;
      color: var(--white);
    }
    .gallery-item:hover .gallery-item-title {
      transform: translateY(0);
    }""")

# Assets - add press block

press_tab = """        <button class="assets-tab" id="tab-hosp" onclick="switchTab('hosp')">
          ♥ HOSPITALITY
        </button>
        <button class="assets-tab" id="tab-press" onclick="switchTab('press')">
          ▤ PRESS ASSETS
        </button>"""
html = html.replace("""        <button class="assets-tab" id="tab-hosp" onclick="switchTab('hosp')">
          ♥ HOSPITALITY
        </button>""", press_tab)

press_panel = """    <!-- PRESS ASSETS PANEL -->
    <div class="assets-panel" id="panel-press">
      <div class="rider-layout">
        <div class="rider-col">
          <div class="rider-col-title">DOWNLOADABLE ASSETS</div>
          <div class="contact-links" style="margin-top:0;">
            <a href="https://drive.google.com/drive/folders/15WPQhIwZA5hgMNSKyIwvkeh1G5jA7u2T" target="_blank" class="contact-link-row" style="text-decoration:none;">
              <div>
                <div class="contact-link-label">AGENCIA</div>
                <div class="contact-link-val">LOGOS DIVERGENTE AGENCY</div>
              </div>
              <span class="contact-link-arrow">→</span>
            </a>
            <a href="https://drive.google.com/drive/folders/1359Krhye9fPn7pMttw2LFgnoZTzile3E" target="_blank" class="contact-link-row" style="text-decoration:none;">
              <div>
                <div class="contact-link-label">BRANDING</div>
                <div class="contact-link-val">LOGOS JANSØUND</div>
              </div>
              <span class="contact-link-arrow">→</span>
            </a>
          </div>
        </div>
        <div class="rider-col">
          <div class="rider-col-title">STYLE GUIDE</div>
          <div class="t-label" style="margin-bottom: 8px;">TYPOGRAPHY</div>
          <div class="t-section" style="font-size: 1.5rem; margin-bottom: 24px;">VERMIN VIBES</div>
          <div class="t-label" style="margin-bottom: 8px;">COLOR PALETTE</div>
          <div style="display: flex; gap: 12px;">
            <div style="width: 40px; height: 40px; background: #000; border: 1px solid #333;"></div>
            <div style="width: 40px; height: 40px; background: #fff; border: 1px solid #ddd;"></div>
            <div style="width: 40px; height: 40px; background: #555;"></div>
          </div>
        </div>
      </div>
    </div>
  </section>"""
html = html.replace("  </section>\n\n  <!-- ════════════════════════════════════════\n       SECTION 06 — CONTACT", press_panel + "\n\n  <!-- ════════════════════════════════════════\n       SECTION 06 — CONTACT")

html = html.replace("['rider','venues','hosp'].forEach(t => {", "['rider','venues','hosp','press'].forEach(t => {")


# 6. Logistics
html = html.replace("WHISKY BOTTLE", "JÄGERMEISTER")
old_hosp_col = """        <div class="hosp-col">
          <div class="hosp-title">NOTAS ADICIONALES</div>
          <p style="color:var(--grey-20);font-size:0.9rem;line-height:1.8;margin-top:8px;">
            Todos los requerimientos deben estar disponibles en el camarín <strong style="color:var(--white);">30 minutos antes</strong> del set.
            Para consultas adicionales de rider, contactar directamente con
            <strong style="color:var(--white);">Divergente Agency</strong>.
          </p>
        </div>"""
html = html.replace(old_hosp_col, "")
html = html.replace("""    .hospitality-layout {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }""", """    .hospitality-layout {
      display: grid;
      grid-template-columns: 1fr;
    }""")

old_venues = """            <div class="venue-row">
              <div class="venue-name">CROBAR</div>
              <div class="venue-city">BUENOS AIRES</div>
              <div class="venue-badge">TECHNO</div>
            </div>
            <div class="venue-row">
              <div class="venue-name">ELEMENTS</div>
              <div class="venue-city">BUENOS AIRES</div>
              <div class="venue-badge">MELODIC</div>
            </div>
            <div class="venue-row">
              <div class="venue-name">FUTURA</div>
              <div class="venue-city">BUENOS AIRES</div>
              <div class="venue-badge">TECHNO</div>
            </div>
            <div class="venue-row">
              <div class="venue-name">LIGNÉE</div>
              <div class="venue-city">BUENOS AIRES</div>
              <div class="venue-badge">UNDERGROUND</div>
            </div>
            <div class="venue-row">
              <div class="venue-name">LA BIBLIOTECA</div>
              <div class="venue-city">BUENOS AIRES</div>
              <div class="venue-badge">INDIE</div>
            </div>"""

new_venues = """            <a href="https://www.instagram.com/crobarstudio/" target="_blank" class="venue-row" style="text-decoration:none;">
              <div class="venue-name">CROBAR</div>
              <div class="venue-badge">TECHNO</div>
            </a>
            <a href="https://www.instagram.com/elementsba/" target="_blank" class="venue-row" style="text-decoration:none;">
              <div class="venue-name">ELEMENTS</div>
              <div class="venue-badge">MELODIC</div>
            </a>
            <a href="https://www.instagram.com/futuraboilerclub/" target="_blank" class="venue-row" style="text-decoration:none;">
              <div class="venue-name">FUTURA</div>
              <div class="venue-badge">TECHNO</div>
            </a>
            <a href="https://www.instagram.com/lignee.ba/" target="_blank" class="venue-row" style="text-decoration:none;">
              <div class="venue-name">LIGNÉE</div>
              <div class="venue-badge">UNDERGROUND</div>
            </a>
            <a href="https://www.instagram.com/labiblioteca.ba/" target="_blank" class="venue-row" style="text-decoration:none;">
              <div class="venue-name">LA BIBLIOTECA</div>
              <div class="venue-badge">INDIE</div>
            </a>"""
html = html.replace(old_venues, new_venues)
html = html.replace("""    .venue-row {
      display: flex;
      align-items: center;
      gap: 20px;
      padding: 20px 0;
      border-bottom: var(--border);
    }""", """    .venue-row {
      display: flex;
      align-items: center;
      gap: 20px;
      padding: 20px 0;
      border-bottom: var(--border);
      transition: background 0.2s;
    }
    a.venue-row:hover { background: rgba(255,255,255,0.03); }""")

# 7. Contact
old_links = """        <div class="contact-links">
          <div class="contact-link-row">
            <div>
              <div class="contact-link-label">BOOKING AGENCY</div>
              <div class="contact-link-val">DIVERGENTE AGENCY</div>
            </div>
            <span class="contact-link-arrow">→</span>
          </div>
          <div class="contact-link-row">
            <div>
              <div class="contact-link-label">SOUNDCLOUD</div>
              <div class="contact-link-val">SOUNDCLOUD.COM/JANSOUND-DJ</div>
            </div>
            <span class="contact-link-arrow">→</span>
          </div>
          <div class="contact-link-row">
            <div>
              <div class="contact-link-label">INSTAGRAM</div>
              <div class="contact-link-val">@JANSOUND.ARG</div>
            </div>
            <span class="contact-link-arrow">→</span>
          </div>
        </div>"""
new_links = """        <div class="contact-links">
          <a href="https://www.instagram.com/divergente.agency/" target="_blank" class="contact-link-row" style="text-decoration:none;">
            <div>
              <div class="contact-link-label">BOOKING AGENCY</div>
              <div class="contact-link-val">DIVERGENTE AGENCY</div>
            </div>
            <span class="contact-link-arrow">→</span>
          </a>
          <a href="https://soundcloud.com/jansoundarg" target="_blank" class="contact-link-row" style="text-decoration:none;">
            <div>
              <div class="contact-link-label">SOUNDCLOUD</div>
              <div class="contact-link-val">SOUNDCLOUD.COM/JANSOUNDARG</div>
            </div>
            <span class="contact-link-arrow">→</span>
          </a>
          <a href="https://www.instagram.com/jansound__/" target="_blank" class="contact-link-row" style="text-decoration:none;">
            <div>
              <div class="contact-link-label">INSTAGRAM</div>
              <div class="contact-link-val">@JANSOUND__</div>
            </div>
            <span class="contact-link-arrow">→</span>
          </a>
        </div>"""
html = html.replace(old_links, new_links)

old_cards = """          <div class="social-grid">
            <div class="social-card">
              <div class="social-platform">SOUNDCLOUD</div>
              <div class="social-handle">JANSOUND-DJ</div>
            </div>
            <div class="social-card">
              <div class="social-platform">INSTAGRAM</div>
              <div class="social-handle">@JANSOUND.ARG</div>
            </div>
            <div class="social-card">
              <div class="social-platform">RESIDENT ADVISOR</div>
              <div class="social-handle">JANSØUND</div>
            </div>
            <div class="social-card">
              <div class="social-platform">DIVERGENTE AGENCY</div>
              <div class="social-handle">REPRESENTED</div>
            </div>
          </div>"""
new_cards = """          <div class="social-grid">
            <a href="https://soundcloud.com/jansoundarg" target="_blank" class="social-card" style="text-decoration:none;">
              <div class="social-platform">SOUNDCLOUD</div>
              <div class="social-handle">JANSOUNDARG</div>
            </a>
            <a href="https://www.instagram.com/jansound__/" target="_blank" class="social-card" style="text-decoration:none;">
              <div class="social-platform">INSTAGRAM</div>
              <div class="social-handle">@JANSOUND__</div>
            </a>
            <a href="#" target="_blank" class="social-card" style="text-decoration:none;">
              <div class="social-platform">RESIDENT ADVISOR</div>
              <div class="social-handle">JANSØUND</div>
            </a>
            <a href="https://www.instagram.com/divergente.agency/" target="_blank" class="social-card" style="text-decoration:none;">
              <div class="social-platform">DIVERGENTE AGENCY</div>
              <div class="social-handle">REPRESENTED</div>
            </a>
          </div>"""
html = html.replace(old_cards, new_cards)

# Fix mobile sizing:
html = html.replace("""      .hero-inner { grid-template-columns: 1fr; }
      .hero-photo-col { min-height: 60vw; border-right: none; border-bottom: var(--border); }""",
      """      .hero-inner { display: flex; flex-direction: column; }
      .hero-photo-col { flex: 1; min-height: 40vh; border-right: none; border-bottom: var(--border); }
      .hero-title-col { flex: unset; }""")

# Finally write out
with open("index.html", "w", encoding="utf-8") as f:
    f.write(html)
print("Updated successfully")

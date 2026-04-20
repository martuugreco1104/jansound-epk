const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf-8');

// ---------------------------------------------------------
// 1. Google Translate Widget
// ---------------------------------------------------------

// Inject the structure in the nav bar. We'll replace the .nav-epk-badge wrapper.
let newNavEnd = `<div class="nav-utils" style="display:flex; align-items:center; gap: 16px;">
      <div id="google_translate_element"></div>
      <div class="nav-epk-badge">
        <div class="epk-pill">EPK 2026</div>
      </div>
    </div>
  </nav>`;

html = html.replace(/<div class="nav-epk-badge">[\s\S]*?<\/div>[\s\S]*?<\/nav>/, newNavEnd);

// Add the translate CSS before </head>
let translateCSS = `
    /* TRANSLATE WIDGET STYLES */
    #google_translate_element select {
      background: var(--black) !important;
      color: var(--white) !important;
      font-family: var(--ff-title) !important;
      border: var(--border) !important;
      padding: 4px 8px;
      font-size: 0.6rem;
      text-transform: uppercase;
      outline: none;
      cursor: pointer;
    }
    .goog-te-gadget { color: transparent !important; font-size: 0; }
    .goog-te-gadget .goog-te-combo { margin: 0; }
    .goog-logo-link { display: none !important; }
    .goog-te-banner-frame { display: none !important; }
    body { top: 0 !important; }
    
    @media (max-width: 768px) {
      .nav-links {
        display: flex;
        overflow-x: auto;
        white-space: nowrap;
        padding-bottom: 4px;
        scrollbar-width: thin; /* Firefox */
      }
      .nav-links::-webkit-scrollbar { height: 2px; }
      .nav-links::-webkit-scrollbar-thumb { background: var(--grey-40); }
    }
  </head>`;

html = html.replace('</head>', translateCSS);

// Add translate script before </body>
let translateScript = `
  <!-- Google Translate -->
  <script type="text/javascript">
    function googleTranslateElementInit() {
      new google.translate.TranslateElement({pageLanguage: 'es', includedLanguages: 'en,es,pt,fr,de,it'}, 'google_translate_element');
    }
  </script>
  <script type="text/javascript" src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
</body>`;
html = html.replace('</body>', translateScript);


// ---------------------------------------------------------
// 2. Navigation & UI (Assets Pills)
// ---------------------------------------------------------

let oldTabsCSS = `    /* sub navigation tabs */
    .assets-tabs {
      display: flex;
      gap: 0;
      border: var(--border);
    }
    .assets-tab {
      padding: 10px 22px;
      font-family: var(--ff-title);
      font-size: 0.58rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--grey-40);
      border-right: var(--border);
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .assets-tab:last-child { border-right: none; }
    .assets-tab:hover { color: var(--white); background: rgba(255,255,255,0.04); }
    .assets-tab.active { color: var(--white); background: rgba(255,255,255,0.07); }`;

let newTabsCSS = `    /* sub navigation tabs */
    .assets-tabs {
      display: flex;
      flex-wrap: nowrap;
      overflow-x: auto;
      gap: 12px;
      padding-bottom: 8px;
      scrollbar-width: thin;
    }
    .assets-tabs::-webkit-scrollbar { height: 2px; }
    .assets-tabs::-webkit-scrollbar-thumb { background: var(--grey-40); }
    .assets-tab {
      flex: 0 0 auto;
      padding: 10px 22px;
      font-family: var(--ff-title);
      font-size: 0.58rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--grey-40);
      border: 1px solid var(--white);
      border-radius: 999px;
      background: transparent;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .assets-tab:hover { color: var(--white); background: rgba(255,255,255,0.1); }
    .assets-tab.active { background: var(--white); color: var(--black); }`;

html = html.replace(oldTabsCSS, newTabsCSS);

// ---------------------------------------------------------
// 3. Content and Socials
// ---------------------------------------------------------

// Add YouTube and remove RA
let socialGridRA = `<a href="https://ra.co/dj/jansound" target="_blank" class="social-card" style="text-decoration:none;">
              <div class="social-platform">RESIDENT ADVISOR</div>
              <div class="social-handle">JANSØUND</div>
            </a>`;
let socialGridYT = `<a href="https://www.youtube.com/@jansoundmusicar" target="_blank" class="social-card" style="text-decoration:none;">
              <div class="social-platform">YOUTUBE</div>
              <div class="social-handle">@JANSOUNDMUSICAR</div>
            </a>`;
html = html.replace(socialGridRA, socialGridYT);

// Update Contact Section (Pending Email and Phone)
let oldContactLinks = `<div class="contact-links">
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
        </div>`;

let newContactLinks = `<div class="contact-links">
          <a href="https://www.instagram.com/divergente.agency/" target="_blank" class="contact-link-row" style="text-decoration:none;">
            <div>
              <div class="contact-link-label">BOOKING AGENCY</div>
              <div class="contact-link-val">DIVERGENTE AGENCY</div>
            </div>
            <span class="contact-link-arrow">→</span>
          </a>
          <div class="contact-link-row" style="text-decoration:none; cursor:default;">
            <div>
              <div class="contact-link-label">CORREO DIVERGENTE AGENCY</div>
              <div class="contact-link-val">PENDIENTE</div>
            </div>
          </div>
          <div class="contact-link-row" style="text-decoration:none; cursor:default;">
            <div>
              <div class="contact-link-label">TELÉFONO DIVERGENTE AGENCY</div>
              <div class="contact-link-val">PENDIENTE</div>
            </div>
          </div>
        </div>`;
html = html.replace(oldContactLinks, newContactLinks);

// ---------------------------------------------------------
// 4. Removing Hero section horizontal slash 
// ---------------------------------------------------------
html = html.replace('<span class="hero-slash"></span>', '');


fs.writeFileSync('index.html', html, 'utf-8');
console.log('Update Complete!');

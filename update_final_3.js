const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf-8');

// 1. Fix the CSS leak by removing it from outside the style block
// First remove the raw code leak
const leakRegex = /\/\* TRANSLATE WIDGET STYLES \*\/\s*#google_translate_element select \{[\s\S]*?\}\s*<\/head>/;
html = html.replace(leakRegex, '</head>');

// Now properly inject the CSS inside the end of </style>
const properCSS = `
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
  </style>`;
html = html.replace('</style>', properCSS);

// 2. Add Google translate widget back
const navBadge = `    <div class="nav-utils" style="display:flex; align-items:center; gap: 16px;">
      <div id="google_translate_element"></div>
      <div class="nav-epk-badge">
        <div class="epk-pill">EPK 2026</div>
      </div>
    </div>
  </nav>`;

if (!html.includes('<div id="google_translate_element"></div>')) {
    html = html.replace(/<div class="nav-epk-badge">[\s\S]*?<\/div>\s*<\/nav>/, navBadge);
}

// 3. Add translate script at body end if it was removed
const translateScript = `
  <!-- Google Translate -->
  <script type="text/javascript">
    function googleTranslateElementInit() {
      new google.translate.TranslateElement({pageLanguage: 'es', includedLanguages: 'en,es,pt,fr,de,it'}, 'google_translate_element');
    }
  </script>
  <script type="text/javascript" src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
</body>`;
if (!html.includes('googleTranslateElementInit')) {
    html = html.replace('</body>', translateScript);
}

// 4. Update the contact info blocks (divergenteagency.booking@gmail.com / jansoundd@gmail.com)
// Find the exact contact links row that exists
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
          <a href="mailto:divergenteagency.booking@gmail.com" class="contact-link-row" style="text-decoration:none;">
            <div>
              <div class="contact-link-label">CORREO DIVERGENTE AGENCY</div>
              <div class="contact-link-val" style="text-transform:lowercase;">divergenteagency.booking@gmail.com</div>
            </div>
            <span class="contact-link-arrow">→</span>
          </a>
          <a href="mailto:jansoundd@gmail.com" class="contact-link-row" style="text-decoration:none;">
            <div>
              <div class="contact-link-label">CORREO JANSØUND</div>
              <div class="contact-link-val" style="text-transform:lowercase;">jansoundd@gmail.com</div>
            </div>
            <span class="contact-link-arrow">→</span>
          </a>
        </div>`;

if (html.includes('SOUNDCLOUD.COM/JANSOUNDARG')) {
    html = html.replace(oldContactLinks, newContactLinks);
}

fs.writeFileSync('index.html', html, 'utf-8');
console.log('Update Complete!');

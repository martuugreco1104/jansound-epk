const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf-8');

// 1. Bio Mobile Fixes
html = html.replace(
  '.bio-col { border-right: none; border-bottom: var(--border); }',
  '.bio-col { padding: 24px; border-right: none; border-bottom: var(--border); }'
);

html = html.replace(
  '.bio-photo-panel { grid-column: auto; }',
  '.bio-photo-panel { grid-column: auto; width: 100%; max-width: 300px; aspect-ratio: 4/5; min-height: auto; margin: 32px auto; overflow: hidden; }'
);

// 2. Hierarchy in Gallery & Video
const oldGalleryGridRegex = /<div class="gallery-grid">[\s\S]*?<\/div>\s*<\/section>/;
const newGalleryGrid = `<div class="gallery-grid">
      <!-- 1. VIDEO (First in HTML for priority in mobile) -->
      <a href="https://drive.google.com/drive/folders/1mzaKWy9LCsxWgZtZ67pmJ1jbvf9tWQbF" target="_blank" class="gallery-item gi-video">
        <video class="gallery-img" src="IMG_7057.mp4" autoplay loop muted playsinline aria-label="Videos Gigs"></video>
        <div class="gallery-item-overlay">
          <div class="gallery-item-title t-section">VIDEOS GIGS</div>
        </div>
      </a>
      <!-- 2. PHOTOS STUDIO -->
      <a href="https://drive.google.com/drive/folders/1MMNWnUKkcGbImRE58tBVL74JaX2gKcGs" target="_blank" class="gallery-item gi-foto1">
        <img class="gallery-img" src="fotos estudio.jpeg" alt="Fotos Studio" />
        <div class="gallery-item-overlay">
          <div class="gallery-item-title t-section">FOTOS STUDIO</div>
        </div>
      </a>
      <!-- 3. PHOTOS GIGS -->
      <a href="https://drive.google.com/drive/folders/1MIA0yE_-IvbCh6p2kpzCDFm9_5j-zG8S" target="_blank" class="gallery-item gi-foto2">
        <img class="gallery-img" src="IMG_7119.JPEG" alt="Fotos Gigs" />
        <div class="gallery-item-overlay">
          <div class="gallery-item-title t-section">FOTOS GIGS</div>
        </div>
      </a>
    </div>
  </section>`;
html = html.replace(oldGalleryGridRegex, newGalleryGrid);

// Update Desktop CSS rules for gallery
const oldDesktopClass = `    /* mosaic layout */
    .gi-3 { grid-column: 1 / 8;  grid-row: 1 / 3; }
    .gi-1 { grid-column: 8 / 13; grid-row: 1; }
    .gi-2 { grid-column: 8 / 13; grid-row: 2; }`;

const newDesktopClass = `    /* mosaic layout */
    .gi-video { grid-column: 1 / 8;  grid-row: 1 / 3; }
    .gi-foto1 { grid-column: 8 / 13; grid-row: 1; }
    .gi-foto2 { grid-column: 8 / 13; grid-row: 2; }`;

// Provide fallback in case it's space-differently
html = html.replace(oldDesktopClass, newDesktopClass);
if (!html.includes('.gi-video { grid-column: 1 / 8')) {
    html = html.replace(/\.gi-3 \{ grid-column: 1 \/ 8[^}]+\}/g, `.gi-video { grid-column: 1 / 8; grid-row: 1 / 3; }`);
    html = html.replace(/\.gi-1 \{ grid-column: 8 \/ 13[^}]+\}/g, `.gi-foto1 { grid-column: 8 / 13; grid-row: 1; }`);
    html = html.replace(/\.gi-2 \{ grid-column: 8 \/ 13[^}]+\}/g, `.gi-foto2 { grid-column: 8 / 13; grid-row: 2; }`);
}

// Mobile CSS rule updates for gallery
const oldMobileGridGallery = `.gi-1,.gi-2,.gi-3 { grid-column: auto; grid-row: auto; }`;
const newMobileGridGallery = `.gi-video,.gi-foto1,.gi-foto2 { grid-column: auto; grid-row: auto; }\n      .gallery-grid { grid-auto-rows: auto; grid-template-columns: 1fr; }\n      .gi-video { aspect-ratio: 4/5; }\n      .gi-foto1, .gi-foto2 { aspect-ratio: 1; }`;
html = html.replace(oldMobileGridGallery, newMobileGridGallery);
// If it wasn't matched properly:
if (!html.includes('.gi-video,.gi-foto1,.gi-foto2')) {
    html = html.replace('.gi-1,.gi-2,.gi-3 { grid-column: auto; grid-row: auto; }', newMobileGridGallery);
}


// 3. Clean up Venues
const venuesGridOld = `    .venues-grid {
      display: grid;
      grid-template-columns: 40px 1fr 360px;
      gap: 0;
    }`;
const venuesGridNew = `    .venues-grid {
      display: grid;
      grid-template-columns: 40px 1fr;
      gap: 0;
    }`;
html = html.replace(venuesGridOld, venuesGridNew);

// Remove venue-logos-aside
const asideRegex = /<div class="venue-logos-aside">[\s\S]*?<\/div>/;
html = html.replace(asideRegex, "");

// Optimizar mobile para Venues
html = html.replace(
  '.venue-list { padding: 0 20px; }',
  '.venue-list { padding: 0 20px; } \n      .venue-row { flex-direction: column; align-items: flex-start; gap: 8px; padding: 16px 0; } \n      .venue-name { font-size: 1.2rem; }'
);


// Ensure no horizontal scroll
html = html.replace(
  'html { scroll-behavior: smooth; }',
  'html { scroll-behavior: smooth; max-width: 100vw; overflow-x: hidden; }'
);

fs.writeFileSync('index.html', html, 'utf-8');
console.log('Done!');

const fs = require('fs');

// 1. Array of files to rename
const renames = [
    { from: 'fotos  estudio 2.jpeg', to: 'fotos-estudio-2.jpeg' },
    { from: 'fotos estudio.jpeg', to: 'fotos-estudio.jpeg' },
    { from: 'logo DA.png', to: 'logo-DA.png' },
    { from: 'logo jansound.png', to: 'logo-jansound.png' },
    { from: 'videos_gigsmp4.mp4', to: 'videos1-gigs.mp4' }
];

renames.forEach(r => {
    if (fs.existsSync(r.from)) {
        fs.renameSync(r.from, r.to);
    }
});

// 2. Read index.html
let html = fs.readFileSync('index.html', 'utf-8');

// Update image paths
html = html.replace(/fotos\s+estudio\s+2\.jpeg/g, 'fotos-estudio-2.jpeg');
html = html.replace(/fotos estudio\.jpeg/g, 'fotos-estudio.jpeg');
html = html.replace(/logo DA\.png/g, 'logo-DA.png');
html = html.replace(/logo jansound\.png/g, 'logo-jansound.png');

// 3. Update video tag
html = html.replace(
    /<video class="gallery-img" src="IMG_7057.mp4" autoplay loop muted playsinline aria-label="Videos Gigs"><\/video>/g,
    '<video class="gallery-img" src="videos1-gigs.mp4" autoplay loop muted playsinline aria-label="Videos Gigs"></video>'
);

// We should also replace the old src just in case
html = html.replace(/src="IMG_7057\.mp4"/g, 'src="videos1-gigs.mp4"');

// 4. Move Photo Panel to the Top of the Bio body list, but only if it's currently at the bottom.
const photoPanelRegex = /<!-- PHOTO PANEL -->\s*<div class="bio-photo-panel">[\s\S]*?<\/div>/;
const match = html.match(photoPanelRegex);
if (match) {
    // Remove it from its current position
    html = html.replace(photoPanelRegex, '');

    // Inject it at the start of bio-body
    const bioBodyStart = /<div class="bio-body reveal">/;
    html = html.replace(bioBodyStart, `<div class="bio-body reveal">\n      ${match[0]}`);
}

// 5. CSS Grid updates for Mobile Bio
// We need the bio-photo-panel to stack along with .bio-col
// In desktop, it is `grid-column: 1 / 3` (if max-width 1024), but wait! If it's the first child, grid-order matters.
// Or we can just use regular flow: grid-column: auto. By default `.bio-body` is 3 columns.
// In desktop, bio-col are 1fr 1fr 1fr. If photo panel is first, it will take the first column, shifting everything right.
// Let's actually use grid areas or explicitly assign grid columns if they need to stay the same on desktop.
let cssInjection = `
    .bio-body { display: flex; flex-direction: column; }
    .bio-col:nth-child(3) { border-top: var(--border); }
    .bio-photo-panel { margin: 0 auto 32px auto; width: 100%; max-width: 320px; aspect-ratio: 4/5; min-height: auto; order: -1; }
`;

// It's much easier to just use `order: -1;` for `.bio-photo-panel` ONLY in mobile. So I will revert the DOM move!
// Let me revert the HTML move and just use CSS.
html = html.replace(`<div class="bio-body reveal">\n      ${match[0]}`, `<div class="bio-body reveal">`);
// Put it back
const statsStripRegex = /<!-- STATS STRIP -->/;
html = html.replace(statsStripRegex, `${match[0]}\n\n      <!-- STATS STRIP -->`);

// Now apply mobile CSS logic
const cssMobileRegex = /\.bio-photo-panel \{ grid-column: auto; width: 100%; max-width: 300px; aspect-ratio: 4\/5; min-height: auto; margin: 32px auto; overflow: hidden; \}/;

const cssMobileReplacement = `.bio-photo-panel { 
        grid-column: auto; 
        width: 100%; 
        max-width: 300px; 
        aspect-ratio: 4/5; 
        min-height: auto; 
        margin: 0 auto 32px auto; 
        overflow: hidden; 
        order: -1; /* Mueve la imagen al principio en mobile */
      }
      .bio-body { display: flex; flex-direction: column; } /* Asegurar que se apilen 100% full */`;

html = html.replace(cssMobileRegex, cssMobileReplacement);


// 6. En Venues mobile, ensure names are fully clickable styling
const cssMobileVenuesRegex = /\.venue-name \{ font-size: 1\.2rem; \}/;
const cssMobileVenuesReplacement = `.venue-name { font-size: 1.2rem; }
      .venue-row { display: flex; flex-direction: column; width: 100%; border-bottom: var(--border); }`;
html = html.replace(cssMobileVenuesRegex, cssMobileVenuesReplacement);

// 7. Ensure Header Logo sizing was requested again: "El logo del header debe ser más grande, pero en mobile debe estar contenido para no romper la navegación."
// In my first prompt I added:
// .header-logo { height: 48px; ... }
// @media (max-width: 768px) { .header-logo { height: 28px; } }
// This is already exactly doing that. I will increase the desktop one a bit to 56px, and keep mobile at 28px.
html = html.replace(`.header-logo {
      height: 48px;`, `.header-logo {
      height: 56px;`);

fs.writeFileSync('index.html', html, 'utf-8');
console.log('Update successful!');

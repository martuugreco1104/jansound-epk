const fs = require('fs');
let html = fs.readFileSync('index-en.html', 'utf8');

const t = [
    [`PERFIL Y TRAYECTORIA`, `PROFILE & TRAJECTORY`],
    [`IDENTIDAD SONORA`, `SOUND IDENTITY`],
    [`VISIÓN 2026`, `VISION 2026`],
    [`Oriundo de Buenos Aires, JANSØUND es el producto artístico de Jano Farias, DJ y productor cuya evolución en la escena electrónica ha sido tan rápida como sólida.`, `Hailing from Buenos Aires, JANSØUND is the artistic project of Jano Farias, a DJ and producer whose evolution in the electronic scene has been as rapid as it is solid.`],
    [`Desde su debut en 2023, su crecimiento exponencial lo ha llevado a compartir cabina con referentes internacionales como Lehar, D3fai, TimiR y Cloz.`, `Since his debut in 2023, his exponential growth has led him to share the booth with international icons such as Lehar, D3fai, TimiR, and Cloz.`],
    [`Su sonido es un equilibrio de contrastes: la fuerza industrial del Techno fusionada con la atmósfera etérea y vocales del Melodic Techno.`, `His sound is a balance of contrasts: the industrial force of Techno fused with the ethereal atmospheres and vocals of Melodic Techno.`],
    [`Con influencias que van desde el rock hasta los géneros urbanos, JANSØUND diseña sets de alta personalidad donde el Groove es el hilo conductor y la conexión con la pista es la prioridad absoluta.`, `With influences ranging from rock to urban genres, JANSØUND designs sets with high personality where the Groove is the common thread and the connection with the dancefloor is the absolute priority.`],
    [`JANSØUND no solo mezcla; construye narrativas inmersivas. Para 2026, su misión es clara: proyectar su energía industrial hacia la vanguardia global, llevando el pulso de la escena argentina a los escenarios más exigentes del mundo.`, `JANSØUND doesn't just mix; he constructs immersive narratives. For 2026, his mission is clear: to project his industrial energy towards the global forefront, taking the pulse of the Argentine scene to the most demanding world stages.`],
    [`Debut en la escena electrónica porteña`, `Debut in the Buenos Aires electronic scene`],
    [`Venues top en Buenos Aires`, `Top venues in Buenos Aires`],
    [`Para bookings, consultas técnicas o prensa, contactá directamente`, `For bookings, technical inquiries or press, contact directly`],
    [`a través de Divergente Agency o por los canales oficiales de JANSØUND.`, `through Divergente Agency or through JANSØUND's official channels.`],
    [`REQUERIMIENTOS DE CAMARÍN`, `CLOSET REQUIREMENTS`],
    [`DESCARGABLES`, `DOWNLOADABLE`],
    [`GUÍA DE ESTILO`, `STYLE GUIDE`],
    [`TRAYECTORIA EN LA PISTA`, `TRAJECTORY ON THE TRACK`],
    [`LET'S MAKE NOISE TOGETHER`, `LET'S MAKE NOISE TOGETHER`],
    [`CORREO DIVERGENTE AGENCY`, `DIVERGENTE AGENCY EMAIL`],
    [`CORREO JANSØUND`, `JANSØUND EMAIL`],
    [`PLATAFORMAS DIGITALES`, `DIGITAL PLATFORMS`],
    [`ORIGEN`, `ORIGIN`],
    [`GÉNERO`, `GENRE`],
    [`ACTIVO DESDE`, `ACTIVE SINCE`]
];

for (const [k, v] of t) {
    html = html.split(k).join(v);
}

// Final adjustments
html = html.split('Español').join('Spanish');
html = html.split('Inglés').join('English');

fs.writeFileSync('index-en.html', html);
console.log('index-en.html translated.');

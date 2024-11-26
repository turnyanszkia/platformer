// Canvas beállítása
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Pályaelemek definiálása (x, y, szélesség, magasság)
const platformok = [
    {x: 50, y: 350, width: 200, height: 20},  // alsó platform
    {x: 300, y: 250, width: 200, height: 20}, // középső platform
    {x: 550, y: 150, width: 200, height: 20}  // felső platform
];

// Falak
const falak = [
    {x: 0, y: 0, width: 10, height: 400},      // bal oldali fal
    {x: 790, y: 0, width: 10, height: 400},    // jobb oldali fal
    {x: 0, y: 0, width: 800, height: 10},      // felső fal
    {x: 0, y: 390, width: 800, height: 10}     // alsó fal
];

// Ajtó GIF betöltése
const doorImage = new Image();
doorImage.src = 'https://cdn.streamloots.com/uploads/5beeb9a487b681002fbd373e/fe0dff78-1d03-47a2-ab64-4bd9926f9a36.gif';

// Karakter GIF-ek
const idleImage = new Image();
idleImage.src = 'stand.gif'; // Mozdulatlan GIF
const walkImage = new Image();
walkImage.src = 'knigth.gif'; // Mozgás GIF

// Karakter beállítások
const karakter = {
    x: 100,       // kezdő pozíció
    y: 320,       // a platform teteje
    width: 40,    // karakter szélesség
    height: 50,   // karakter magasság
    speed: 5,     // vízszintes mozgás sebesség
    velY: 0,      // függőleges sebesség
    jumping: false, // ugrás állapot
    gravity: 0.8, // gravitáció ereje
    jumpPower: -15, // ugrás ereje
    moving: false,  // Mozgás állapot
    facingRight: true  // Jobbra néz
};

// Billentyűállapotok tárolása
const keys = {
    right: false,
    left: false,
    up: false
};

// Billentyű események figyelése
window.addEventListener('keydown', (e) => {
    if (e.code === 'KeyA') keys.left = true;
    if (e.code === 'KeyD') keys.right = true;
    if (e.code === 'KeyW' && !karakter.jumping) {  // ugrás csak akkor, ha nincs ugrásban
        keys.up = true;
        karakter.jumping = true;
        karakter.velY = karakter.jumpPower; // felfelé gyorsítjuk a karaktert
    }
});

window.addEventListener('keyup', (e) => {
    if (e.code === 'KeyA') keys.left = false;
    if (e.code === 'KeyD') keys.right = false;
    if (e.code === 'KeyW') keys.up = false;
});

// Karakter mozgásának frissítése
function updateCharacter() {
    karakter.moving = false; // Alapértelmezetten mozdulatlan

    // Vízszintes mozgás
    if (keys.left) {
        karakter.x -= karakter.speed;
        karakter.moving = true;
        karakter.facingRight = false; // Balra mozgás, balra néz
    }
    if (keys.right) {
        karakter.x += karakter.speed;
        karakter.moving = true;
        karakter.facingRight = true; // Jobbra mozgás, jobbra néz
    }

    // Gravitáció
    karakter.velY += karakter.gravity;
    karakter.y += karakter.velY;

    // Platformokon maradás
    platformok.forEach(platform => {
        // Ellenőrizzük, hogy a karakter vízszintesen érinti-e a platformot
        if (karakter.x + karakter.width > platform.x && karakter.x < platform.x + platform.width) {
            // Ellenőrizzük, hogy a karakter alja (y + height) érinti-e a platform tetejét
            if (karakter.y + karakter.height >= platform.y && karakter.y + karakter.height <= platform.y + karakter.velY) {
                karakter.y = platform.y - karakter.height; // A karakter talpa a platform tetejére kerül
                karakter.velY = 0; // Függőleges sebesség nullázása (megáll)
                karakter.jumping = false; // Ugrás vége
            }
        }
    });

    // Ne essen le a pályáról (alsó fal)
    if (karakter.y + karakter.height >= canvas.height) {
        karakter.y = canvas.height - karakter.height;
        karakter.velY = 0;
        karakter.jumping = false;
    }
}

// Karakter rajzolása GIF alapján
function drawCharacter() {
    ctx.save(); // Mentjük a jelenlegi állapotot

    // Ha balra néz, tükrözzük a képet
    if (!karakter.facingRight) {
        ctx.scale(-1, 1); // Vízszintes tükrözés
        ctx.drawImage(
            karakter.moving ? walkImage : idleImage, // Animált GIF mozgáskor
            -karakter.x - karakter.width, // Balra tükrözött x koordináta
            karakter.y,
            karakter.width,
            karakter.height
        );
    } else {
        // Jobbra nézés: normál rajzolás
        ctx.drawImage(
            karakter.moving ? walkImage : idleImage, // Animált GIF mozgáskor
            karakter.x,
            karakter.y,
            karakter.width,
            karakter.height
        );
    }

    ctx.restore(); // Visszaállítjuk az állapotot
}

// Pálya rajzolása
function drawLevel() {
    // Háttér törlése
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Platformok rajzolása
    ctx.fillStyle = '#000000'; // piros platformok
    platformok.forEach(platform => {
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);

        // Ajtó rajzolása a platform tetejére (nagyobb méret)
        ctx.drawImage(doorImage, platform.x + platform.width / 2 - 50, platform.y - 100, 100, 100); // nagyobb ajtó (100x100)
    });

    // Falak rajzolása
    ctx.fillStyle = '#000000'; // fekete falak
    falak.forEach(fal => {
        ctx.fillRect(fal.x, fal.y, fal.width, fal.height);
    });

    // Karakter rajzolása
    drawCharacter(); // Meghívjuk a karakter rajzolását
}

// Animációs ciklus
function gameLoop() {
    updateCharacter(); // karakter mozgás frissítése
    drawLevel(); // pálya és karakter kirajzolása
    requestAnimationFrame(gameLoop); // újrahívja önmagát
}
 // Beállítások menü megjelenítése/elrejtése
 function toggleSettingsMenu() {
    const menu = document.getElementById('settingsMenu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

// Hangerő beállítása
function updateVolume() {
    const audio = document.getElementById('backgroundAudio');
    const volume = document.getElementById('volumeControl').value;
    video.volume = volume; // Videó hangerejének beállítása
    audio.volume = volume; // Háttérhang hangerejének beállítása
}

// Teljes képernyős mód be- és kikapcsolása
function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
        document.exitFullscreen();
    }
}
// Játék indítása
gameLoop();

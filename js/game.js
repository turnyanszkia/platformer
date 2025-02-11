const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Pályaelemek definiálása
const platformok = [
    {x: 50, y: 350, width: 200, height: 20},
    {x: 300, y: 250, width: 200, height: 20},
    {x: 550, y: 150, width: 200, height: 20}
];

// Falak
const falak = [
    {x: 0, y: 0, width: 10, height: 400},
    {x: 790, y: 0, width: 10, height: 400},
    {x: 0, y: 0, width: 800, height: 10},
    {x: 0, y: 390, width: 800, height: 10}
];

// Képek betöltése
const doorImage = new Image();
doorImage.src = 'https://cdn.streamloots.com/uploads/5beeb9a487b681002fbd373e/fe0dff78-1d03-47a2-ab64-4bd9926f9a36.gif';

const idleImage = new Image();
idleImage.src = '/kepek/stand.gif';
const walkImage = new Image();
walkImage.src = '/kepek/knigth.gif';

// Karakter beállításai
const karakter = {
    x: 100,
    y: 320,
    width: 40,
    height: 50,
    speed: 5,
    velY: 0,
    jumping: false,
    gravity: 0.8,
    jumpPower: -15,
    moving: false,
    facingRight: true
};

// Billentyűállapotok
const keys = {right: false, left: false, up: false};

window.addEventListener('keydown', (e) => {
    if (e.code === 'KeyA') keys.left = true;
    if (e.code === 'KeyD') keys.right = true;
    if (e.code === 'KeyW' && !karakter.jumping) {
        keys.up = true;
        karakter.jumping = true;
        karakter.velY = karakter.jumpPower;
    }
});

window.addEventListener('keyup', (e) => {
    if (e.code === 'KeyA') keys.left = false;
    if (e.code === 'KeyD') keys.right = false;
    if (e.code === 'KeyW') keys.up = false;
});

// Karakter frissítése
function updateCharacter() {
    karakter.moving = false;

    if (keys.left) {
        karakter.x -= karakter.speed;
        karakter.moving = true;
        karakter.facingRight = false;
    }
    if (keys.right) {
        karakter.x += karakter.speed;
        karakter.moving = true;
        karakter.facingRight = true;
    }

    karakter.velY += karakter.gravity;
    karakter.y += karakter.velY;

    platformok.forEach(platform => {
        if (karakter.x + karakter.width > platform.x && karakter.x < platform.x + platform.width) {
            if (karakter.y + karakter.height >= platform.y && karakter.y + karakter.height <= platform.y + karakter.velY) {
                karakter.y = platform.y - karakter.height;
                karakter.velY = 0;
                karakter.jumping = false;
            }
        }
    });

    if (karakter.y + karakter.height >= canvas.height) {
        karakter.y = canvas.height - karakter.height;
        karakter.velY = 0;
        karakter.jumping = false;
    }
}

// Karakter rajzolása
function drawCharacter() {
    ctx.save();
    if (!karakter.facingRight) {
        ctx.scale(-1, 1);
        ctx.drawImage(karakter.moving ? walkImage : idleImage, -karakter.x - karakter.width, karakter.y, karakter.width, karakter.height);
    } else {
        ctx.drawImage(karakter.moving ? walkImage : idleImage, karakter.x, karakter.y, karakter.width, karakter.height);
    }
    ctx.restore();
}

// Pálya rajzolása
function drawLevel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    platformok.forEach(platform => {
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
        ctx.drawImage(doorImage, platform.x + platform.width / 2 - 50, platform.y - 100, 100, 100);
    });
    falak.forEach(fal => {
        ctx.fillRect(fal.x, fal.y, fal.width, fal.height);
    });
    drawCharacter();
}

// Animációs ciklus
function gameLoop() {
    updateCharacter();
    drawLevel();
    requestAnimationFrame(gameLoop);
}

// Beállítások menü kezelése
function toggleSettingsMenu() {
    const menu = document.getElementById('settingsMenu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

// Hangerő beállítása
function updateVolume() {
    const audio = document.getElementById('backgroundAudio');
    const volume = document.getElementById('volumeControl').value;
    audio.volume = volume;
}

// Teljes képernyős mód
function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
        document.exitFullscreen();
    }
}

// Játék indítása
gameLoop();

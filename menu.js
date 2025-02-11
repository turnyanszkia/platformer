
// Beállítások menü megjelenítése/elrejtése
function toggleSettingsMenu() {
    const menu = document.getElementById('settingsMenu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

// Fényerő beállítása
function updateBrightness() {
    const video = document.getElementById('backgroundVideo');
    const brightness = document.getElementById('brightnessControl').value;
    video.style.filter = `brightness(${brightness})`;
}

// Hangerő beállítása
function updateVolume() {
    const video = document.getElementById('backgroundVideo');
    const volume = document.getElementById('volumeControl').value;
    video.volume = volume;
}

// Teljes képernyős mód be- és kikapcsolása
function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
        document.exitFullscreen();
    }
}

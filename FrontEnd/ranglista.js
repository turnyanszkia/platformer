// A ranglista kiírása GET kérés alapján
async function getRanglista() {
    try {
        // GET kérés küldése a ranglista végpontra
        const response = await fetch('http://localhost:5000/api/jatekosok/ranglista', {
            method: 'GET', // POST helyett GET
            headers: {
                'Content-Type': 'application/json',
            }
        });

        // Ha a válasz sikeres, dolgozzuk fel a ranglistát
        if (response.ok) {
            const ranglista = await response.json();

            // A ranglista táblázat kitöltése
            const tableBody = document.querySelector('#rankTable tbody');
            tableBody.innerHTML = ''; // Ürítsük ki a táblázatot először

            ranglista.forEach(player => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${player.Helyezes}</td>
                    <td>${player.Nev}</td>
                    <td>${player.Pontszam}</td>
                `;
                tableBody.appendChild(row);
            });

            // Betöltés üzenet eltüntetése
            document.getElementById('loading').style.display = 'none';
        } else {
            throw new Error('Hiba történt a ranglista lekérésekor.');
        }
    } catch (error) {
        console.error('Hiba:', error);
        document.getElementById('loading').textContent = 'Hiba történt a ranglista betöltésekor!';
    }
}

// Oldal betöltésekor hívjuk meg a ranglista lekérést
window.onload = getRanglista;

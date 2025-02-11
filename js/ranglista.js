 // Az API URL, amelyből lekérjük a ranglista adatokat
 const apiUrl = 'http://localhost:5000/api/Jatekosok/ranglista/token';

 // Funkció a ranglista lekérésére és megjelenítésére
 async function getRanglista() {
try {
 const response = await fetch(apiUrl);
 if (!response.ok) {
     throw new Error('Nem sikerült a ranglista betöltése!');
 }

 const ranglista = await response.json();
 console.log(ranglista);

 const tbody = document.getElementById('ranglistaTbody');
 tbody.innerHTML = '';

 ranglista.forEach(jatekos => {
     console.log(jatekos);  // Kiírjuk az egyes játékosokat
     const row = document.createElement('tr');
     row.innerHTML = `
         <td>${jatekos.helyezes}</td>
         <td>${jatekos.nev}</td>
         <td>${jatekos.pontszam}</td>
     `;
     tbody.appendChild(row);
 });
} catch (error) {
 console.error('Hiba történt a ranglista lekérésekor:', error);
 alert('Hiba történt a ranglista betöltésekor!');
}
}



 // Oldal betöltésekor hívjuk meg a ranglista adatokat
 window.onload = getRanglista;
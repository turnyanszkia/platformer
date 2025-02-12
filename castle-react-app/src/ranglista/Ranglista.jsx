import React, { useEffect, useState } from 'react';
import './ranglista.css';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  // Ranglista adatainak lekérése API-ból
  const getRanglista = async () => {
    const apiUrl = 'http://localhost:5000/api/Jatekosok/ranglista/token';

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Nem sikerült a ranglista betöltése!');
      }

      const ranglista = await response.json();
      console.log(ranglista);

      setLeaderboard(ranglista); // Beállítjuk a ranglista adatokat a state-be
    } catch (error) {
      console.error('Hiba történt a ranglista lekérésekor:', error);
      alert('Hiba történt a ranglista betöltésekor!');
    }
  };

  // Ranglista lekérése az oldal betöltésekor
  useEffect(() => {
    getRanglista();
  }, []);

  return (
    <div>
      <h1>Játékosok Ranglistája</h1>
      <div id="ranglista">
        <table>
          <thead>
            <tr>
              <th>Helyezés</th>
              <th>Név</th>
              <th>Pontszám</th>
            </tr>
          </thead>
          <tbody id="ranglistaTbody">
            {leaderboard.map((jatekos, index) => (
              <tr key={index}>
                <td>{jatekos.helyezes}</td>
                <td>{jatekos.nev}</td>
                <td>{jatekos.pontszam}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;

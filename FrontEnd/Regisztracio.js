function Regisztracio() {
    let salt = GenerateSalt(64);
    let datum = new Date();
    let body = {
        "id": parseInt(document.getElementById("id").value),
        "felhasznaloNev": document.getElementById("felhasznaloNev").value,
        "teljesNev": document.getElementById("teljesNev").value,
        "salt": salt,
        "hash": sha256(document.getElementById("jelszo").value + salt),
        "email": document.getElementById("email").value,
        "jogosultsag": parseInt(document.getElementById("jogosultsag").value),
        "aktiv": parseInt(document.getElementById("aktiv").value),
        "regisztracioDatuma": datum.toISOString(),
        "fenykepUtvonal": document.getElementById("fenykepUtvonal").value
    }
    console.log(body);
    let url = "http://localhost:5000/api/Registry";
    axios.post(url, body).then((response) => {
        alert(response.data);
    })
        .catch((error) => {
            alert(error);
        });
}

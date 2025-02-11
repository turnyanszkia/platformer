let token=sessionStorage.getItem("token");
if (token == null) {
    alert("Nincs bejelentkezve!");
    document.getElementById("regiJelszo").disabled = true;
    document.getElementById("ujJelszo").disabled = true;
    document.getElementById("ujJelszoIsmet").disabled = true;
}
else {
    document.getElementById("regiJelszo").disabled = false;
    document.getElementById("ujJelszo").disabled = false;
    document.getElementById("ujJelszoIsmet").disabled = false;
}

function JelszoModositas() {
    if (document.getElementById("ujJelszo").value==document.getElementById("ujJelszoIsmet").value)
    {
    let loginName = sessionStorage.getItem("loginName");
    console.log(loginName)
    let saltUrl = "http://localhost:5000/api/Login/SaltRequest/" + loginName;
    axios.post(saltUrl).then((response) => {
        let salt = response.data;
        let regiJelszo = sha256(document.getElementById("regiJelszo").value + salt);
        let ujJelszo = sha256(document.getElementById("ujJelszo").value + salt);
        //let tmpHash = sha256(password + salt.toString());
        let Url = "http://localhost:5000/api/Jelszo/" + loginName + "," + regiJelszo + "," + ujJelszo;
        console.log(Url);
        axios.post(Url).then((response) => {
            if (response.status == 200) {
                alert(response.data)
            }
            if (response.status == 201) {
                alert("Valamit elrontottál!")
            }
        })
            .catch((error) => {
                alert(error);
            });
    })
        .catch((error) => {
            alert(error);
        });
    }
    else
    {
        alert("Hibás az ismételt jelszómegadás!")
    }
}

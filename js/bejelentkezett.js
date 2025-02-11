var felhasznaloNev = document.getElementById("userName");
var jelszo = document.getElementById("password");
var bejelentkezesGomb = document.getElementById("loginButton");

function login() {
    let datas = {
        loginName : felhasznaloNev.value,
        tmpHash : jelszo.value
    }

    let options = {
        method: "POST",
        body: JSON.stringify(datas),
        headers: {
            "Content-Type" : "application/json"
        }
    }
    fetch("http://localhost:5004/api/Login", options)
    .then(response => response.json())
    .then(data => {
        localStorage.setItem("token", JSON.stringify(data));
    })
}
bejelentkezesGomb.addEventListener("click", login);

//valasz ellenorzese
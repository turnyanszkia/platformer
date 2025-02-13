var teljesNev = document.getElementById("fullName");
var felhasznaloNev = document.getElementById("userName");
var email = document.getElementById("email");
var jelszo = document.getElementById("password");
var profilkep = document.getElementById("profilePic");
var regisztralasGomb = document.getElementById("registerButton");

function register() {
    let datas = {
        "LoginNev" : felhasznaloNev.value,
        "Hash" : jelszo.value,
        "Salt" : "asd",
        "Name" : teljesNev.value,
        "PermissionId" : 2,
        "Active" : true,
        "Email" : email.value,
        "ProfilePicturePath" : "img\\kerenyir.jpg"
    }
    let options = {
        method: "POST",
        body: JSON.stringify(datas),
        headers: {
            "Content-Type" : "application/json"
        }
    }
    fetch("http://localhost:5000/api/Registry", options)
    .then(data => {
        alert("Sikeres regisztráció")
        window.location.href = "menu.html"
    })
}
regisztralasGomb.addEventListener("click", register)



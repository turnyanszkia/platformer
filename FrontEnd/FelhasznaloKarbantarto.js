document.getElementById("klikkEsemeny").innerHTML = "Új felhasználó felvétele";
document.getElementById("klikkEsemeny").addEventListener("click", klikkEsemeny);

function uj(event) {
    sessionStorage.setItem("karbantartasTipusa", "uj");
    document.getElementById("klikkEsemeny").innerHTML = "Új felhasználó felvétele";
    event.preventDefault();
    document.getElementById("id").disabled = true;
}

function modosit(event) {
    sessionStorage.setItem("karbantartasTipusa", "modosit");
    document.getElementById("klikkEsemeny").innerHTML = "Felhasználó módosítása";
    event.preventDefault();
    document.getElementById("id").disabled = false;
}

function torol(event) {
    sessionStorage.setItem("karbantartasTipusa", "torol");
    document.getElementById("klikkEsemeny").innerHTML = "Felhasználó törlése";
    event.preventDefault();
    document.getElementById("id").disabled = false;
}

function beolvasas() {
    let url = "http://localhost:5000/api/User/" + document.getElementById("id").value + "," + sessionStorage.getItem("token");
    axios.get(url).then((response) => {
        let user = response.data;
        console.log(user);
        document.getElementById("felhasznaloNev").value = user.loginNev;
        document.getElementById("teljesNev").value = user.name;
        document.getElementById("salt").value = user.salt;
        document.getElementById("hash").value = user.hash;
        document.getElementById("email").value = user.email;
        document.getElementById("jogosultsag").value = user.permissionId;
        if (user.aktiv) {
            document.getElementById("aktiv").value = 1;
        }
        else{
            document.getElementById("aktiv").value = 0;
        }
        document.getElementById("fenykepUtvonal").value = user;
    })
        .catch((error) => {
            alert(error);
        });
}
function fenykepFeltolt(){
    const formData = new FormData();

    const fileInput = document.getElementById('avatar');
    formData.append('file', fileInput.files[0]);
    try {
        const response = axios.post("http://localhost:5000/api/FileUpload/FtpServer", formData).then((response) => {
            console.log('Success:', response.data);
            document.getElementById("fenykepUtvonal").value = response.data;
          });

    } catch (error) {
        console.error('Error:', error);
    }
}
function SaltEsHashGeneralas(){
    let jelszo=document.getElementById("jelszo").value;
    if (jelszo!="")
    {
        salt=GenerateSalt(64);
        document.getElementById("salt").value=salt;
        document.getElementById("hash").value=sha256(sha256(jelszo+salt));
    }
}

function klikkEsemeny() {
    let salt = GenerateSalt(64);
    let datum = new Date();
    let active = false;
    if (document.getElementById("aktiv").value==1){
        active = true;
    }
    let body = {
        "id": parseInt(document.getElementById("id").value),
        "loginNev": document.getElementById("felhasznaloNev").value,
        "name": document.getElementById("teljesNev").value,
        "salt": document.getElementById("salt").value,
        "hash": document.getElementById("hash").value,
        "email": document.getElementById("email").value,
        "permissionId": parseInt(document.getElementById("jogosultsag").value),
        "active": active,
        "profilePicturePath": document.getElementById("fenykepUtvonal").value
    }
    console.log(body);
    let url = "http://localhost:5000/api/User/" + sessionStorage.getItem("token");
    switch (sessionStorage.getItem("karbantartasTipusa")) {
        case "uj":
            axios.post(url, body).then((response) => {
                alert(response.data);
            })
                .catch((error) => {
                    alert(error);
                });
            break;
        case "modosit":
            axios.put(url, body).then((response) => {
                alert(response.data);
            })
                .catch((error) => {
                    alert(error);
                });
            break;
        case "torol":
            axios.delete(url+","+document.getElementById("id").value).then((response) => {
                alert(response.data);
            })
                .catch((error) => {
                    alert(error);
                });
            break;
        default:
            alert("Baj van! :-)")
    }
}

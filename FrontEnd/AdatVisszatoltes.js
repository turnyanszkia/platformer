function AdatokVisszatoltese() {
    if (!confirm("Biztosan visszatölti az adatokat?")) {
        return;
    }
    let token = sessionStorage.getItem("token");
    let formData = new FormData();
    let fajl = document.getElementById("sqlFileName").files[0];
    formData.append("file", fajl);
    axios
        .post(
            "http://localhost:5000/api/BackupRestore/Restore/" + token,
            formData
        )
        .then((response) => {
            alert(response.data);
        })
        .catch((error) => {
            alert(error);
        });
}

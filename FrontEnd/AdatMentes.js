document.getElementById("sqlFileName").value = "SQL_backup_" + new Date().toISOString().split('T')[0] + ".sql";

function AdatokMentese() {
    let fajlNev = document.getElementById("sqlFileName").value;
    let token = sessionStorage.getItem("token");
    let Url = "http://localhost:5000/api/BackupRestore/Backup/" + token + "," + fajlNev;
    console.log(Url);
    axios.get(Url, { responseType: "blob" }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fajlNev);
        document.body.appendChild(link);
        link.click();
    })
        .catch((error) => {
            alert(error);
        });
}

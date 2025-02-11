function JelszoKeres() {
    let email = document.getElementById("email").value;
    let url = "http://localhost:5000/api/Jelszo/"+email;
    axios.post(url).then((response) => {
        alert(response.data);
    })
        .catch((error) => {
            alert(error);
        });
}

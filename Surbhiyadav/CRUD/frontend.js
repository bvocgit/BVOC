document.getElementById("insertBtn").addEventListener("click", function () {
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;

    fetch(`/insert?id=${id}&name=${name}`)
        .then(response => response.json())
        .then(data => alert(data.message || JSON.stringify(data)))
        .catch(error => console.error("Error:", error));
});

document.getElementById("showBtn").addEventListener("click", function () {
    fetch(`/show`)
        .then(response => response.json())
        .then(data => console.log(data) || alert(JSON.stringify(data)))
        .catch(error => console.error("Error:", error));
});

document.getElementById("updateBtn").addEventListener("click", function () {
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;

    fetch(`/update?id=${id}&name=${name}`)
        .then(response => response.json())
        .then(data => alert(data.message || JSON.stringify(data)))
        .catch(error => console.error("Error:", error));
});

document.getElementById("deleteBtn").addEventListener("click", function () {
    const id = document.getElementById("id").value;

    fetch(`/delete?id=${id}`)
        .then(response => response.json())
        .then(data => alert(data.message || JSON.stringify(data)))
        .catch(error => console.error("Error:", error));
});

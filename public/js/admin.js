function deleteTravel(id) {
    // console.log(id);
    fetch (`/delete/${id}`, {
        method: "DELETE"
    })
    .then(response => {
        response.json()
        })
    .then(data => {
        location.reload()  
    })
    .catch(err => console.log(err))
}
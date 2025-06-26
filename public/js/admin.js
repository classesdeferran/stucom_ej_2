const sectionInsert = document.getElementById("insert");
const sectionUpdate = document.getElementById("update");
sectionUpdate.style.display = "none";
const dataUpdate = document.getElementById("dataUpdate");

function deleteTravel(id) {
  // console.log(id);
  fetch(`/delete/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      response.json();
    })
    .then((data) => {
      location.reload();
    })
    .catch((err) => console.log(err));
}

function editTravel(travel) {
  sectionInsert.style.display = "none";
  sectionUpdate.style.display = "block";
  const newTravel = JSON.parse(travel);
  // console.log(newTravel.id);
  document.getElementById("update_id").value = newTravel.id;
  document.getElementById("update_ruta").value = newTravel.ruta;
  document.getElementById("update_nombre").value = newTravel.nombre;
  document.getElementById("update_descripcion").value = newTravel.descripcion;
  document.getElementById("update_precio").value = newTravel.precio;
  document.getElementById("update_lugar").value = newTravel.lugar;
  document.getElementById("update_img").value = newTravel.img;
}

dataUpdate.addEventListener("submit", (event) => {
  event.preventDefault();
  // console.log(dataUpdate);
  const formData = new FormData(dataUpdate);
  const datosFormulario = Object.fromEntries(formData);
  console.log(datosFormulario);

  // let newObject = {}
  // for (clave in datosFormulario) {
  //   const claveLimpia = clave.replace("update_", "");
  //   newObject[claveLimpia] = datosFormulario[clave]
  // }
  // console.log(newObject);
  let newString = JSON.stringify(datosFormulario).replaceAll('update_', "")
  // console.log(newString);

  fetch(`update/${datosFormulario.update_id}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body : newString
  })
  .then( response => response.text())
  .then( result => {
    console.log(result);
    location.reload()
  })
  .catch (err => console.log("Error:", err))
});

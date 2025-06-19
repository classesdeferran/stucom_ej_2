// DEPENDENCIAS DEL PROYECTO
const fs = require("node:fs");
const path = require("node:path");
const crypto = require('node:crypto')
const express = require("express"); // Sintaxis commonjs
const app = express();

// PUERTO DE CONEXIÓN
process.loadEnvFile();
const PORT = process.env.PORT;

// MIDDLEWARE
// para la carpeta de recursos públicos
app.use(express.static(path.join(__dirname, "public")));
// para indicar cuál es el motor de las plantilla
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// recodificar los datos del formulario
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// CARGAR LOS DATOS
const jsonData = require("./data/travels.json");
jsonData.forEach(travel => {
  // RUTAS
  app.get(`${travel.ruta}`, (req, res) => {
    res.render("travels", {
        "lugar" : `${travel.lugar}`,
        "nombre" : `${travel.nombre}`,
        "descripcion" : `${travel.descripcion}`,
        "precio" : `${travel.precio}`,
        "img" : `${travel.img}`,
        "id" : `${travel.id}`,
        "travels" : jsonData
    });
  });
});

app.get("/admin", (req, res) => {
    res.render("admin", {jsonData})
})

app.post("/insert", (req, res) => {
    // console.log(req.body);
    let newTravel = req.body
    if (newTravel.ruta[0] != "/") {
        newTravel.ruta = "/"+newTravel.ruta
    }    
    newTravel.precio = parseFloat(newTravel.precio)
    newTravel.id = crypto.randomUUID()
    jsonData.push(newTravel)
    // console.log(jsonData);
    fs.writeFileSync(path.join(__dirname, "data", "travels.json"), JSON.stringify(jsonData, null, 2), "utf-8")
    res.redirect("/admin")

})
 
app.listen(PORT, () => {
  console.log(`Servidor levantado en http://localhost:${PORT}`);
});

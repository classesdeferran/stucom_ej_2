const fs = require("node:fs");
const path = require("node:path");
const crypto = require('node:crypto')

function deleteItem (jsonData, idParam) {
    return jsonData.filter(travel => travel.id != idParam)
}

function writeTravelsJSON (jsonData) {
    fs.writeFileSync(path.join(__dirname, "..", "data", "travels.json"), JSON.stringify(jsonData, null, 2), "utf-8")
}

function insertItem (newTravel, jsonData) {
    if (newTravel.ruta[0] != "/") {
            newTravel.ruta = "/"+newTravel.ruta
        }    
        newTravel.precio = parseFloat(newTravel.precio)
        newTravel.id = crypto.randomUUID()
        jsonData.push(newTravel)
        return jsonData
}


module.exports = {deleteItem, writeTravelsJSON, insertItem}


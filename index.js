const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { dbConnection } = require("./database/config");
const path = require("path");
//console.log(process.env);

// Crear el servidor de express
const app = express();

// Base de datos
dbConnection();

//CORS
app.use(cors());

// Directoprio Público
app.use(express.static("public"));

// Lectura y parseo del body
app.use(express.json());

// Rutas
// TODO: auth // crear, login, renew
app.use("/api/auth", require("./routes/auth"));
// TODO: CRUD: Eventos
app.use("/api/events", require("./routes/events"));

//Aplicar para publicar y colocar la aplicación REACT Front en el BACK carpeta PUBLIC
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

//Excuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});

const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { dbConnection } = require("./database/config");
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

//Excuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});

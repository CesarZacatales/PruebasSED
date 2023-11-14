var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");
// const mongoose = require('./config/mongoose'); // Eliminado

// Asegúrate de que la conexión a MongoDB se realice en otro lugar, como en un archivo de configuración.
const { connect } = require('./config/mongoose'); // Cambia './config/db' por la ruta correcta a tu archivo de conexión de MongoDB

const apiRouter = require("./routes/api/index.router");

var app = express();

// Establece la conexión a MongoDB
connect();

app.use(cors())
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use("/api", apiRouter);

module.exports = app;

import express from "express";
import router from "./src/routers/index.router.js";
import morgan from "morgan";
import cors from "cors";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import { engine } from "express-handlebars";
import __dirname from "./utils.js";
import { createServer } from "http";
import { Server } from "socket.io";
import socket from "./src/routers/index.socket.js";




//creo el server
const server = express();
//defino el puerto en donde va a funcionar mi server
const port = 8000;
//callback que se va a ejecutar cuando se inicie el server
const ready = () => console.log("El server está en el puerto " + port);
//defino un servidor http con el metodo createServer
const httpServer = createServer(server)
//defino un servidor TCP en base al servidor HTTP
const tcpServer = new Server (httpServer)
//habilitamos el inicio de la comunicación
//con esto tengo configurado el socket del back
tcpServer.on("connection", socket)



//activo funcionabilidad de json
server.use(express.json());
//habilita la lectura de datos complejos en la url
server.use(express.urlencoded({ extended: true }));

//obligo a mi servidor a usar morgan: middleware de terceros (registro de solicitudes)
server.use(morgan("dev"));
//middleware: hago que se crucen los origenes de los puertos de back con los de front
server.use(cors());
//le aviso a mi servidor que use el motor de platillas de handlebar
server.engine("handlebars", engine());
//seteamos las propiedades
server.set("view engine", "handlebars");
//seteamos la carpeta de las vistas
server.set("views", __dirname + "/src/views");
//carpeta publica
server.use("/public", express.static("public"))


//levanto el servidor
httpServer.listen(port, ready);

server.use(router); //hace que mi servidor use las rutas del enrutador

//handlers
server.use(pathHandler); //manejar las rutas NO encontradas
server.use(errorHandler); //manejador de errores


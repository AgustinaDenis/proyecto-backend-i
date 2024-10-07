
import { Router } from "express";
import apiRouter from "./api/index.api.js";
import viewRouter from "./views/index.view.js";


const router = Router() 

router.use("/api", apiRouter)

router.use("/", viewRouter)



async function handleRequest(req, res) {
  const url = req.url; //la ruta, el endpoint
  const opts = { "Content-Type": "text/plain" }; //options //text/plain es de formato json, o sea que voy a devolver un json
  switch (url) {
    case "/":
      res.writeHead(200, opts).end("API CONNECTED");
      break
    case "/products":
      const data = await productsManager.readAll();
      res.writeHead(200, opts).end(JSON.stringify(data));
      break
    case "/products/create":
      const one = { title: "producto", price: 20000 };
      const id = await productsManager.create(one);
      return res.writeHead(201, opts).end(JSON.stringify(id));

    default:
      res.writeHead(404, opts).end("ENDPOINT NOT FOUND");
  }
}




export default router;

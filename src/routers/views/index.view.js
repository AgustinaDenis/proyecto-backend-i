import { Router } from "express";
import usersViewRouter from "./users.view.js";
import productsViewRouter from "./products.view.js";

const viewRouter = Router()

//lamo a los enrutadores
viewRouter.use("/products", productsViewRouter)
viewRouter.use("/users", usersViewRouter)
viewRouter.get("/", (req, res, next)=>{
    try {
        return res.render("index")//muestro la vista del handlebar que llame
    } catch (error) {
        return next (error)
    }
})


export default viewRouter

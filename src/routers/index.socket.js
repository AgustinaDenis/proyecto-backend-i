import usersManager from "../data/users.manager.js"

const socket =(socketP)=>{
    console.log("socket connected id: " + socketP.id)//socketP= socket parametro

    socketP.on("new user", async data=>{
        const id = await usersManager.createUser(data)
        socketP.emit("update user", id)
    })
}//maneja todas las emisiones y recepciones del socket del back

export default socket
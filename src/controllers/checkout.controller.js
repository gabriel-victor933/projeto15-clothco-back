import {db} from "../database/database.connection.js"
import { ObjectId } from "mongodb"


export async function postOrder(req,res){

    const token  = req.headers.authorization.replace("Bearer ", "")
    const products = req.body.products.sort((a,b)=>{
        if (a._id > b._id) return 1
          
        if (a._id < b._id) return -1;
         
        return 0
    })

    try{
        const user = await db.collection("users").findOne({token},{projection:{_id:true}})
        if (!user) return res.status(401).send("user not logged in");

        const productsIds = products.map((product)=>({_id: new ObjectId(product._id)}))
        const stock = await db.collection("products").find({$or: productsIds}).sort({_id: 1}).toArray()

        const order = {products:[],total:0,userId: user._id}
        const updates = []
        for(let i = 0; i < stock.length; i++ ){
            if(products[i].quantity > stock[i].quantity && products[i]._id == stock[i]._id.toString()) {
                return res.status(400).send(`unavailable item ${stock[i].title} id:${stock[i]._id}`)
            }

            const newQuantity = stock[i].quantity - products[i].quantity
            updates.push({updateOne:{filter: {_id:stock[i]._id},update:{$set: {quantity: newQuantity}}}})

            order.products.push({_id: products[i]._id, quantity: products[i].quantity, price: stock[i].price})
            order.total += products[i].quantity*stock[i].price;
        }

        await db.collection("products").bulkWrite(updates);
       
        await db.collection("orders").insertOne(order)
        
        return res.status(200).send("pedido realizado com sucesso")
    } catch(err){

        return res.status(500).send("server error")
    }
    
}

export async function getOrder(req,res){
    
    //pegar token
    //buscar id do usuario
    //buscar pedido que possua o id
    //enviar pedidos

    const token  = req.headers.authorization.replace("Bearer ", "")

    try{
        const user = await db.collection("users").findOne({token},{projection:{_id:true}})
        console.log(user._id)
        const orders = await db.collection("orders").find({userId: user._id}).toArray()

        return res.send(orders)

    } catch(err){
        return res.status(500).send("server error")
    }
}
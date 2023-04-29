import {db} from "../database/database.connection.js"
import { ObjectId } from "mongodb"


export async function getCartItem(req,res){

    const token = req.headers?.authorization.replace("Bearer ","")

    try{
        const [user] = await db.collection("users").find({token: token}).toArray()
        if (!user) return res.status(401).send("user not logged in");

        return res.status(200).send(user.cart)
    }catch(err){
        return res.status(500).send("server error")
    }
    
}

export async function postCartItem(req,res){

    const token = req.headers?.authorization.replace("Bearer ","")

    const {productId, quantity} = req.body

    if(!ObjectId.isValid(productId))return res.status(400).send("invalid product id")

    if(quantity < 1) return res.status(400).send("quantity must be greater than zero")

    try{
        const user = await db.collection("users").find({token: token})
        if (!user) return res.status(401).send("user not logged in");

        const [product] = await db.collection("products").find({_id: new ObjectId(productId)}).toArray()
        if (!product) return res.status(401).send("product not found");

        const order = {productId, quantity, title: product.title, price: product.price, img: product.img}

        await db.collection("users").updateOne({token},  { $push: {cart: order} } )

        return res.status(201).send("added to cart")

    }catch(err){

        return res.status(500).send("server error")
    }

        
}
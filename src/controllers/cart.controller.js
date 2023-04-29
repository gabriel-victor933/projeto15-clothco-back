import {db} from "../database/database.connection.js"
import { ObjectId } from "mongodb"


export async function getCartItem(req,res){

    res.send("get functionando")
}

export async function postCartItem(req,res){

    const token = req.headers?.authorization.replace("Bearer ","")

    if(!token) return res.status(401).send("missing token")

    const {productId, quantity} = req.body

    if(!ObjectId.isValid(productId))return res.status(400).send("invalid product id")

    if(quantity < 1) return res.status(400).send("quantity must be greater than zero")

    try{
        const [user] = await db.collection("users").find({token: token}).toArray()
        if (!user) return res.status(401).send("user not logged in");

        const [product] = await db.collection("products").find({_id: new ObjectId(productId)}).toArray()
        if (!product) return res.status(401).send("product not found");

        const order = {productId, quantity}

        await db.collection("users").updateOne(user,  { $push: {cart: order} } )

        return res.status(201).send("added to cart")

    }catch(err){

        return res.status(500).send("server error")
    }

        
}
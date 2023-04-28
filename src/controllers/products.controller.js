import { ObjectId } from "mongodb";
import { db } from "../database/database.connection.js";
/* const products = [
  {
    title: "Wool Creator Cap - Black",
    price: 44,
    quantity: 10,
    img: "/cap-black-front.jpg",
    imgb: "/cap-black-back.jpg",
    color: "Black",
    type: "Headwear",
    description: [
      "Made in the USA",
      "Genuine wool broadcloth, white felt 'Coursework C' icon with combined embroidery",
      "Soft visor with green satin under visor",
      "Vintage hair cloth backed buckram crown",
      "Satin taping with cotton sweatband",
      "Black leather strap and black metal press closure",
    ],
  },
  {
    title: "Life Lesson Cap - Cardinal",
    price: 40,
    quantity: 10,
    img: "/cap-orange-back.jpg",
    imgb: "/cap-orange-front.jpg",
    color: "Orange",
    type: "Headwear",
    description: [
      "The Life Lesson Cap is an unstructured 5 panel cap with an adjustable leather strap.",
      "Featuring an embroidered skateboard graphic on the frontside, a woven pencil label on the backside and printed taping on the inside.",
      "Made of 100% cotton twill.",
    ],
  },
  {
    title: "Cap Ebbets Corduroy",
    price: 48,
    quantity: 10,
    img: "/cap-pink-back.jpg",
    imgb: "/cap-pink-front.jpg",
    color: "Pink",
    type: "Headwear",
    description: [
      "Made in the USA",
      "Genuine wool broadcloth, white felt 'Coursework C' icon  with combined embroidery",
      "Soft visor with green satin under visor",
      "Vintage hair cloth backed buckram crown",
      "Satin taping with cotton sweatband",
      "Black leather strap and black metal press closure",
    ],
  },
  {
    title: "Cap Corduroy - Yellow",
    price: 48,
    quantity: 10,
    img: "/cap-yellow-back.jpg",
    imgb: "/cap-yellow-front.jpg",
    color: "Yellow",
    type: "Headwear",
    description: [
      "Made by the well-respected and renowned athletic garments company Ebbets Field Flannels.",
      "Hand-sewn from genuine wool baseball cloth.",
      "This cap is built to last a lifetime.",
    ],
  },
  {
    title: "Logo Block Hoodie (Black)",
    price: 86,
    quantity: 10,
    img: "/hoodie-black-front.jpg",
    imgb: "/hoodie-black-back.jpg",
    color: "Black",
    type: "Hoodie",
    description: [
      "Hooded sweatshirt with embroidered Logo Block design on chest.",
      "50% pre-shrunk cotton, 50% polyester.",
      "Runs true to size. Size up for a more relaxed fit.",
    ],
  },
  {
    title: "Sweater Icon Crewneck",
    price: 72,
    quantity: 10,
    img: "/hoodie-blue-front.jpg",
    imgb: "/hoodie-blue-front.jpg",
    color: "Blue",
    type: "Hoodie",
    description: [
      "100% cotton dyed knitted fabric",
      "Heavyweight feel at 14 oz.",
      "Embroidered C icon",
      "Gusset ribbing details along sides and underarms",
    ],
  },
  {
    title: "Sweater Icon Crewneck",
    price: 64,
    quantity: 10,
    img: "/hoodie-brown-front.jpg",
    imgb: "/hoodie-brown-back.jpg",
    color: "Brown",
    type: "Hoodie",
    description: [
      "Crewneck sweatshirt with Gestalt print design on front.",
      "50% cotton, 50% polyester",
      "Medium-heavy fabric (8.0 oz/yd² (271.25 g/m²))",
      "Runs true to size. Size up for a more relaxed fit.",
    ],
  },
  {
    title: "Logo Block Hoodie (Grey)",
    price: 86,
    quantity: 10,
    img: "/hoodie-grey-front.jpg",
    imgb: "/hoodie-grey-back.jpg",
    color: "Grey",
    type: "Hoodie",
    description: [
      "Hooded sweatshirt with embroidered Logo Block design on chest.",
      "50% pre-shrunk cotton, 50% polyester.",
      "Runs true to size.",
      "Size up for a more relaxed fit.",
    ],
  },
  {
    title: "Gestalt Crewneck (Forest)",
    price: 64,
    quantity: 10,
    img: "/hoodie-green-front.jpg",
    imgb: "/hoodie-green-back.jpg",
    color: "Green",
    type: "Hoodie",
    description: [
      "Crewneck sweatshirt with Gestalt print design on front.",
      "50% cotton, 50% polyester",
      "Medium-heavy fabric (8.0 oz/yd² (271.25 g/m²))",
      "Runs true to size. Size up for a more relaxed fit.",
    ],
  },
  {
    title: "Required Reading - Black",
    price: 40,
    quantity: 10,
    img: "/tshirt-black-front.jpg",
    imgb: "/tshirt-black-back.jpg",
    color: "Black",
    type: "Tee",
    description: [
      "Read some books. Learn from your masters.",
      "5.0 oz.,100% pre-shrunk combed ringspun cotton",
      "Vintage heavy wash jersey",
      "Ribbed collar",
    ],
  },
  {
    title: "Logo Block Tee (Military Green)",
    price: 37,
    quantity: 10,
    img: "/tshirt-green-front.jpg",
    imgb: "/tshirt-green-back.jpg",
    color: "Green",
    type: "Tee",
    description: ["Short-sleeve t-shirt with printed Logo Block graphic on chest.", "100% cotton."],
  },
  {
    title: "Logo Block - (Sport white)",
    price: 37,
    quantity: 10,
    img: "/tshirt-white-front.jpg",
    imgb: "/tshirt-white-back.jpg",
    color: "White",
    type: "Tee",
    description: ["Short-sleeve t-shirt with printed Logo Block graphic on chest.", "100% cotton."],
  },
]; */


export const getProducts = async (req, res) => {

  try {
    const options = {projection:{description:0,color:0,type:0,quantity:0}}

    const data = await db.collection("products").find({},options).toArray()

    res.status(200).send(data);

  }catch(err){
    res.status(500).send(err)
  }
  
};

export const getOneProduct = async (req, res) => {

  const {id} = req.params

  if(!ObjectId.isValid(id)){
    return res.status(401).send("ID inválido")
}

  try {
  
    const [data] = await db.collection("products").find({_id: new ObjectId(id)}).toArray()

    res.status(200).send(data);

  }catch(err){
    res.status(500).send(err)
  }
  
};
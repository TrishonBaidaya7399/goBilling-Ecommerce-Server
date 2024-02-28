const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require("express")
const cors = require("cors")
require("dotenv").config()
const app = express();
const port = process.env.PORT

//middlewares
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.onpbfhq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

const productsCollection = client.db("ProductsDB").collection("Products")
const cartCollection = client.db("cartDB").collection("cart")

//Get all Products
app.get("/products", async(req, res)=>{
    try {
        const result = await productsCollection.find().toArray();
        res.send(result)
    } catch (error) {
        console.error("Error Fetching Products: ", error);
        res.status(500).send("Internal server error")
    }
})


//Add Products to the cart
app.post("/cart", async(req, res)=>{
    try {
        const cartItem = req.body
        console.log("Cart Item requested to add: ",cartItem);
        const result = await cartCollection.insertOne(cartItem);
        res.send(result);
    } catch (error) {
        console.error('Error adding to the cart:', error);
        res.status(500).send('Internal Server Error');
    }
})

//Get all cart items
app.get("/cart", async(req, res)=>{
    try {
        const result= await cartCollection.find().toArray();
        res.send(result);
    } catch (error) {
        console.error("Error getting cart items: ", error);
        res.status(500).send("Internal server error")
    }
}) 
















































    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get("/", (req, res) => {
    res.send("GoBilling is online!");
  });
  
  app.listen(port, () => {
    console.log(`Live on port`, port);
  });
  
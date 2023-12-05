const express = require("express");
const server = express();
const { request, response } = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const Product = require("./Models/product"); // Importing Product model
const port = 3000;
const db_uri = "mongodb+srv://enlargedwalnut:database1234@mclarkeproject2.0f7plww.mongodb.net/Products?retryWrites=true&w=majority";// defining database to be used

server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use(cors());

// Connecting to MongoDB
mongoose.connect(db_uri).then((result) => {
    server.listen(port, () => {
        console.log(`Listening on ${port}... Connected to DB`);
    });
}).catch((error) => {
    console.log(error);
});

// Root endpoint
server.get("/", (request, response) => {
    response.send("LIVE!");
});

// Route to retrieve all products
server.get("/Products", async (request, response) => {
    const products = await Product.find();
    console.log("Retrieved products:", products);
    response.send(products);
});

// Route to add a new product to the inventory
server.post("/addProduct", async (request, response) => {
    const product = request.body;
    const postProduct = new Product({
        id: product.id,
        productName: product.productName,
        brand: product.brand,
        quantity: product.quantity,
        image: product.image,
        price: product.price
    });
    const saveProduct = await postProduct.save();
    saveProduct
        ? response.send("Product added to inventory")
        : response.send("Failed to add");
});

// Route to delete a product from the inventory
server.delete("/product/:id/:productName", async (request, response) => {
    const { id, productName } = request.params;
    const deleteProduct = await Product.deleteOne({
        _id: new mongoose.Types.ObjectId(id)
    });
    deleteProduct
        ? response.send(`${productName} has been deleted`)
        : response.send(`Product failed to delete`);
});

// Route to edit a product in the inventory
server.patch("/product/:id", async (request, response) => {
    const { id } = request.params;
    const product = request.body;
    const patchProduct = await Product.updateOne(
        { _id: new mongoose.Types.ObjectId(id) },
        { $set: product }
    );
    patchProduct
        ? response.send(`${product.productName} has been edited`)
        : response.send("Failed to edit");
});

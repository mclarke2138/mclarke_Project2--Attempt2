const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    id: {
        type: String,
        required: false,
    },
    productName: {
        type: String,
        required: false,
    },
    brand: {
        type: String,
        required: false,
    },
    quantity: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: false,
    },
    price: {
        type: String,
        required: false,
    }
},
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;

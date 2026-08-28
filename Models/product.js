const mongoose = require('mongoose');

//properties of the product
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
   quantity: {
        type: Number,
        required: true
    },
    color: {
        type: String
    },
    image: {
        type: String,
        required: false
    }                   
},
{
    timestamps: true
}
);

//create model from the schema
const Product = mongoose.model('Product', productSchema);
module.exports = Product; //export the model to be used in other files
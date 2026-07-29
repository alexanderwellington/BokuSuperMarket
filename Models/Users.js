//mongoose
const mongoose = require('mongoose');
bcrypt = require('bcryptjs');

//properties of the user
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true, 
    },
    hasAtmcard: {
        type: Boolean,
        required: true
    },
    gender: {
        type: String,
        required: true
    },  
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'user'
    },
    timestamps: true  //Date created and Date modified

}); 

//create model from the schema
const User = mongoose.model('User', userSchema);
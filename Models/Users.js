

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
        default: false
    },
    hasAdminAccess: {
        type: Boolean,
        default: false
    },
    gender: {
        type: String,
        enum: ['male', 'female',],
        required: true
    },  
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['superadmin', 'storekeeper', 'salesperson',],
        default: 'salesperson'
    },
    

},
{timestamps: true} //date and time of creation and update will be automatically added to the document

); 

//create model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User; //export the model to be used in other files
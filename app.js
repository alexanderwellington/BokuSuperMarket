require('dotenv').config(); // MUST be line 1

const express = require('express')
const connectDB = require('./Config/databaseConfig');
const productRoute = require('./Routes/ProductRoute');

const userRoute = require('./Routes/UserRoute');

const app = express();

//connect to the database
connectDB();    

//middleware to parse JSON request bodies
app.use(express.json());

//Routes
app.use('/product', productRoute);
app.use('/user', userRoute);

//define PORT with a default fallback value
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});


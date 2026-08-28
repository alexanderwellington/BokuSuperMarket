const Product = require('../Models/Product');
const cloudinary = require('../Config/cloudinary');
const sendEmail = require('../Middleware/emailsender');


// ==========================================
// CREATE PRODUCT
// ==========================================
exports.createproduct = async (req, res) => {
    try {

        // Check required fields
        if (
            !req.body.name ||
            !req.body.size ||
            !req.body.description ||
            !req.body.price ||
            !req.body.category ||
            !req.body.stock ||
            !req.body.quantity
        ) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }

        const {
            name,
            size,
            description,
            price,
            category,
            stock,
            quantity,
            color
        } = req.body;

        const newProduct = new Product({
            name,
            size,
            description,
            price,
            category,
            stock,
            quantity,
            color
        });

        await newProduct.save();

        //Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000);

        //send email notification to admin about new product creation
        
        const subject = 'New Product Created';
        const text = `A new product has been created:Here is your otp: ${otp}\n\nName: ${name}\nSize: ${size}\nDescription: ${description}\nPrice: ${price}\nCategory: ${category}\nStock: ${stock}\nQuantity: ${quantity}\nColor: ${color}`;
        await sendEmail('alexanderwellington150@proton.me', subject, text);

        res.status(201).json({
            message: 'Product created successfully',
            product: newProduct
        });

    } catch (error) {

        res.status(500).json({
            message: 'Error creating product',
            error: error.message
        });

    }
};


// ==========================================
// CREATE PRODUCT WITH IMAGE
// ==========================================
exports.createProductWithImage = async (req, res) => {
    try {

        // Check required fields
        if (
            !req.body.name ||
            !req.body.size ||
            !req.body.description ||
            !req.body.price ||
            !req.body.category ||
            !req.body.stock ||
            !req.body.quantity
        ) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }


        // Check if image exists
        if (!req.file) {
            return res.status(400).json({
                message: 'Image file is required'
            });
        }


        const {
            name,
            size,
            description,
            price,
            category,
            stock,
            quantity,
            color
        } = req.body;


        // ==========================================
        // UPLOAD IMAGE TO CLOUDINARY
        // ==========================================

        const uploadResult = await new Promise((resolve, reject) => {

            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: 'bokusupermarket',

                    transformation: [
                        {
                            width: 500,
                            height: 500,
                            crop: 'limit'
                        }
                    ]
                },

                (error, result) => {

                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }

                }
            );


            // Send image buffer to Cloudinary
            uploadStream.end(req.file.buffer);

        });


        // ==========================================
        // CREATE PRODUCT
        // ==========================================

        const newProduct = new Product({

            name,
            size,
            description,
            price,
            category,
            stock,
            quantity,
            color,

            // Store Cloudinary URL
            image: uploadResult.secure_url
        });


        await newProduct.save();

               res.status(201).json({

            message: 'Product created successfully',

            product: newProduct

        });


    } catch (error) {

        res.status(500).json({

            message: 'Error creating product with image',

            error: error.message

        });

    }
};


// ==========================================
// GET ALL PRODUCTS
// ==========================================
exports.getAllProducts = async (req, res) => {
    try {

        const products = await Product.find();

        res.status(200).json({

            message: 'Products retrieved successfully',

            products

        });

    } catch (error) {

        res.status(500).json({

            message: 'Error retrieving products',

            error: error.message

        });

    }
};


// ==========================================
// GET PRODUCT BY ID
// ==========================================
exports.getProductById = async (req, res) => {
    try {

        const { id } = req.params;

        const product = await Product.findById(id);

        if (!product) {

            return res.status(404).json({

                message: 'Product not found'

            });

        }

        res.status(200).json({

            message: 'Product retrieved successfully',

            product

        });

    } catch (error) {

        res.status(500).json({

            message: 'Error retrieving product',

            error: error.message

        });

    }
};


// ==========================================
// UPDATE PRODUCT
// ==========================================
exports.updateproduct = async (req, res) => {
    try {

        const { id } = req.params;

        const {
            name,
            size,
            description,
            price,
            category,
            stock,
            quantity,
            color
        } = req.body;


        const updatedProduct = await Product.findByIdAndUpdate(

            id,

            {
                name,
                size,
                description,
                price,
                category,
                stock,
                quantity,
                color
            },

            {
                new: true,
                runValidators: true
            }

        );


        if (!updatedProduct) {

            return res.status(404).json({

                message: 'Product not found'

            });

        }


        res.status(200).json({

            message: 'Product updated successfully',

            product: updatedProduct

        });

    } catch (error) {

        res.status(500).json({

            message: 'Error updating product',

            error: error.message

        });

    }
};


// ==========================================
// DELETE PRODUCT
// ==========================================
exports.deleteproduct = async (req, res) => {
    try {

        const { id } = req.params;

        const deletedProduct =
            await Product.findByIdAndDelete(id);


        if (!deletedProduct) {

            return res.status(404).json({

                message: 'Product not found'

            });

        }


        res.status(200).json({

            message: 'Product deleted successfully',

            product: deletedProduct

        });

    } catch (error) {

        res.status(500).json({

            message: 'Error deleting product',

            error: error.message

        });

    }
};
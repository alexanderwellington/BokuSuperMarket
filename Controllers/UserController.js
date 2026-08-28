const User = require('../Models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// ==========================================
// CREATE USER
// ==========================================
exports.createuser = async (req, res) => {
    try {

        const {
            name,
            email,
            password,
            gender,
            phone,
            hasAdminAccess,
            hasAtmcard,
            role
        } = req.body;


        // Check required fields
        if (
            !name ||
            !email ||
            !password ||
            !gender ||
            !phone
        ) {
            return res.status(400).json({
                message: 'Please provide all fields required'
            });
        }


        // Check if email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: 'Email already exists'
            });
        }


        // Check if phone number already exists
        const existingPhone = await User.findOne({ phone });

        if (existingPhone) {
            return res.status(400).json({
                message: 'Phone number already exists'
            });
        }


        // Hash password
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(
            password,
            salt
        );


        // Create new user
        const newUser = new User({

            name,
            email,
            password: hashedPassword,
            gender,
            phone,

            hasAdminAccess: hasAdminAccess || false,

            hasAtmcard: hasAtmcard || false,

            // Must match the enum in Users.js
            role: role || 'salesperson'
        });


        await newUser.save();


        res.status(201).json({

            message: 'User created successfully',

            user: newUser

        });


    } catch (error) {

        res.status(500).json({

            message: 'Error creating user',

            error: error.message

        });

    }
};



// ==========================================
// LOGIN USER
// ==========================================
exports.loginuser = async (req, res) => {
    try {

        const {
            email,
            password
        } = req.body;


        // Check email and password
        if (!email || !password) {

            return res.status(400).json({

                message: 'Email and password are required'

            });

        }


        // Find user by email
        const existingUser = await User.findOne({ email });


        if (!existingUser) {

            return res.status(400).json({

                message: 'Invalid email or password'

            });

        }


        // Compare password
        const isPasswordValid =
            await bcrypt.compare(
                password,
                existingUser.password
            );


        if (!isPasswordValid) {

            return res.status(400).json({

                message: 'Invalid email or password'

            });

        }


        // Generate JWT
        const token = jwt.sign(

            {
                id: existingUser._id,
                email: existingUser.email,
                name: existingUser.name,
                role: existingUser.role
            },

            process.env.JWT_SECRET,

            {
                expiresIn: '1h'
            }

        );


        // Login successful
        res.status(200).json({

            message: 'Login successful',

            user: {
                id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
                gender: existingUser.gender,
                phone: existingUser.phone,
                role: existingUser.role
            },

            token: token,

            role: existingUser.role

        });


    } catch (error) {

        res.status(500).json({

            message: 'Error logging in',

            error: error.message

        });

    }
};
import User from '../models/User';
import bcrypt from 'bcrypt';

const registerUser = async(req, res) => {
    try{
        const {email, password, firstName, lastName, bestFriendName} = req.body;
        if (!email || !password || !firstName || !lastName || !bestFriendName){
            res.status(400).json({
                message: 'All fields are required'
            });
        }

        const existingUser = await User.findOne({email: email});
        if (existingUser){
            res.status(409).json({
                message: 'This email is already registered'
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            bestFriendName
        });

        res.status(201).json({
            message: 'Registration successful',
            user: newUser
        });
    }
    catch (err){
        res.status(500).json({
            message: 'Registration failed',
            error: err.message
        })
    }
};


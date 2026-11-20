import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieOptions from '../utils/cookieOptions.js';

const registerUser = async(req, res) => {
    try{
        const {email, password, firstName, lastName, bestFriendName} = req.body;
        if (!email || !password || !firstName || !lastName || !bestFriendName){
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        const existingUser = await User.findOne({email: email});
        if (existingUser){
            return res.status(409).json({
                success: false,
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

        return res.status(201).json({
            success: true,
            message: 'Registration successful',
        });
    }
    catch (err){
        return res.status(500).json({
            success: false,
            message: 'Registration failed',
            error: err.message
        })
    }
};


const loginUser = async(req, res) => {
    try{
        const {email, password} = req.body;
        if (!email || !password){
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        
        const user = await User.findOne({email: email});

        if (!user){
            return res.status(401).json({
                success: false,
                message: 'Email is not registered'
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect){
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        const payload = {
            id: user._id,
            email: user.email
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRES_IN}
        );

        res.cookie("accessToken", token, {
            ...cookieOptions,
            maxAge: 7*24*60*60*1000
        });

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            user: {
                userId: user._id,
                firstName: user.firstName
            }
        });
    }
    catch (err){
        return res.status(500).json({
            success: false,
            message: 'Some unexpected error occurred',
            error: err.message
        })
    }
};

const getProfile = async(req, res) => {
    try{
        const userId = req.user.id;

        const user = await User.findById(userId);
        if (!user){
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Profile fetched successfully',
            user: {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                bestFriendName: user.bestFriendName
            }
        })
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: 'Error while fetching user profile',
            error: err.message
        })
    }
};

const logoutUser = async(req, res) => {
    res.clearCookie("accessToken", cookieOptions);

    res.status(200).json({
        success: true,
        message: "Logout Successful"
    });
};

const updateProfile = async(req, res) => {
    try{
        const userId = req.user.id;
        const {firstName, lastName, bestFriendName} = req.body;

        if (!firstName || !lastName || !bestFriendName){
            return res.status(400).json({
                success: false,
                message: 'Fields cannot be left blank'
            });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                $set: {
                    firstName: firstName,
                    lastName: lastName,
                    bestFriendName: bestFriendName
                }
            },
            {new: true, runValidators: true}
        );

        if (!updatedUser){
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'User profile updated successfully',
            user: {
                firstName: firstName,
                lastName: lastName,
                bestFriendName: bestFriendName
            }
        });
    }
    catch (err){
        res.status(500).json({
            success: false,
            message: 'Error updating profile',
            error: err.message
        })
    }
};

const changePassword = async(req, res) => {
    try{
        const {email, bestFriendName, password} = req.body;

        if (!email || !bestFriendName || !password){
            return req.status(400).json({
                success: false,
                message: 'Fields cannot be left blank'
            });
        }

        const user = await User.findOne({email: email});
        if (!user){
            return req.status(404).json({
                success: false,
                message: 'Email not registered'
            });
        }

        if (bestFriendName.trim().toLowerCase()==user.bestFriendName.trim().toLowerCase()){
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const updatedUser = await User.findByIdAndUpdate(
                user._id,
                {
                    $set: {
                        password: hashedPassword
                    }
                },
                {new: true, runValidators: true}
            );
            if (!updatedUser){
                return res.status(500).json({
                    success: false,
                    message: 'Password update failed'
                });
            }
            return res.status(200).json({
                success: true,
                message: 'Password updated successfully'
            });
        }
        else{
            return res.status(400).json({
                success: false,
                message: 'Best friend name does not match'
            });
        }
    }
    catch (err){
        res.status(500).json({
            success: false,
            message: 'Error changing password',
            error: err.message
        });
    }
};

export {
    registerUser,
    loginUser,
    getProfile,
    updateProfile,
    changePassword,
    logoutUser
};
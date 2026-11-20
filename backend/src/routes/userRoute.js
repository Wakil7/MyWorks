import express from 'express';
import {
    registerUser,
    loginUser,
    getProfile,
    updateProfile,
    changePassword,
    logoutUser
} from '../controllers/userController.js';
import {authenticate} from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authenticate, getProfile);
router.post('/update-profile', authenticate, updateProfile);
router.post('/change-password', changePassword);
router.post('/logout', logoutUser);

export default router;

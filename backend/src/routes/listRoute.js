import express from 'express';
import {
    getAllListsByUserId,
    addList,
    changeListName,
    getListById,
    deleteList
} from '../controllers/listController.js';
import {authenticate} from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', authenticate, getAllListsByUserId);
router.post('/add', authenticate, addList);
router.patch('/change-name/:listId', authenticate, changeListName);
router.get('/:listId', authenticate, getListById);
router.delete('/delete/:listId', authenticate, deleteList);

export default router;


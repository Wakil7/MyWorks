import express from 'express';
import {
    addTask,
    deleteTask,
    updateTask,
    toggleTaskCompleted
} from '../controllers/taskController.js';
import {authenticate} from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/add/:listId', authenticate, addTask);
router.delete('delete/:listId/:taskId', authenticate, deleteTask);
router.patch('/update/:taskId', authenticate, updateTask);
router.patch('toggle-completed/:taskId', authenticate, toggleTaskCompleted);

export default router;
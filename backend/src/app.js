import express from 'express';
import cors from 'cors';

import userRoute from './routes/userRoute.js';
import taskRoute from './routes/taskRoute.js';
import listRoute from './routes/listRoute.js';

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use(express.json());

app.use('/api/v1/user', userRoute);
app.use('/api/v1/tasks', taskRoute);
app.use('/api/v1/lists', listRoute);

export default app;
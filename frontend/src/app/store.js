import {configureStore} from '@reduxjs/toolkit';

import authReducer from '../features/auth/authSlice.js';
import listReducer from '../features/data/listSlice.js';
import taskReducer from '../features/data/taskSlice.js';

const store = configureStore({
    reducer: {
        auth: authReducer,
        list: listReducer,
        task: taskReducer
    }
});

export {store};
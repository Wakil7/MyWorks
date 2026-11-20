import {configureStore} from '@reduxjs/toolkit';

import authReducer from '../features/auth/authSlice.js';
// import dataReducer from '../features/data/dataSlice.js';

const store = configureStore({
    reducer: {
        auth: authReducer,
        // data: dataReducer
    }
});

export {store};
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance.js';

const getList = createAsyncThunk(
    "task/getAll",
    async({listId}, {rejectWithValue})=>{
        try{
            const response = await axiosInstance.get(`/lists/${listId}`);
            return response.data.list;
        }
        catch (err){
            return rejectWithValue(
                err.response?.data?.message || "Error fetching tasks"
            )
        };
    }
);

const addTask = createAsyncThunk(
    "task/add",
    async ({listId, name, description}, {rejectWithValue}) => {
        try{
            const response = await axiosInstance.post(`/tasks/add/${listId}`, {name, description});
            return response.data;
        }
        catch (err){
            return rejectWithValue(
                err.response?.data?.message || "Error adding task"
            );
        }
    }
);

const deleteTask = createAsyncThunk(
    "task/delete",
    async ({listId, taskId}, {rejectWithValue}) => {
        try{
            const response = await axiosInstance.delete(`/tasks/delete/${listId}/${taskId}`);
            return response.data;
        }
        catch (err){
            return rejectWithValue(
                err.response?.data?.message || "Error deleting task"
            );
        }
    }
);

const updateTask = createAsyncThunk(
    "task/update",
    async ({taskId, name, description}, {rejectWithValue}) => {
        try{
            const response = await axiosInstance.patch(`/tasks/update/${taskId}`, {name, description});
            return response.data;
        }
        catch (err){
            return rejectWithValue(
                err.response?.data?.message || "Error updating task"
            );
        }
    }
);

const toggleCompleted = createAsyncThunk(
    "task/toggleCompleted",
    async ({taskId}, {rejectWithValue}) => {
        try{
            const response = await axiosInstance.patch(`/tasks/toggle-completed/${taskId}`);
            return response.data;
        }
        catch (err){
            return rejectWithValue(
                err.response?.data?.message || "Error updating task"
            );
        }
    }
);

const taskSlice = createSlice({
    name: "task",

    initialState: {
        listId: null,
        tasks: [],
        loading: true,
        message: null,
        error: null
    },

    reducers: {
        clearData: (state)=>{
            state.listId = null;
            state.tasks = [];
            state.loading = false;
            state.error = null;
        }
    },

    extraReducers: (builder)=>{
        builder

        .addCase(getList.pending, (state)=>{
            state.loading = true;
            state.message = null;
            state.error = null;
        })

        .addCase(getList.fulfilled, (state, action)=>{
            state.loading = false;
            state.listId = action.payload._id;
            state.tasks = action.payload.tasks;
            state.error = null;
        })

        .addCase(getList.rejected, (state, action)=>{
            state.loading = false;
            state.message = null;
            state.error = action.payload;
        })

        .addCase(addTask.pending, (state, action)=>{
            state.loading = true;
            state.message = null;
            state.error = null;
        })

        .addCase(addTask.fulfilled, (state, action)=>{
            state.loading = false;
            state.tasks.push(action.payload.task);
            state.message = action.payload.message;
            state.error = null;
        })

        .addCase(addTask.rejected, (state, action)=>{
            state.loading = false;
            state.message = null;
            state.error = action.payload;
        })

        .addCase(deleteTask.pending, (state)=>{
            state.loading = true;
            state.message = null;
            state.error = null;
        })

        .addCase(deleteTask.fulfilled, (state, action)=>{
            state.loading = false;
            state.tasks = state.tasks.filter(task => task._id!==action.payload.task._id);
            state.message = action.payload.message;
            state.error = null;
        })

        .addCase(deleteTask.rejected, (state, action)=>{
            state.loading = false;
            state.message = null;
            state.error = action.payload;
        })

        .addCase(updateTask.pending, (state, action)=>{
            state.loading = true;
            state.message = null;
            state.error = null;
        })

        .addCase(updateTask.fulfilled, (state, action)=>{
            state.loading = false;
            state.tasks = state.tasks.map(task => task._id === action.payload.task._id?action.payload.task:task);
            state.message = action.payload.message;
            state.error = null;
        })

        .addCase(updateTask.rejected, (state, action)=>{
            state.loading = false;
            state.message = null;
            state.error = action.payload;
        })

        .addCase(toggleCompleted.pending, (state, action)=>{
            state.loading = true;
            state.message = null;
            state.error = null;
        })

        .addCase(toggleCompleted.fulfilled, (state, action)=>{
            state.loading = false;
            state.tasks = state.tasks.map(task => task._id===action.payload.task._id?action.payload.task:task);
            state.message = action.payload.message;
            state.error = null;
        })

        .addCase(toggleCompleted.rejected, (state, action)=>{
            state.loading=false;
            state.message = null;
            state.error = action.payload;
        })

    }
});

export const {clearData} = taskSlice.actions;

export {
    getList,
    addTask,
    deleteTask,
    updateTask,
    toggleCompleted
};

export default taskSlice.reducer;
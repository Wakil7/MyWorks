import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance.js';

const getAllLists = createAsyncThunk(
    "list/getAll",
    async(_, {rejectWithValue})=>{
        try{
            const response = await axiosInstance.get("/lists");
            return response.data;
        }
        catch(err){
            return rejectWithValue(
                err.response?.data?.message || "Error fetching lists"
            );
        }
    }
);

const addList = createAsyncThunk(
    "list/add",
    async ({name}, {rejectWithValue})=>{
        try{
            const response = await axiosInstance.post("/lists/add", {name});
            return response.data;
        }
        catch(err){
            return rejectWithValue(
                err.response?.data?.message || "Error adding list"
            );
        }
    }
);

const changeListName = createAsyncThunk(
    "list/changeName",
    async ({listId, name}, {rejectWithValue})=>{
        try{
            const response = await axiosInstance.patch(`/lists/change-name/${listId}`, {name});
            return response.data;
        }
        catch (err){
            return rejectWithValue(
                err.response?.data?.message || "Error changing list name"
            )
        }
    }
);

const deleteList = createAsyncThunk(
    "list/delete",
    async ({listId}, {rejectWithValue})=>{
        try{
            const response = await axiosInstance.delete(`/lists/delete/${listId}`);
            return response.data;
        }
        catch (err){
            return rejectWithValue(
                err.response?.data?.message || "Error deleting list"
            )
        }
    }
);

const listSlice = createSlice({
    name: "list",

    initialState: {
        lists: [],
        loading: true,
        message: null,
        error: null
    },

    reducers: {
        clearData: (state)=>{
            state.lists = [];
            state.loading = false;
            state.message = null;
            state.error = null;
        }
    },

    extraReducers: (builder)=>{
        builder

        .addCase(getAllLists.pending, (state)=>{
            state.loading = true;
            state.message = null;
            state.error = null;
        })

        .addCase(getAllLists.fulfilled, (state, action)=>{
            state.loading = false;
            state.error = null;
            state.lists = action.payload.lists;
            // state.message = action.payload.message;
        })

        .addCase(getAllLists.rejected, (state, action)=>{
            state.loading = false;
            state.message = null;
            state.error = action.payload;
        })

        .addCase(addList.pending, (state)=>{
            state.loading = true;
            state.message = null;
            state.error = null;
        })

        .addCase(addList.fulfilled, (state, action)=>{
            state.loading = false;
            state.lists.push(action.payload.list);
            state.error = null;
            state.message = action.payload.message;
        })

        .addCase(addList.rejected, (state, action)=>{
            state.loading = false;
            state.message = null;
            state.error = action.payload;
        })

        .addCase(changeListName.pending, (state)=>{
            state.loading = true;
            state.message = null;
            state.error = null;
        })

        .addCase(changeListName.fulfilled, (state, action)=>{
            state.loading = false;
            state.lists = state.lists.map(list => list._id===action.payload.list._id?action.payload.list:list);
            state.message = action.payload.message
            state.error = null;
        })

        .addCase(changeListName.rejected, (state, action)=>{
            state.loading = false;
            state.message = null;
            state.error = action.payload;
        })

        .addCase(deleteList.pending, (state)=>{
            state.loading = true;
            state.message = null;
            state.error = null;
        })

        .addCase(deleteList.fulfilled, (state, action)=>{
            state.loading = false;
            state.lists = state.lists.filter(list => list._id !== action.payload.list._id);
            state.message = action.payload.message;
            state.error = null;
        })

        .addCase(deleteList.rejected, (state, action)=>{
            state.loading = false;
            state.message = null;
            state.error = action.payload;
        })
    }
});

export const { clearData } = listSlice.actions;

export {
    getAllLists,
    addList,
    changeListName,
    deleteList
};

export default listSlice.reducer;
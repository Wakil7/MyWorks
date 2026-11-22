import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance.js';

const getAllLists = createAsyncThunk(
    "list/getAll",
    async(_, {rejectWithValue})=>{
        try{
            const response = await axiosInstance.get("/lists");
            return response.data.lists;
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
            return response.data.list;
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
            return response.data.list;
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
            return response.data.list;
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
        error: null
    },

    reducers: {
        clearData: (state)=>{
            state.lists = [];
            state.loading = false;
            state.error = null;
        }
    },

    extraReducers: (builder)=>{
        builder

        .addCase(getAllLists.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })

        .addCase(getAllLists.fulfilled, (state, action)=>{
            state.loading = false;
            state.error = null;
            state.lists = action.payload;
        })

        .addCase(getAllLists.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        .addCase(addList.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })

        .addCase(addList.fulfilled, (state, action)=>{
            state.loading = false;
            state.lists.push(action.payload);
            state.error = null;
        })

        .addCase(addList.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        .addCase(changeListName.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })

        .addCase(changeListName.fulfilled, (state, action)=>{
            state.loading = false;
            state.lists = state.lists.map(list => list._id===action.payload._id?action.payload:list);
            state.error = null;
        })

        .addCase(changeListName.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        .addCase(deleteList.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })

        .addCase(deleteList.fulfilled, (state, action)=>{
            state.loading = false;
            state.lists = state.lists.filter(list => list._id !== action.payload._id);
            state.error = null;
        })

        .addCase(deleteList.rejected, (state, action)=>{
            state.loading = false;
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
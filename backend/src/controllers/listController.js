import List from '../models/List.js';

const getAllListsByUserId = async(req, res) => {
    try{
        const userId = req.user.id;
    
        const lists = await List.find({userId: userId}, {name: 1}).lean();

        return res.status(200).json({
            success: true,
            message: 'Lists fetched successfully',
            lists: lists
        });
    }
    catch (err){
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const addList = async(req, res) => {
    try{
        const userId = req.user.id;
        const {name} = req.body;
        if (!name){
            return res.status(400).json({
                success: false,
                message:'Name is required'
            });
        }

        const newList = await List.create({
            name,
            userId
        });

        return res.status(201).json({
            success: true,
            message: 'List created successfully',
            list: {
                _id: newList._id,
                name: newList.name
            },
        });
    }
    catch (err){
        return res.status(500).json({
            success: false,
            message: 'Error adding new list',
            error: err.message
        });
    }
};

const changeListName = async(req, res) => {
    try{
        const userId = req.user.id;
        const {listId} = req.params;
        const {name} = req.body;

        if (!name){
            return res.status(400).json({
                success: false,
                message: 'Name is required'
            });
        }

        const updatedList = await List.findOneAndUpdate(
            {
                _id: listId,
                userId: userId
            },
            {
                $set: {name: name}
            },
            {
                new: true,
                runValidators: true
            }
        ).lean();

        if (!updatedList){
            return res.status(404).json({
                success: false,
                message: 'List not found or unauthorized'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'List updated successfully',
            list: {
                _id: updatedList._id,
                name: updatedList.name
            }
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

const getListById = async(req, res) => {
    try{
        const userId = req.user.id;
        const {listId} = req.params;

        const list = await List.findOne({_id: listId, userId: userId}).populate("tasks");

        return res.status(200).json({
            success: true,
            message: 'List fetched successfully',
            list: list
        });
    }
    catch (err){
        return res.status(500).json({
            success: false,
            message: 'Error fetching list',
            error: err.message
        });
    }
};

const deleteList = async(req, res) => {
    try{
        const userId = req.user.id;
        const {listId} = req.params;
        
        const list = await List.findOne({
            _id: listId,
            userId: userId
        });

        if (!list){
            return res.status(404).json({
                success: false,
                message: 'List not found or unauthorized'
            })
        }

        if (list.tasks.length>0){
            return res.status(400).json({
                success: false,
                message: 'Cannot delete this list as there are tasks inside it'
            });
        }

        await list.deleteOne();

        return res.status(200).json({
            success: true,
            message: 'List deleted succesfully',
            list: list
        });
    }
    catch (err){
        return res.status(500).json({
            success: false,
            message: 'Error deleting list',
            error: err.message
        });
    }
};

export {
    getAllListsByUserId,
    addList,
    changeListName,
    getListById,
    deleteList
};
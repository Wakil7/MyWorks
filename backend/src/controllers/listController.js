import List from '../models/List';

const getAllListsByUserId = async(req, res) => {
    try{
        const userId = req.user.id;
    
        const lists = List.find({userId: userId}).lean();

        res
        .status(200)
        .json(lists);
    }
    catch (err){
        res
        .status(500)
        .json({
            message: 'Error fetching user lists',
            error: err.message
        });
    }
};

const addList = async(req, res) => {
    try{
        const userId = req.user.id;
        const {name} = req.body;
        if (!name){
            res
            .status(400)
            .json({
                message:'Name is required'
            });
        }

        const newList = await List.create({
            name,
            userId
        });

        res
        .status(201)
        .json(newList);
    }
    catch (err){
        res
        .status(500)
        .json({
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
            res
            .status(400)
            .json({
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
            res
            .status(404)
            .json({
                message: 'List not found or unauthorized'
            })
        }

        res
        .status(200)
        .json(updatedList);
    }
    catch(err){
        res
        .status(500)
        .json({
            message: 'Error changing list name',
            error: err.message
        });
    }
}

const getListById = async(req, res) => {
    try{
        const userId = req.user.id;
        const {listId} = req.params;

        const list = List.findOne({_id: listId, userId: userId}).lean();

        res
        .status(200)
        .json(list);
    }
    catch (err){
        res
        .status(500)
        .json({
            message: 'Error fetching list',
            error: err.message
        });
    }
};

const deleteList = async(req, res) => {
    try{
        const userId = req.user.id;
        const {listId} = req.params;
        
        const list = List.findOne({
            _id: listId,
            userId: userId
        });

        if (!list){
            res
            .status(404)
            .json({
                message: 'List not found or unauthorized'
            })
        }

        if (list.tasks.length>0){
            res
            .status(400)
            .json({
                message: 'Cannot delete this list as there are tasks inside it'
            });
        }

        await list.deleteOne();

        res
        .status(200)
        .json({
            message: 'List deleted succesfully'
        });
    }
    catch (err){
        res
        .status(500)
        .json({
            message: 'Error deleting list',
            error: err.message
        });
    }
}
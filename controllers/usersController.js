const User = require('../model/User');

const getAllUsers = async (req, res) => {
    const users = await User.find();
    if (!users) return res.status(204).json({ 'message': 'No users found' });
    res.json(users);
}

const deleteUser = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ "message": 'User ID required' });
    const user = await User.findOne({ _id: req.body.id }).exec();
    if (!user) {
        return res.status(204).json({ 'message': `User ID ${req.body.id} not found` });
    }
    const result = await user.deleteOne({ _id: req.body.id });
    res.json(result);
}

const getUser = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": 'User ID required' });
    const user = await User.findOne({ _id: req.params.id }).exec();
    if (!user) {
        return res.status(204).json({ 'message': `User ID ${req.params.id} not found` });
    }
    res.json(user);
}

const updateUser = async (req, res) => {

    console.log(req?.body.user)    
 
    if (!req?.body?.user?._id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }

    User.updateOne({ _id : req.body.user._id }, 
        {"$set" : req.body.user }, function (err, docs) {
            if (err){
                console.log(err)
            }   
            else{
                console.log("Updated Docs : ", docs);
                res.json(docs);
            }
    });

}

module.exports = {
    getAllUsers,
    updateUser,
    deleteUser,
    getUser
}
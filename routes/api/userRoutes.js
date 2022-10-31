const router = require('express').Router();

const {
    getAllUsers,
    getSingleUser,
    createNewUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,    
} = require('../../controllers/userController');

router.route('/').get(getAllUsers).post(createNewUser);

router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

router.route('/:userId/friends/:friendId').post(addFriend);

router.route('/:userId/friends/:friendId').delete(removeFriend);


module.exports = router;
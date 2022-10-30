const router = require('express').Router();

const {
    getAllUsers,
    getSingleUser,
    createNewUser,
    updateUser,
    deleteUser,    
} = require('../../controllers/userController');

router.route('/').get(getAllUsers).post(createNewUser);

router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);


module.exports = router;
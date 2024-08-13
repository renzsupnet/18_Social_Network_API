const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  addFriend,
  deleteFriend
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser)
.put(updateUser);

// /api/users/:userId/friend/:friendId
router.route('/:userId/friend/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;

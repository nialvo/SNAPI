const router = require('express').Router();
const {
  getUsers,
  getUserId,
  newUser,
  updateUser,
  deleteUserId,
  addFriend,
  removeFriend,
} = require('../../controllers/users');

// <home url>/api/users
router.route('/').get(getUsers).post(newUser);
router.route('/id/:id').get(getUserId).put(updateUser).delete(deleteUserId);
router.route('/friends/:userId/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;

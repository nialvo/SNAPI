const router = require('express').Router();
const {
  getUsers,
  getUserId,
  getUserName,
  newUser,
  updateUser,
  deleteUserId,
  deleteUserName,
  addFriend,
  removeFriend,
} = require('../../controllers/users');

// <home url>/api/users
router.route('/').get(getUsers).post(newUser);
router.route('/id/:id').get(getUserId).put(updateUser).delete(deleteUserId);
router.route('/name/:name').get(getUserName).delete(deleteUserName);
router.route('/friends/:userId/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;

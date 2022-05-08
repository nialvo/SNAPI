const router = require('express').Router();
const { newReaction, deleteReaction } = require('../../controllers/reactions');

// <home url>/api/reactions
router.route('/new').post(newReaction);
router.route('/delete/:reactionId').delete(deleteReaction);

module.exports = router;

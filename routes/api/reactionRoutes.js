const router = require('express').Router();
const { newReaction, deleteReaction } = require('../../controllers/reactions');

// <home url>/api/reactions
router.route('/new/:thoughtId/:userId').post(newReaction);
router.route('/delete/:thoughtId/:reactionId').delete(deleteReaction);

module.exports = router;

const router = require('express').Router();
const { getThoughts, getThought, newThought, updateThought, deleteThought } = require('../../controllers/thoughts');

// <home url>/api/thoughts
router.route('/').get(getThoughts).post(newThought);
router.route('/:id').get(getThought).put(updateThought).delete(deleteThought);



module.exports = router;

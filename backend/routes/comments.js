const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const auth = require('../middleware/auth');

router.use(auth);

router.post('/', commentController.createComment);
router.get('/', commentController.getComments);
router.delete('/:id', commentController.deleteComment);

module.exports = router;
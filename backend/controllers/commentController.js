const Comment = require('../models/Comment');
const Task = require('../models/Task');

exports.createComment = async (req, res) => {
    try {
        const { content, taskId } = req.body;
        
        // Check if task exists
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        const comment = new Comment({
            content,
            task: taskId,
            createdBy: req.user._id
        });

        await comment.save();
        
        const populatedComment = await Comment.findById(comment._id)
            .populate('createdBy', 'name email');

        res.status(201).json({ 
            message: 'Comment added successfully', 
            comment: populatedComment 
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getComments = async (req, res) => {
    try {
        const { taskId } = req.query;

        if (!taskId) {
            return res.status(400).json({ error: 'Task ID is required' });
        }

        const comments = await Comment.find({ task: taskId })
            .populate('createdBy', 'name email')
            .sort({ createdAt: -1 });

        res.json({ comments });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findOneAndDelete({
            _id: req.params.id,
            createdBy: req.user._id
        });

        if (!comment) {
            return res.status(404).json({ error: 'Comment not found or unauthorized' });
        }

        res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
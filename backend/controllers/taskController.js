const Task = require('../models/Task');
const Project = require('../models/Project');

exports.createTask = async (req, res) => {
    try {
        const { title, project, status } = req.body;

        //  Validate input
        if (!title || !project) {
            return res.status(400).json({
                error: 'Title and project are required'
            });
        }

        //  Check project exists
        const existingProject = await Project.findById(project);
        if (!existingProject) {
            return res.status(404).json({
                error: 'Project not found'
            });
        }

        const task = await Task.create({
            title,
            project,
            status: status || 'todo',
            createdBy: req.user._id
        });

        res.status(201).json({
            message: 'Task created successfully',
            task
        });

    } catch (err) {
        console.error('CREATE TASK ERROR:', err);
        res.status(500).json({ error: err.message });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const { projectId } = req.query;
        let query = {};

        if (projectId) {
            query.project = projectId;
        }

        // Get tasks where user is assigned or created
        query.$or = [
            { assignedTo: req.user._id },
            { createdBy: req.user._id }
        ];

        const tasks = await Task.find(query)
            .populate('assignedTo', 'name email')
            .populate('createdBy', 'name email')
            .populate('project', 'name')
            .sort({ createdAt: -1 });

        res.json({ tasks });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const updates = req.body;
        updates.updatedAt = Date.now();

        const task = await Task.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true }
        )
        .populate('assignedTo', 'name email')
        .populate('createdBy', 'name email');

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json({ message: 'Task updated successfully', task });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

};

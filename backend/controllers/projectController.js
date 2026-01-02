const Project = require('../models/Project');

exports.createProject = async (req, res) => {
    try {
        const { name, description } = req.body;
        
        const project = new Project({
            name,
            description,
            createdBy: req.user._id,
            members: [req.user._id]
        });

        await project.save();
        res.status(201).json({ message: 'Project created successfully', project });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find({
            $or: [
                { createdBy: req.user._id },
                { members: req.user._id }
            ]
        })
        .populate('createdBy', 'name email')
        .populate('members', 'name email')
        .sort({ createdAt: -1 });

        res.json({ projects });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id)
            .populate('createdBy', 'name email')
            .populate('members', 'name email');

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        res.json({ project });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateProject = async (req, res) => {
    try {
        const updates = req.body;
        updates.updatedAt = Date.now();

        const project = await Project.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true }
        );

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        res.json({ message: 'Project updated successfully', project });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.addMember = async (req, res) => {
    try {
        const { userId } = req.body;
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        if (!project.members.includes(userId)) {
            project.members.push(userId);
            await project.save();
        }

        res.json({ message: 'Member added successfully', project });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
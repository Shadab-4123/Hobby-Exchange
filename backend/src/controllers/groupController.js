// controllers/groupController.js
const Group = require('../models/Group');
const User = require('../models/User');

// Create a new group
exports.createGroup = async (req, res) => {
    const { name, description, category } = req.body;
    try {
        const group = new Group({
            name,
            description,
            category,
            admin: req.user.id,
            members: [req.user.id],
        });
        await group.save();
        res.status(201).json(group);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all groups or search by category/name
exports.getAllGroups = async (req, res) => {
    const { search } = req.query;
    try {
        let query = {};
        if (search) {
            query = {
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { category: { $regex: search, $options: 'i' } },
                ],
            };
        }
        const groups = await Group.find(query).populate('admin', 'username');
        res.status(200).json(groups);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get group details
exports.getGroupDetails = async (req, res) => {
    const { groupId } = req.params;
    try {
        const group = await Group.findById(groupId)
            .populate('admin', 'username')
            .populate('members', 'username');
        if (!group)
            return res.status(404).json({ message: 'Group not found' });
        res.status(200).json(group);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Join a group
exports.joinGroup = async (req, res) => {
    const { groupId } = req.params;
    try {
        const group = await Group.findById(groupId);
        if (!group)
            return res.status(404).json({ message: 'Group not found' });

        if (!group.members.includes(req.user.id)) {
            group.members.push(req.user.id);
            await group.save();
        }
        res.status(200).json(group);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Leave a group
exports.leaveGroup = async (req, res) => {
    const { groupId } = req.params;
    try {
        const group = await Group.findById(groupId);
        if (!group)
            return res.status(404).json({ message: 'Group not found' });

        group.members = group.members.filter(member => member.toString() !== req.user.id);
        await group.save();
        res.status(200).json({ message: 'Left the group successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

import type { Response } from 'express';
import type { AuthRequest } from '../middleware/auth.js';
import { User } from '../models/User.ts';

export const getAllRegisterUsers = async (req: AuthRequest, res: Response) => {
    try {
        const q = typeof req.query.q === 'string' ? req.query.q.trim() : '';

        const filter: any = {
            role: { $ne: 'admin' } // exclude amdin
        };

        if (q) {
            filter.email = { $regex: q, $options: 'i' };
        }

        const users = await User.find(filter).select('-password');
        res.json(users);
    } catch (err) {
        console.error('Failed to fetch users:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};



export const updateUserRole = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const { role } = req.body;

        if (!['employee', 'customer'].includes(role!)) {
            return res.status(400).json({ message: 'Invalid role' });
        }

        const user = await User.findByIdAndUpdate(id, { role }, { new: true }).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        console.error('Failed to update role: ', err);
        res.status(500).json({ message: 'Internal server error' });
    }

};
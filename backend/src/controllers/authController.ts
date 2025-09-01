import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export const register = async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body;

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed, role });
    await user.save();
    
    res.status(201).json({ message: 'User registered' });
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password!))) {
        return res.status(401).json({ message: 'From server - login api: invalid credentials' });
    }

    const token = jwt.sign({ userId: user?._id, role: user?.role }, process.env.JWT_SECRET!, { expiresIn: '1h'});
    res.json({ token });
};
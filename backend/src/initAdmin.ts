// src/initAdmin.ts
import { User } from './models/User.js';
import bcrypt from 'bcryptjs';

export const ensureAdminExists = async () => {
  const existingAdmin = await User.findOne({ role: 'admin' });

  if (!existingAdmin) {
    const hashed = await bcrypt.hash('1', 10);
    await User.create({
      name: 'System Admin',
      email: 'a@qq.com',
      password: hashed,
      role: 'admin'
    });
    
    console.log('Admin user initialized');
  }
};

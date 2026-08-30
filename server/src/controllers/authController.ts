import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { users, students } from '../db/store';

const JWT_SECRET = process.env.JWT_SECRET || 'sih26044-skillbridge-secret-key-2024';

export const authController = {
  login: (req: Request, res: Response) => {
    const { email, role } = req.body;

    const user = users.find(u => u.email.toLowerCase() === (email || '').toLowerCase()) ||
                 users.find(u => u.role === role) ||
                 users[0];

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, name: user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    let studentProfile = null;
    if (user.role === 'student') {
      studentProfile = students.find(s => s.userId === user.id) || students[0];
    }

    return res.json({
      token,
      user,
      studentProfile
    });
  },

  signup: (req: Request, res: Response) => {
    const { name, email, role, collegeName, companyName, title } = req.body;

    const newUser = {
      id: `usr-${Date.now()}`,
      name: name || 'New User',
      email: email || `user${Date.now()}@skillbridge.edu`,
      role: role || 'student',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      collegeName,
      companyName,
      title
    };

    users.push(newUser);

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role, name: newUser.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(201).json({
      token,
      user: newUser
    });
  },

  getMe: (req: Request, res: Response) => {
    const role = (req.query.role as string) || 'student';
    const user = users.find(u => u.role === role) || users[0];
    const studentProfile = user.role === 'student' ? (students.find(s => s.userId === user.id) || students[0]) : null;

    return res.json({
      user,
      studentProfile
    });
  }
};

import express from 'express';
import authRoutes from './routes/authRoutes.js';
import reservationRoutes from './routes/reservationRoutes.js';
// import { authenticate } from './middleware/auth.js';
// import type { Request, Response } from 'express';
import cors from 'cors';
import adminRoutes from './routes/adminRoutes.js';
import employeeRoutes from './routes/employeeRoutes.js';

const app = express();

// app.use(cors());
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/employee/reservations', employeeRoutes);
app.use('/api/reservations', reservationRoutes);

// app.get('/api/protected', authenticate, (req: Request, res: Response) => {
//     res.json({ message: 'You are authenticated!' })
// });

export default app;

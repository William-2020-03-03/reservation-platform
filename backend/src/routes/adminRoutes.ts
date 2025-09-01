import express from 'express';
import { authenticate, verifyAdmin } from '../middleware/auth.js';
import { getAllRegisterUsers, updateUserRole } from '../controllers/adminController.js';

const router = express.Router();
router.use(authenticate);

router.get('/users', verifyAdmin, getAllRegisterUsers);
router.put('/users/:id', verifyAdmin, updateUserRole);

export default router;
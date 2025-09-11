import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { getReservations, updateReservationStatus } from '../controllers/employeeController.js';

const router = express.Router();
router.use(authenticate);

router.patch('/:id',  authorize(['employee']), updateReservationStatus);
router.get('/', authorize(['employee']), getReservations);


export default router;


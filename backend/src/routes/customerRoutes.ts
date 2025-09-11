import express from 'express';
import { createReservation, getReservationById, getReservations, updateReservation, deleteReservation, patchReservation, getReservationByUserId } from '../controllers/customerController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();
router.use(authenticate);

router.patch('/:id',  authorize(['customer']), patchReservation);
router.get('/my', authorize(['customer']), getReservationByUserId);

router.post('/', authorize(['customer', 'admin']), createReservation);
router.get('/:id', authorize(['customer', 'admin']), getReservationById);
router.get('/', authorize(['customer', 'admin']), getReservations);

router.put('/:id', authorize(['admin']), updateReservation);
router.delete('/:id', authorize(['admin']), deleteReservation);


export default router;


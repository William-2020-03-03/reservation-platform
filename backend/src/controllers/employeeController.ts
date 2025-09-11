import type { Response } from 'express';
import { Reservation } from '../models/Reservation.js';
import type { AuthRequest } from '../middleware/auth.js';

export const getReservations = async (req: AuthRequest, res: Response) => {
    try {
        const { name, email, phone, status, startDate, endDate } = req.query;
        // const filter: any = { status: { $ne: 'completed' } };
        const filter: any = { };

        if (startDate || endDate) {
            filter.date = {};
            if (startDate) {
                filter.date.$gte = startDate;
            }
            if (endDate) {
                filter.date.$lte = endDate;
            }
        } else {
            // default is one month from now
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 30);
            filter.date = { $gte: oneWeekAgo.toISOString().split('T')[0] };
        }

        if (name) filter.customerName = { $regex: name, $options: 'i' };
        if (email) filter.email = { $regex: email, $options: 'i' };
        if (phone) filter.phone = { $regex: phone, $options: 'i' };
        if (status) filter.status = status;

        const reservations = await Reservation.find(filter).sort({ date: 1 });
        res.json(reservations);
    } catch (err: any) {
        res.status(500).json({ msg: err?.message });
    }
};


export const updateReservationStatus = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const allowedStatuses = ['active', 'approved', 'canceled', 'completed'];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        const updated = await Reservation.findByIdAndUpdate(id, { status: status }, { new: true });
        if (!updated) {
            return res.status(404).json({ error: 'Reservation not found' });
        }
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: 'Canceled reservation failed.' });
    }
};

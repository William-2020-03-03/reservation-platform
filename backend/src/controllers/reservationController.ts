import type { Request, Response } from 'express';
import { Reservation } from '../models/Reservation.js';
import type { AuthRequest } from '../middleware/auth.js';
import { User } from '../models/User.ts';

export const createReservation = async (req: AuthRequest, res: Response) => {
    try {
        const reservation = new Reservation({
            ...req.body,
            customerId: req.user?.userId
        });
        await reservation.save();
        res.status(201).json(reservation);
    } catch (err) {
        res.status(400).json({
            error: "Failed to create reservation",
            details: err
        })
    }
};


export const getReservations = async (req: AuthRequest, res: Response) => {
    try {
        let reservations;
        if (req.user?.role === 'admin') {
            reservations = await Reservation.find().sort({ date: 1 });
        } else {
            // reservations = await Reservation.find({ customerId: req.user?.userId }).sort({ date: 1 });
        }

        res.json(reservations)
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch reservations' });
    }
};


export const getReservationByUserId = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.userId;

        const reservations = await Reservation.find({ customerId: userId })
            .sort({ date: 1, timeSlot: 1 }); // 按时间排序


        if (!reservations) {
            // 虽然 find 不会返回 null，但显式检查以防万一
            return res.status(404).json({ message: 'No reservations found' });
        }


        res.json(reservations);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch reservations', details: err });
    }
};

export const getReservationById = async (req: AuthRequest, res: Response) => {
    try {
        const reservation = await Reservation.findById(req.params.id);

        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }

        const isOwner = reservation.customerId.toString() === req.user?.userId;

        if (req.user?.role !== 'admin' && !isOwner) {
            return res.status(403).json({ error: 'Unauthorized access' });
        }

        res.json(reservation);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch reservation' });
    }
};

export const updateReservation = async (req: AuthRequest, res: Response) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }

        const isOwner = reservation.customerId.toString() === req.user?.userId;

        if (req.user?.role !== 'admin' && !isOwner) {
            return res.status(403).json({ error: 'Unauthorized to update this reservation' });
        }

        Object.assign(reservation, req.body);
        await reservation.save();

        res.json(reservation);
    } catch (err) {
        res.status(400).json({ error: 'Failed to update reservation' });
    }
};


export const patchReservation = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const updated = await Reservation.findByIdAndUpdate(id, { status: 'canceled' }, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: 'Canceled reservation failed.' });
    }
};


// useless currently
export const deleteReservation = async (req: AuthRequest, res: Response) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }

        const isOwner = reservation.customerId.toString() === req.user?.userId;

        if (req.user?.role !== 'admin' && !isOwner) {
            return res.status(403).json({ error: 'Unauthorized to delete this reservation' });
        }

        await reservation.deleteOne();
        res.json({ message: 'Reservation deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete reservation' });
    }
};
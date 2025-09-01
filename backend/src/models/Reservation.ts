import mongoose, { Schema, Document, Types } from "mongoose";

export interface IReservation extends Document {
    _id: Types.ObjectId;
    customerId: Types.ObjectId;
    customerName: string;
    phone: string;
    email?: string;
    date: Date;
    timeSlot: string;
    partySize: number;
    notes?: string;
    createdAt: Date;
    status: 'active' | 'canceled'; 
}

const ReservationSchema = new Schema<IReservation>({
        customerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        customerName: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String },
        date: { type: Date, required: true },
        timeSlot: { type: String, required: true }, // e.g. "18:00–19:30"
        partySize: { type: Number, required: true },
        notes: { type: String },
        createdAt: { type: Date, default: Date.now },
        status: { type: String, enum: ['active', 'canceled'], default: 'active' }
    },
    {
        timestamps: true
    }
);


export const Reservation = mongoose.model<IReservation>('Reservation', ReservationSchema);
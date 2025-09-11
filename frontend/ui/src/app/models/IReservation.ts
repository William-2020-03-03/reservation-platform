export interface Reservation {
  _id?: string;
  customerId?: string;
  customerName: string;
  phone: string;
  email?: string;
  date: string;
  timeSlot: string;
  partySize: number;
  notes?: string;
  status?: 'active' | 'canceled' | 'completed' | 'approved';
  createdAt?: string;
}

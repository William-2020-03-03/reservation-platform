export interface IReservation {
  _id: string;
  userId: string; // 对应 IUser._id
  resourceId: string; // 可扩展为房间、座位等
  startTime: string; // ISO 日期时间
  endTime: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

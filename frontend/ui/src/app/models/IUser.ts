export interface IUser {
  _id: string; // MongoDB ObjectId
  email: string;
  passwordHash?: string; // 可选，仅用于服务端
  name: string;
  role: 'customer' | 'admin';
  createdAt: string; // ISO 日期字符串
  updatedAt?: string;
}

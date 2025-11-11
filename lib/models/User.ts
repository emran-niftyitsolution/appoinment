import clientPromise from '../mongodb';
import bcrypt from 'bcryptjs';

export interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  userType: 'patient' | 'doctor';
  createdAt?: Date;
  updatedAt?: Date;
}

export async function createUser(userData: Omit<User, '_id' | 'createdAt' | 'updatedAt'>): Promise<User> {
  const client = await clientPromise;
  const db = client.db();
  const users = db.collection<User>('users');

  // Check if user already exists
  const existingUser = await users.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const newUser: Omit<User, '_id'> = {
    ...userData,
    password: hashedPassword,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await users.insertOne(newUser as any);
  
  // Return user without password
  const user = await users.findOne({ _id: result.insertedId });
  if (!user) {
    throw new Error('Failed to create user');
  }

  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword as User;
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const client = await clientPromise;
  const db = client.db();
  const users = db.collection<User>('users');
  
  return await users.findOne({ email });
}

export async function verifyPassword(
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

export async function updateUserPassword(
  email: string,
  newPassword: string
): Promise<void> {
  const client = await clientPromise;
  const db = client.db();
  const users = db.collection<User>('users');
  
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await users.updateOne(
    { email },
    { $set: { password: hashedPassword, updatedAt: new Date() } }
  );
}


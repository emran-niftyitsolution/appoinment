import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";
import clientPromise from "../mongodb";

import { Specialty, WorkHistory } from "../../app/data/types";

export interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  userType: "patient" | "doctor";
  designation?: string;
  institute?: string;
  // Doctor-specific fields
  bio?: string;
  specialty?: string;
  otherSpecialties?: string[];
  startedWorking?: string; // ISO date string
  experience?: number; // Kept for backward compatibility
  licenseNumber?: string;
  image?: string;
  location?: string;
  price?: string;
  rating?: number;
  reviews?: number;
  available?: boolean;
  education?: Array<{
    institute: string;
    degree: string;
    passingYear: number;
    location: string;
    additionalInfo?: string;
  }>;
  workHistory?: WorkHistory[];
  specialties?: Specialty[];
  languages?: string[];
  workingHours?: {
    day: string;
    slots: { startTime: string; endTime: string }[];
  }[];
  // Practice information
  clinicName?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  consultationFee?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export async function createUser(
  userData: Omit<User, "_id" | "createdAt" | "updatedAt">
): Promise<User> {
  const client = await clientPromise;
  const db = client.db();
  const users = db.collection<User>("users");

  // Check if user already exists
  const existingUser = await users.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const newUser: Omit<User, "_id"> = {
    ...userData,
    password: hashedPassword,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await users.insertOne(newUser as any);

  // Return user without password
  const user = await users.findOne({ _id: result.insertedId });
  if (!user) {
    throw new Error("Failed to create user");
  }

  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword as User;
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const client = await clientPromise;
  const db = client.db();
  const users = db.collection<User>("users");

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
  const users = db.collection<User>("users");

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await users.updateOne(
    { email },
    { $set: { password: hashedPassword, updatedAt: new Date() } }
  );
}

export async function updateUserProfile(
  userId: string,
  profileData: Partial<
    Omit<User, "_id" | "password" | "email" | "createdAt" | "updatedAt">
  >
): Promise<User | null> {
  const client = await clientPromise;
  const db = client.db();
  const users = db.collection<User>("users");

  const updateData = {
    ...profileData,
    updatedAt: new Date(),
  };

  const result = await users.findOneAndUpdate(
    { _id: new ObjectId(userId) },
    { $set: updateData },
    { returnDocument: "after" }
  );

  if (!result) {
    return null;
  }

  const { password, ...userWithoutPassword } = result;
  return userWithoutPassword as User;
}

export async function findUserById(userId: string): Promise<User | null> {
  const client = await clientPromise;
  const db = client.db();
  const users = db.collection<User>("users");

  const user = await users.findOne({ _id: new ObjectId(userId) });
  return user;
}

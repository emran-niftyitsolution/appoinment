import { cookies } from 'next/headers';
import { verifyToken } from './auth';
import { findUserByEmail } from './models/User';

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return null;
  }

  const payload = verifyToken(token);
  if (!payload) {
    return null;
  }

  const user = await findUserByEmail(payload.email);
  if (!user) {
    return null;
  }

  return {
    user: {
      _id: user._id!,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      userType: user.userType,
    },
  };
}

export async function verifySession() {
  const session = await getSession();
  if (!session) {
    return null;
  }
  return session;
}


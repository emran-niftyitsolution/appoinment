# Authentication Setup Guide

This project includes a complete authentication system using Next.js API routes and MongoDB.

## Prerequisites

1. MongoDB installed locally or MongoDB Atlas account
2. Node.js and npm installed

## Setup Instructions

### 1. Install Dependencies

Dependencies are already installed. If you need to reinstall:

```bash
npm install
```

### 2. Configure Environment Variables

1. Copy the example environment file:
```bash
cp .env.local.example .env.local
```

2. Edit `.env.local` and add your MongoDB connection string:

```env
MONGODB_URI=mongodb://localhost:27017/doctorfind
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/doctorfind

JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NEXTAUTH_URL=http://localhost:3000
```

**Important**: 
- Generate a strong random string for `JWT_SECRET` in production
- Never commit `.env.local` to version control

### 3. Start MongoDB

**Local MongoDB:**
```bash
# macOS (using Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
# Start MongoDB service from Services panel
```

**MongoDB Atlas:**
- Use the connection string provided by MongoDB Atlas
- Make sure your IP is whitelisted

### 4. Run the Development Server

```bash
npm run dev
```

## API Endpoints

### POST `/api/auth/signup`
Create a new user account.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "password": "password123",
  "userType": "patient" // or "doctor"
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "user": {
    "_id": "...",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "userType": "patient"
  }
}
```

### POST `/api/auth/login`
Login with email and password.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "user": {
    "_id": "...",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "userType": "patient"
  }
}
```

### POST `/api/auth/logout`
Logout the current user (clears the authentication cookie).

### POST `/api/auth/forgot-password`
Request a password reset (currently returns a success message).

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

### GET `/api/auth/me`
Get the current authenticated user's information.

**Response:**
```json
{
  "user": {
    "_id": "...",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "userType": "patient"
  }
}
```

## Authentication Flow

1. **Signup**: User creates an account → JWT token is generated and stored in HTTP-only cookie
2. **Login**: User logs in → JWT token is generated and stored in HTTP-only cookie
3. **Protected Routes**: Token is automatically sent with requests via cookie
4. **Logout**: Cookie is cleared

## Security Features

- Passwords are hashed using bcrypt (10 rounds)
- JWT tokens are stored in HTTP-only cookies (prevents XSS attacks)
- Tokens expire after 7 days
- Email validation
- Password minimum length validation (8 characters)

## Database Schema

### Users Collection

```typescript
{
  _id: ObjectId,
  firstName: string,
  lastName: string,
  email: string (unique, lowercase),
  phone: string,
  password: string (hashed),
  userType: "patient" | "doctor",
  createdAt: Date,
  updatedAt: Date
}
```

## Next Steps

1. **Email Integration**: Add email service (SendGrid, Resend, Nodemailer) for password reset
2. **Email Verification**: Add email verification on signup
3. **Rate Limiting**: Add rate limiting to prevent brute force attacks
4. **Session Management**: Implement refresh tokens for better security
5. **Password Reset Tokens**: Implement proper password reset with tokens

## Troubleshooting

### MongoDB Connection Issues

- Check if MongoDB is running: `mongosh` or `mongo`
- Verify connection string in `.env.local`
- Check firewall settings for MongoDB Atlas

### Authentication Not Working

- Check browser console for errors
- Verify JWT_SECRET is set in `.env.local`
- Check MongoDB connection
- Verify cookies are being set (check browser DevTools → Application → Cookies)


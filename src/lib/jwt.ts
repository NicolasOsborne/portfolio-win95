import jwt from 'jsonwebtoken'

if (!process.env.JWT_SECRET) {
  throw new Error('Missing JWT_SECRET in environment variables')
}

export const JWT_SECRET = process.env.JWT_SECRET

export type JWTPayload = {
  sub: string
  username: string
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET!) as JWTPayload
  } catch (err) {
    return null
  }
}

// src/app/api/auth/login/route.ts
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import users from '@/../data/users'
import { User } from '@/types/userType'

const JWT_EXPIRATION = '1h'

if (!process.env.JWT_SECRET) {
  throw new Error('Missing JWT_SECRET in environment variables')
}

function sanitizeUser(u: { id: string; username: string }) {
  return { id: u.id, username: u.username }
}

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json(
        { message: 'Missing credentials' },
        { status: 400 }
      )
    }

    const found = users.find(
      (u) => u.username.toLowerCase() === String(username).toLowerCase()
    )

    if (!found) {
      return NextResponse.json(
        { message: 'Invalid credentials', success: false },
        { status: 401 }
      )
    }

    const passwordMatches = bcrypt.compareSync(password, found.passwordHash)

    if (!passwordMatches) {
      return NextResponse.json(
        { message: 'Invalid credentials', success: false },
        { status: 401 }
      )
    }

    const payload = {
      sub: found.id,
      username: found.username,
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: JWT_EXPIRATION,
    })

    const safeUser: User = sanitizeUser(found)

    return NextResponse.json(
      { user: safeUser, token, success: true },
      { status: 200 }
    )
  } catch (error) {
    console.error('Login API error:', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

if (!process.env.JWT_SECRET) {
  throw new Error('Missing JWT_SECRET in environment variables')
}

export async function GET(request: Request) {
  try {
    const auth = request.headers.get('authorization') || ''
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : null

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET as string)
    return NextResponse.json({ authenticated: true, payload }, { status: 200 })
  } catch (e) {
    return NextResponse.json(
      { authenticated: false, error: String(e) },
      { status: 401 }
    )
  }
}

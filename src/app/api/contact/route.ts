import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/jwt'

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, error: 'Missing token' },
        { status: 401 }
      )
    }

    const token = authHeader.split(' ')[1]
    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired token' },
        { status: 401 }
      )
    }

    const { name, email, message } = await req.json()
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Missing fields' },
        { status: 400 }
      )
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address' },
        { status: 400 }
      )
    }

    console.log(`[Contact] Message from ${payload.username}:`)
    console.log('Name:', name)
    console.log('Email:', email)
    console.log('Message:', message)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Error in /api/contact:', err)
    return NextResponse.json(
      { success: false, error: 'Unexpected server error' },
      { status: 500 }
    )
  }
}

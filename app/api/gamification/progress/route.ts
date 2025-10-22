import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import { getUserFromCookie } from '@/lib/auth'
import { achievementSystem } from '@/lib/gamification/achievements'

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase()
    const claims = getUserFromCookie<{ userId: string }>()
    if (!claims) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const progress = await achievementSystem.getUserProgress(claims.userId)

    return NextResponse.json({ progress })
  } catch (error) {
    console.error('Error fetching progress:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

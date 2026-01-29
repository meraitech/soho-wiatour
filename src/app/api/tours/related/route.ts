import { NextResponse } from 'next/server'

import { TourService } from '@/features/tours/services'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const currentTourId = searchParams.get('currentTourId') ?? ''
  const limitParam = searchParams.get('limit')
  const parsedLimit = limitParam ? Number(limitParam) : 6
  const limit = Number.isFinite(parsedLimit) ? Math.min(Math.max(parsedLimit, 1), 20) : 6

  const tours = await TourService.getRelated(currentTourId, limit)

  return NextResponse.json({ tours })
}

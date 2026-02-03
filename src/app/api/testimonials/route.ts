import { NextResponse } from 'next/server'

import { TestimonialService } from '@/features/testimonials/services/testimonial.service'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const limitParam = searchParams.get('limit')
  const parsedLimit = limitParam ? Number(limitParam) : 10
  const limit = Number.isFinite(parsedLimit) ? Math.min(Math.max(parsedLimit, 1), 50) : 10

  try {
    const testimonials = await TestimonialService.getPublished(limit)
    return NextResponse.json({ testimonials })
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return NextResponse.json(
      { error: 'Failed to fetch testimonials', testimonials: [] },
      { status: 500 }
    )
  }
}

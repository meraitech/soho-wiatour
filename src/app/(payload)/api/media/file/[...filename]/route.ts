import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ filename: string[] }> }
) {
  const { filename } = await params
  const filenamePath = filename.join('/')

  const r2PublicUrl = process.env.R2_PUBLIC_URL
  if (!r2PublicUrl) {
    return NextResponse.json(
      { error: 'R2 not configured' },
      { status: 500 }
    )
  }

  // If it's already a size variant, redirect directly to R2
  if (filenamePath.includes('-400x300.webp') || filenamePath.includes('-768x512.webp') || filenamePath.includes('-1920x1080.webp')) {
    return NextResponse.redirect(`${r2PublicUrl}/${filenamePath}`, 307)
  }

  // If it's the original file (no size suffix), serve directly from R2
  // Original files are now stored in R2 with their original format
  return NextResponse.redirect(`${r2PublicUrl}/${filenamePath}`, 307)
}

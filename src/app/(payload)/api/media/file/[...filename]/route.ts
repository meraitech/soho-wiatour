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

  try {
    const r2Response = await fetch(`${r2PublicUrl}/${filenamePath}`)

    if (!r2Response.ok) {
      return NextResponse.json({ error: 'File not found' }, { status: r2Response.status })
    }

    const contentType = r2Response.headers.get('Content-Type') || 'image/webp'
    return new Response(r2Response.body, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch file' }, { status: 500 })
  }
}

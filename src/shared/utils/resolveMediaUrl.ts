export function resolveMediaUrl(src?: string | null) {
    if (!src) return ''

    // Replace localhost media URLs with R2 public URL
    if (src.includes('localhost:3000/api/media/file/')) {
        const filename = src.split('localhost:3000/api/media/file/')[1]
        const r2PublicUrl = process.env.R2_PUBLIC_URL || ''
        if (r2PublicUrl && filename) {
            return `${r2PublicUrl}/${filename}`
        }
        // Fallback to site URL if R2 not configured
        const base = process.env.NEXT_PUBLIC_SITE_URL || ''
        return base ? `${base}/api/media/file/${filename}` : src
    }

    // Sudah absolute
    if (src.startsWith('http')) return src

    // Relative path
    const base =
        process.env.NEXT_PUBLIC_MEDIA_BASE_URL ||
        process.env.NEXT_PUBLIC_SITE_URL ||
        ''

    return `${base}${src}`
}

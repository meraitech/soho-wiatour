export function resolveMediaUrl(src?: string | null) {
    if (!src) return ''

    // Sudah absolute
    if (src.startsWith('http')) return src

    // Tentukan origin
    const base =
        process.env.NEXT_PUBLIC_MEDIA_BASE_URL ||
        process.env.NEXT_PUBLIC_SITE_URL ||
        ''

    return `${base}${src}`
}

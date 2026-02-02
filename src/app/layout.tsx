import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | Wiatour',
    default: 'Tour Murah & Paket Wisata Hemat',
  },
  description:
    'Cari tour murah? Wiatour menyediakan paket wisata murah, open trip hemat, dan private tour terjangkau ke destinasi favorit Indonesia.',
  metadataBase: new URL('https://wiatour.com'),
}

import { Tour as PayloadTour, Media } from "@/payload-types";

/**
* Extended Tour dengan relations populated
*/
export interface Tour extends Omit<
  PayloadTour,
  'thumbnail' | 'heroImage' | 'travelDetails' | 'itineraries' | 'gallery' | 'relatedTours'
> {
  thumbnail: Media
  heroImage: Media
  travelDetails?: Array<{
    image: Media
    description: any // Rich Text
    id?: string
  }>
  itineraries?: Array<{
    day: number
    activityName: string
    icon: Media
    thumbnail: Media
    description: string
    id?: string
  }>
  gallery?: Array<{
    image: Media
    id?: string
  }>
  relatedTours?: Tour[]
}

/**
* Simplified type untuk list page (tidak perlu semua data)
*/
export interface TourSummary {
  id: string
  title: string
  slug: string
  thumbnail: Media
  description: string
  status: 'draft' | 'published'
  createdAt: string
}


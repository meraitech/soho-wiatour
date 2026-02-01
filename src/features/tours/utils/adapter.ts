import { Tour } from '../types'

export function mapTourToHighlight(tours: Tour[]) {
    return tours.map((tour) => ({
        slug: tour.slug,
        title: tour.title,
        imgUrl: tour.thumbnail?.url ?? '',
        imgAlt: tour.thumbnail?.alt ?? tour.title,
    }))
}

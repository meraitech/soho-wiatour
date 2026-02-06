import type { Tour } from "@/features/tours/types";

export function touristTripSchema(tour: Tour) {
    return {
        "@context": "https://schema.org",
        "@type": "TouristTrip",
        name: tour.title,
        description: tour.description,
        image: tour.heroImage.url,
    };
}

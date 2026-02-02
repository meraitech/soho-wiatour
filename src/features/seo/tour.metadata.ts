import { createMetadata } from "./createMetadata";
import type { Tour } from "@/features/tours/types";

export function createTourMetadata(tour: Tour) {
    return createMetadata({
        title: tour.title,
        description: tour.description,
        url: `https://wiatour.com/tours/${tour.slug}`,
        image: tour.heroImage.url!,
    });
}

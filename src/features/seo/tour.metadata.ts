import { createMetadata } from "./createMetadata";
import type { Tour } from "@/features/tours/types";

export function createTourMetadata(tour: Tour) {
    const image = tour.heroImage?.url!;

    return createMetadata({
        title: `${tour.title} Murah & Hemat`,
        description:
            `Dapatkan paket tour ${tour.title} dengan harga terbaik dari Indonesia. ` +
            tour.description,

        path: `/tours/${tour.slug}`,

        image,

        keywords: [
            "tour murah",
            `${tour.title} murah`,
            `${tour.title} tour`,
            "travel hemat",
            "paket wisata budget",
        ],
    });
}

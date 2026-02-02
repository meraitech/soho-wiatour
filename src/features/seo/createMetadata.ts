import type { Metadata } from "next";
import { DEFAULT_SEO } from "./defaults";

type CreateMetadataParams = {
    title: string;
    description: string;
    url: string;
    image?: string;
};

export function createMetadata({
    title,
    description,
    url,
    image,
}: CreateMetadataParams): Metadata {
    return {
        ...DEFAULT_SEO,
        title,
        description,
        alternates: {
            canonical: url,
        },
        openGraph: {
            ...DEFAULT_SEO.openGraph,
            title,
            description,
            url,
            images: image
                ? [{ url: image, width: 1200, height: 630 }]
                : undefined,
        },
        twitter: {
            ...DEFAULT_SEO.twitter,
            title,
            description,
            images: image ? [image] : undefined,
        },
    };
}

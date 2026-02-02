import { TourService } from "@/features/tours/services";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const tours = await TourService.getAll();

  return [
    {
      url: "https://wiatour.com",
      lastModified: new Date(),
    },
    {
      url: "https://wiatour.com/tours",
      lastModified: new Date(),
    },
    ...tours.map((tour) => ({
      url: `https://wiatour.com/tours/${tour.slug}`,
      lastModified: new Date(tour.createdAt),
    })),
  ];
}

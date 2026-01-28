import { getPayloadHMR } from "@payloadcms/next/utilities";
import configPromise from '@payload-config';
import { Testimonial, TestimonialSummary } from "../types";

export class TestimonialService {
  private static async getPayload() {
    return getPayloadHMR({ config: configPromise })
  }

  static async getAll(): Promise<TestimonialSummary[]> {
    const payload = await this.getPayload()

    const result = await payload.find({
      collection: 'testimonials',
      select: {
        id: true,
        name: true,
        quotes: true,
        image: true,
        status: true,
        createdAt: true,
      },
      where: {
        status: { equals: 'published' }
      },
      sort: '-createdAt',
    })

    return result.docs as TestimonialSummary[]
  }

  static async getPublished(limit?: number): Promise<Testimonial[]> {
    const payload = await this.getPayload()

    const result = await payload.find({
      collection: 'testimonials',
      where: {
        status: { equals: 'published' }
      },
      sort: '-createdAt',
      limit: limit || 10,
      depth: 1,
    })

    return result.docs as Testimonial[]
  }

  static async getById(id: string): Promise<Testimonial | null> {
    const payload = await this.getPayload()

    try {
      const testimonial = await payload.findByID({
        collection: 'testimonials',
        id,
        depth: 1
      })

      return testimonial as Testimonial
    } catch {
      return null
    }
  }

  static async getCount(): Promise<number> {
    const payload = await this.getPayload()

    const result = await payload.find({
      collection: 'testimonials',
      where: {
        status: { equals: 'published' },
      },
      limit: 0,
    })

    return result.totalDocs
  }
}

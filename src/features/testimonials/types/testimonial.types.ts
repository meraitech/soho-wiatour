import { Testimonial as PayloadTestimonial, Media } from "@/payload-types";

/**
* Extended Testimonial dengan relations populated
*/
export interface Testimonial extends Omit<PayloadTestimonial, 'image'> {
  image: Media
}

/**
* Simplified type untuk list view
*/
export interface TestimonialSummary {
  id: string
  name: string
  quotes: string
  image: Media
  status: 'draft' | 'published'
  createdAt: string
}

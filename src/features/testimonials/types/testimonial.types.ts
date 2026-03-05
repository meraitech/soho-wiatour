import { Testimonial as PayloadTestimonial, Media } from "@/payload-types";

/**
* Extended Testimonial dengan relations populated
*/
export interface Testimonial extends Omit<PayloadTestimonial, 'image'> {
  image?: Media | null
}

/**
* Simplified type untuk list view
*/
export interface TestimonialSummary {
  id: string
  name: string
  quotes: string
  image?: Media | null
  status: 'draft' | 'published'
  createdAt: string
}

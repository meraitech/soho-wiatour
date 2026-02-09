import { Testimonial } from '../types/testimonial'
import { STYLE_ROUNDED_CARD } from '@/shared/constants/style/rounded'
import { BaseImage } from '@/shared/components/ui/BaseImage'

export const TestimonialCard = ({ item }: { item: Testimonial }) => {
  return (
    <div
      className={
        'lg:w-100 md:w-80 w-70 flex flex-col gap-8 py-6 px-8 border border-border ' +
        STYLE_ROUNDED_CARD
      }
    >
      <blockquote className="flex lg:text-2xl md:text-lg">{'"' + item.quotes + '"'}</blockquote>
      <div className="flex items-end justify-between">
        <span className="font-medium md:text-lg text-sm">{item.name}</span>
        <BaseImage
          src={item.imgUrl}
          alt={item.name + ' Profile'}
          className="md:h-7 h-5 w-auto"
          width={1280}
          height={800}
          loading="lazy"
        />
      </div>
    </div>
  )
}

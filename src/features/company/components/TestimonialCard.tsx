import { Testimonial } from '../types/testimonial'
import { STYLE_ROUNDED_CARD } from '@/shared/constants/style/rounded'
import { BaseImage } from '@/shared/components/ui/BaseImage'

export const TestimonialCard = ({ item }: { item: Testimonial }) => {
  return (
    <div
      className={
        'lg:w-100 md:w-80 w-70 flex flex-col justify-between gap-8 py-6 px-8 border border-border relative overflow-hidden ' +
        STYLE_ROUNDED_CARD
      }
    >
      <blockquote className="flex lg:text-xl md:text-lg max-sm:text-sm z-1">
        {'"' + item.quotes + '"'}
      </blockquote>
      <div className="flex items-end justify-between z-1">
        <span className="font-medium lg:text-lg text-sm">{item.name}</span>
      </div>
      {item.imgUrl ? (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 h-2/3 aspect-square z-0 translate-x-1/3">
          <BaseImage
            src={item.imgUrl}
            alt={item.name + ' Profile'}
            className="object-contain opacity-40"
            fill
            loading="lazy"
          />
        </div>
      ) : null}
    </div>
  )
}

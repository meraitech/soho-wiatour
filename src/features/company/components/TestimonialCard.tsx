import { Testimonial } from '../types/testimonial'
import { STYLE_ROUNDED_CARD } from '@/shared/constants/style/rounded'
import { BaseImage } from '@/shared/components/ui/BaseImage'

export const TestimonialCard = ({ item }: { item: Testimonial }) => {
  return (
    <div
      className={
        'lg:w-100 md:w-80 w-70 flex flex-col gap-4 md:py-4 py-6 md:px-8 px-6 border border-border/50 relative overflow-hidden bg-surface ' +
        STYLE_ROUNDED_CARD
      }
    >
      <div className="flex items-center gap-3">
        <div className="aspect-square relative w-12 h-12 shrink-0 rounded-full overflow-hidden border border-border bg-white">
          <BaseImage
            src={item.imgUrl!}
            alt={item.name + ' Profile'}
            className="object-cover w-full h-full"
            fill
            loading="lazy"
          />
        </div>
        <div className="flex flex-col">
          <span className="font-medium max-md:text-sm">{item.name}</span>
          <span className="md:text-sm text-xs text-muted-foreground">
            {item.imgUrl ? 'Perusahaan' : 'Pribadi'}
          </span>
        </div>
      </div>
      <blockquote className="flex max-md:text-sm">{item.quotes}</blockquote>
    </div>
  )
}

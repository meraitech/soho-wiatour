import { TitleSmallWithIcon } from '@/shared/components/ui/TitleSmallWithIcon'
import { TypographyH3 } from '@/shared/components/ui/TypographyH3'
import { TypographyP } from '@/shared/components/ui/TypographyP'
import { faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons'

export const ServiceCard = ({
  title_small,
  title,
  paragraph,
  image,
  isLast,
}: {
  title_small: string
  title: string
  paragraph: string
  image: string
  isLast: boolean
}) => {
  return (
    <div
      className={`service-step flex flex-col w-full max-md:order-1 md:max-w-100 gap-4 ${!isLast && 'md:h-screen'}`}
    >
      <TitleSmallWithIcon text={title_small} icon={faWandMagicSparkles} />

      <TypographyH3 className="mb-2">{title}</TypographyH3>
      <TypographyP>{paragraph}</TypographyP>

      <div className="md:hidden w-full aspect-4/3  rounded-2xl overflow-hidden bg-muted mt-4">
        <img src={image} alt={title + ' Image'} className="w-full h-full object-cover" />
      </div>
    </div>
  )
}

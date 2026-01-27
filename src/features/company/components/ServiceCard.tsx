import { TitleSmallWithIcon } from '@/shared/components/ui/TitleSmallWithIcon'
import { TypographyH3 } from '@/shared/components/ui/TypographyH3'
import { TypographyP } from '@/shared/components/ui/TypographyP'
import { faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons'

export const ServiceCard = ({
  title_small,
  title,
  paragraph,
  isLast,
}: {
  title_small: string
  title: string
  paragraph: string
  isLast: boolean
}) => {
  return (
    <div
      className={`service-step flex flex-col w-full max-md:order-1 md:max-w-100 gap-4 ${!isLast && 'h-screen'}`}
    >
      <TitleSmallWithIcon text={title_small} icon={faWandMagicSparkles} />

      <TypographyH3 className="mb-2">{title}</TypographyH3>
      <TypographyP>{paragraph}</TypographyP>
    </div>
  )
}

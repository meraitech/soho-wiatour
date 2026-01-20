import { TitleSmallWithIcon } from '@/shared/components/ui/TitleSmallWithIcon'
import { TypographyH3 } from '@/shared/components/ui/TypographyH3'
import { TypographyP } from '@/shared/components/ui/TypographyP'
import { faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons'

export const ServiceComponent = ({
  title_small,
  title,
  paragraph,
}: {
  title_small: string
  title: string
  paragraph: string
}) => {
  return (
    <div className="w-full grid md:grid-cols-2 gap-8">
      {/* left  */}
      <div className="bg-muted border md:max-w-120 max-md:order-2">
        <img
          src="/brand/logo-mark.svg"
          alt=""
          className="object-cover md:aspect-square aspect-4/3 duration-300"
        />
      </div>

      {/* right  */}
      <section className="flex items-center justify-end ">
        <div className="flex flex-col w-full max-md:order-1 md:max-w-100 gap-4">
          <TitleSmallWithIcon text={title_small} icon={faWandMagicSparkles} />

          <TypographyH3 className="mb-2">{title}</TypographyH3>
          <TypographyP>{paragraph}</TypographyP>
        </div>
      </section>
    </div>
  )
}

import React from 'react'
import { TypographyH2 } from './ui/TypographyH2'

export const HeaderSection = ({ titleSmall, title }: { titleSmall: string; title: string }) => {
  return (
    <div className="max-w-2xl mx-auto text-center flex flex-col gap-6">
      <span className="md:text-xl text-lg">{titleSmall}</span>
      <TypographyH2>{title}</TypographyH2>
    </div>
  )
}

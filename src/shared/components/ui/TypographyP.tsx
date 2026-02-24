import React from 'react'

type TypographyPProps = React.HTMLAttributes<HTMLParagraphElement>

export const TypographyP = ({ children, className, ...props }: TypographyPProps) => {
  return (
    <p {...props} className={'lg:text-lg max-md:text-sm text-base text-paragraph ' + className}>
      {children}
    </p>
  )
}

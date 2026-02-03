import React from 'react'

type TypographyPProps = React.HTMLAttributes<HTMLParagraphElement>

export const TypographyP = ({ children, className, ...props }: TypographyPProps) => {
  return (
    <p {...props} className={'md:text-lg text-base text-paragraph ' + className}>
      {children}
    </p>
  )
}

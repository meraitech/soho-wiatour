import React from 'react'

type TypographyH2Props = React.HTMLAttributes<HTMLHeadingElement>

export const TypographyH2 = ({ children, className, ...props }: TypographyH2Props) => {
  return (
    <h2 {...props} className={'lg:text-6xl md:text-5xl text-4xl  font-medium ' + className}>
      {children}
    </h2>
  )
}

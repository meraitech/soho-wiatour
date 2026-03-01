import React from 'react'

type TypographyH2Props = React.HTMLAttributes<HTMLHeadingElement>

export const TypographyH2 = ({ children, className, ...props }: TypographyH2Props) => {
  return (
    <h2
      {...props}
      className={'lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-medium ' + className}
    >
      {children}
    </h2>
  )
}

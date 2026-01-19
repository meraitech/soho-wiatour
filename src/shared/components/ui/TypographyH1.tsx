import React from 'react'

type TypographyH1Props = React.HTMLAttributes<HTMLHeadingElement>

export const TypographyH1 = ({ children, className, ...props }: TypographyH1Props) => {
  return (
    <h1 {...props} className={'text-5xl font-now ' + className}>
      {children}
    </h1>
  )
}

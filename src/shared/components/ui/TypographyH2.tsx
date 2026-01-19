import React from 'react'

type TypographyH2Props = React.HTMLAttributes<HTMLHeadingElement>

export const TypographyH2 = ({ children, className, ...props }: TypographyH2Props) => {
  return (
    <h2 {...props} className={'text-4xl ' + className}>
      {children}
    </h2>
  )
}

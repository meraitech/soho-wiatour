import React from 'react'

type TypographyH3Props = React.HTMLAttributes<HTMLHeadingElement>

export const TypographyH3 = ({ children, className, ...props }: TypographyH3Props) => {
  return (
    <h2 {...props} className={'text-2xl ' + className}>
      {children}
    </h2>
  )
}

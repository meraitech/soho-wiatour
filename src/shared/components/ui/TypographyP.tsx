import React from 'react'

type TypographyPProps = React.HTMLAttributes<HTMLHeadingElement>

export const TypographyP = ({ children, className, ...props }: TypographyPProps) => {
  return (
    <p {...props} className={'text-base ' + className}>
      {children}
    </p>
  )
}

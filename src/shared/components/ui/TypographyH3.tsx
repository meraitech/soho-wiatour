import clsx from 'clsx'
import React from 'react'

type TypographyH3Props = React.HTMLAttributes<HTMLHeadingElement>

export const TypographyH3 = ({ children, className, ...props }: TypographyH3Props) => {
  return (
    <h3 {...props} className={clsx('lg:text-3xl md:text-2xl text-xl font-medium ', className)}>
      {children}
    </h3>
  )
}

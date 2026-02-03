import React from 'react'

type TypographyH1Props = React.HTMLAttributes<HTMLHeadingElement>

export const TypographyH1 = ({ children, className, ...props }: TypographyH1Props) => {
  return (
    <h1
      {...props}
      className={
        'xl:text-7xl lg:text-6xl md:text-5xl sm:text-4xl text-3xl font-now duration-300 ' +
        className
      }
    >
      {children}
    </h1>
  )
}

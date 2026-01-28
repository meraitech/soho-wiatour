import React from 'react'

type TypographyH1Props = React.HTMLAttributes<HTMLHeadingElement>

export const TypographyH1 = ({ children, className, ...props }: TypographyH1Props) => {
  return (
    <h1
      {...props}
      className={
        'xl:text-6xl lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-now duration-300 ' +
        className
      }
    >
      {children}
    </h1>
  )
}

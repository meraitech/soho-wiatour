import clsx from 'clsx'
import React from 'react'

type Props = {
  children: React.ReactNode
  className?: string
}

export const Container = ({ children, className }: Props) => {
  return (
    <div className={clsx('max-w-6xl mx-auto', 'lg:p-10 md:p-8 p-6 duration-300', className)}>
      {children}
    </div>
  )
}

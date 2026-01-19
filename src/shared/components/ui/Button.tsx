import { BUTTON_BASE, BUTTON_SIZE, BUTTON_VARIANT } from '@/shared/constants/style/button'
import clsx from 'clsx'
import React from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
  variant?: keyof typeof BUTTON_VARIANT
  size?: keyof typeof BUTTON_SIZE
}

export const Button = ({
  children,
  className = '',
  variant = 'color',
  size = 'md',
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={clsx(className, BUTTON_BASE, BUTTON_VARIANT[variant], BUTTON_SIZE[size])}
    >
      {children}
    </button>
  )
}

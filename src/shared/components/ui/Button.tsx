import {
  STYLE_BUTTON_BASE,
  STYLE_BUTTON_SIZE,
  STYLE_BUTTON_VARIANT,
} from '@/shared/constants/style/button'
import clsx from 'clsx'
import React from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
  variant?: keyof typeof STYLE_BUTTON_VARIANT
  size?: keyof typeof STYLE_BUTTON_SIZE
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
      className={clsx(
        className,
        STYLE_BUTTON_BASE,
        STYLE_BUTTON_VARIANT[variant],
        STYLE_BUTTON_SIZE[size],
      )}
    >
      {children}
    </button>
  )
}

import {
  STYLE_BUTTON_BASE,
  STYLE_BUTTON_SIZE,
  STYLE_BUTTON_VARIANT,
} from '@/shared/constants/style/button'
import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'

type ButtonProps = {
  children: React.ReactNode
  className?: string
  variant?: keyof typeof STYLE_BUTTON_VARIANT
  size?: keyof typeof STYLE_BUTTON_SIZE
  href?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

export function Button({
  children,
  className,
  variant = 'color',
  size = 'md',
  href,
  onClick,
  type = 'button',
  disabled,
}: ButtonProps) {
  const styles = clsx(
    STYLE_BUTTON_BASE,
    STYLE_BUTTON_VARIANT[variant],
    STYLE_BUTTON_SIZE[size],
    className,
  )

  // 👉 JIKA ADA href → LINK
  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    )
  }

  // 👉 JIKA TIDAK ADA → BUTTON
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={styles}>
      {children}
    </button>
  )
}

'use client'

import Image, { ImageProps } from 'next/image'
import { forwardRef, useRef, useImperativeHandle } from 'react'
import clsx from 'clsx'

export interface BaseImageProps extends Omit<ImageProps, 'placeholder' | 'onLoad'> {
  blurDataURL?: string
  unoptimized?: boolean
  sizes?: string
  onLoadingComplete?: (img: HTMLImageElement) => void
}

export const BaseImage = forwardRef<HTMLImageElement, BaseImageProps>(
  (
    {
      className,
      blurDataURL,
      quality = 75,
      sizes = '(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw',
      unoptimized = false,
      priority,
      loading,
      onLoadingComplete,
      ...props
    },
    forwardedRef,
  ) => {
    const innerRef = useRef<HTMLImageElement | null>(null)

    useImperativeHandle(forwardedRef, () => innerRef.current!)

    const resolvedLoading = loading ?? (priority ? 'eager' : 'lazy')

    return (
      <Image
        {...props}
        ref={innerRef}
        className={clsx('object-cover', className)}
        quality={quality}
        sizes={sizes}
        placeholder={blurDataURL ? 'blur' : 'empty'}
        blurDataURL={blurDataURL}
        unoptimized={unoptimized}
        priority={priority}
        loading={resolvedLoading}
        onLoad={(e) => {
          const img = e.currentTarget
          innerRef.current = img
          onLoadingComplete?.(img)
        }}
      />
    )
  },
)

BaseImage.displayName = 'BaseImage'

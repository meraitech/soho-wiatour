import React from 'react'
import { Button } from './ui/Button'
import { STYLE_MARGIN_CONTAINER } from '../constants/style/margin'

export type CTAProps = {
  quote: string
  button1: string
  button2: string
}

export default function CTASection({ item }: { item: CTAProps }) {
  return (
    <section
      className={'flex flex-col items-center text-background gap-12 ' + STYLE_MARGIN_CONTAINER}
    >
      <blockquote className="lg:text-6xl md:text-5xl sm:text-4xl text-3xl lg:max-w-3xl md:max-w-2xl sm:max-w-xl max-w-lg text-center z-1 duration-300">
        {'“' + item.quote + '”'}
      </blockquote>

      <div className="flex max-md:flex-col gap-4 z-1">
        <Button>{item.button1}</Button>
        <Button href="" variant="monocrome_white">
          {item.button2}
        </Button>
      </div>
    </section>
  )
}

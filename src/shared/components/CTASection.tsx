import React from 'react'
import { Container } from './provider/Container'
import { Button } from './ui/Button'
import { STYLE_MARGIN_CONTAINER } from '../constants/style/margin'

export type CTAProps = {
  quote: string
  button1: string
  button2: string
}

export default function CTASection({ item }: { item: CTAProps }) {
  return (
    <section className={'bg-foreground text-background ' + STYLE_MARGIN_CONTAINER}>
      <Container className="flex flex-col items-center gap-12">
        <img src="/brand/logo/mw-1.webp" alt="" className="w-10" />

        <blockquote className="text-4xl max-w-2xl text-center">{'“' + item.quote + '”'}</blockquote>

        <div className="flex gap-4">
          <Button>{item.button1}</Button>
          <Button variant="monocrome_white">{item.button2}</Button>
        </div>
      </Container>
    </section>
  )
}

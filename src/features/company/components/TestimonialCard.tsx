import React from 'react'
import { Testimonial } from '../types/testimonial'
import { STYLE_ROUNDED_CARD } from '@/shared/constants/style/rounded'
import Image from 'next/image'

export const TestimonialCard = ({ item }: { item: Testimonial }) => {
  return (
    <div className={'w-100 flex flex-col gap-8 py-6 px-8 bg-disabled' + STYLE_ROUNDED_CARD}>
      <blockquote className="flex md:text-2xl text-xl">{'"' + item.quotes + '"'}</blockquote>
      <div className="flex items-end justify-between">
        <span className="font-medium text-lg">{item.name}</span>
        <Image
          src={item.imgUrl}
          alt={item.name + ' Profile'}
          width={1280}
          height={800}
          className="h-7 w-auto"
        />
      </div>
    </div>
  )
}

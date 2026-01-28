'use client'

import { cn } from '@/shared/lib/utils'

export function InfiniteMovingCards<T>({
  items,
  speed = 'normal',
  direction = 'left',
  pauseOnHover = true,
  className,
  renderItem,
}: {
  items: T[]
  speed?: 'fast' | 'normal' | 'slow'
  direction?: 'left' | 'right'
  pauseOnHover?: boolean
  className?: string
  renderItem: (item: T, index: number) => React.ReactNode
}) {
  const duration = speed === 'fast' ? '20s' : speed === 'slow' ? '80s' : '40s'

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <div
        className={cn(
          'flex w-max gap-8',
          direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right',
          pauseOnHover && 'hover:[animation-play-state:paused]',
        )}
        style={{ animationDuration: duration }}
      >
        {[...items, ...items].map((item, idx) => (
          <div key={idx} className="shrink-0">
            {renderItem(item, idx)}
          </div>
        ))}
      </div>
    </div>
  )
}

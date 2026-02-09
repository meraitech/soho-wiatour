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
          'flex w-max md:gap-8 gap-6',
          direction === 'left' ? 'animate-marquee-dynamic-left' : 'animate-marquee-dynamic-right',
          pauseOnHover && 'hover:[animation-play-state:paused]',
        )}
        style={{ animationDuration: duration }}
      >
        {/* SET 1 */}
        {items.map((item, idx) => (
          <div key={`a-${idx}`} className="shrink-0">
            {renderItem(item, idx)}
          </div>
        ))}

        {/* SET 2 (DUPLICATE) */}
        {items.map((item, idx) => (
          <div key={`b-${idx}`} className="shrink-0">
            {renderItem(item, idx)}
          </div>
        ))}
      </div>
    </div>
  )
}

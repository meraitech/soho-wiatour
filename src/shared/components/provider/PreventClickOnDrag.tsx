type PreventClickOnDragProps = {
  scrollRef: React.RefObject<HTMLElement | null>
  startScrollLeftRef: React.MutableRefObject<number>
  children: React.ReactNode
}

export function PreventClickOnDrag({
  scrollRef,
  startScrollLeftRef,
  children,
}: PreventClickOnDragProps) {
  return (
    <div
      onClickCapture={(e) => {
        if (!scrollRef.current) return

        if (scrollRef.current.scrollLeft !== startScrollLeftRef.current) {
          e.preventDefault()
          e.stopPropagation()
        }
      }}
    >
      {children}
    </div>
  )
}

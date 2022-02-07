import { useRef, useCallback } from 'react'

export const useInfiniteScroll = (
  isLoading: boolean,
  hasNext: boolean,
  callback: () => null,
) => {
  const observer = useRef<IntersectionObserver>()
  const lastElementRef = useCallback(
    node => {
      if (isLoading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasNext) callback()
      })
      if (node) observer.current.observe(node)
    },
    [isLoading, hasNext, callback],
  )
  return lastElementRef
}

import { useRef } from 'react'

export function useRenderCount() {
  const countRef = useRef(0)
  countRef.current += 1

  if (!import.meta.env.DEV) {
    return null
  }

  return (
    <small className="render-count" data-testid="render-count">
      {countRef.current}
    </small>
  )
}

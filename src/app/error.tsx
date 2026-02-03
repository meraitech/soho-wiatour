'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>500 - Server-side error occurred</h1>
      <p>Something went wrong. Please try again later.</p>
      <button onClick={reset}>Try again</button>
    </div>
  )
}

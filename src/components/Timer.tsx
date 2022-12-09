import usePrefersColorScheme from 'use-prefers-color-scheme'

function Timer({ runningTime }: { runningTime: number }) {
  const prefersColorScheme = usePrefersColorScheme()

  const color = prefersColorScheme === 'dark' ? 'dark-light' : 'light-dark'

  return (
    <div
      style={{
        width: '24px',
        height: '24px',
        borderRadius: '24px',
        background: `conic-gradient(transparent ${
          (100 / 30) * runningTime
        }%, var(--${color}) 0)`,
      }}
    />
  )
}

export default Timer

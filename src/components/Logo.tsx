import React from 'react'
import usePrefersColorScheme from 'use-prefers-color-scheme'

const style: React.CSSProperties = {
  height: '2rem',
  width: '2rem',
}

function Logo() {
  const prefersColorScheme = usePrefersColorScheme()

  return (
    <img
      alt='A key'
      src={`/favicon-${prefersColorScheme === 'dark' ? 'light' : 'dark'}.svg`}
      style={style}
    />
  )
}

export default Logo

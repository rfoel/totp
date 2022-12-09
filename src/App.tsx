import * as base32 from 'hi-base32'
import React, { useEffect, useState } from 'react'
import usePrefersColorScheme from 'use-prefers-color-scheme'

import Logo from './components/Logo'
import Timer from './components/Timer'
import { totp } from './utils/otp'

function App() {
  const prefersColorScheme = usePrefersColorScheme()
  const [secret, setSecret] = useState('Super Secret String')
  const [runningTime, setRunningTime] = useState(0)
  const [result, setResult] = useState('')

  useEffect(() => {
    const favicon = document.querySelector('#favicon') as HTMLLinkElement
    if (prefersColorScheme === 'light') favicon.href = '/favicon-dark.svg'
    else favicon.href = '/favicon-light.svg'
  }, [prefersColorScheme])

  useEffect(() => {
    async function generateTOTP() {
      const { runningTime, otp } = await totp(secret)
      setResult(otp)
      setRunningTime(runningTime)
    }

    generateTOTP()

    const interval = setInterval(() => {
      generateTOTP()
    }, 1000)

    return () => clearInterval(interval)
  }, [secret])

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSecret(event.target.value)
  }

  return (
    <>
      <header
        style={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
        }}
      >
        <Logo />
        <h1>Time-based one-time password</h1>
      </header>
      <main>
        <fieldset style={{ marginBottom: '1rem' }}>
          <legend>Secret</legend>
          <input defaultValue={secret} onChange={handleChange} type='text' />
        </fieldset>
        <fieldset style={{ marginBottom: '1rem' }}>
          <legend>Encoded secret</legend>
          <input
            readOnly
            type='text'
            value={base32.encode(secret)?.replace(/=/g, '')}
          />
        </fieldset>
        <fieldset>
          <legend>One-time password</legend>
          <input defaultValue={result} readOnly type='text' />
          <Timer runningTime={runningTime} />
        </fieldset>
      </main>
    </>
  )
}

export default App

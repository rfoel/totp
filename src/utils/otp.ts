async function hotp(
  key: string,
  counter: number,
  options: { algorithm: string; digits: number },
) {
  const algorithm = options.algorithm
  const digits = options.digits
  const hmacKey = await window.crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(key),
    {
      name: 'HMAC',
      hash: { name: algorithm },
    },
    false,
    ['sign'],
  )
  const hmac = await window.crypto.subtle.sign(
    'HMAC',
    hmacKey,
    padCounter(counter),
  )
  return String(truncate(new Uint8Array(hmac), digits)).padStart(digits, '0')
}

export async function totp(
  key: string,
  options: {
    algorithm?: string
    digits?: number
    t0?: number
    time?: number
    timeStep?: number
  } = {},
) {
  const time = options?.time ?? Date.now() / 1000
  const timeStep = options.timeStep ?? 30
  const t0 = options?.t0 ?? 0
  const digits = options?.digits ?? 6
  const algorithm = options?.algorithm ?? 'sha-1'
  const counter = Math.floor((time - t0) / timeStep)
  return {
    otp: await hotp(key, counter, { algorithm, digits }),
    runningTime: (time - t0) % timeStep,
  }
}

function padCounter(counter: number) {
  const arrayBuffer = new ArrayBuffer(8)
  const dataView = new DataView(arrayBuffer)
  const binaryCounter = counter.toString(2).padStart(64, '0')
  for (let byte = 0; byte < 64; byte += 8) {
    const byteValue = parseInt(binaryCounter.slice(byte, byte + 8), 2)
    dataView.setUint8(byte / 8, byteValue)
  }
  return arrayBuffer
}

function truncate(hmac: Uint8Array, digits: number) {
  const offset = hmac[hmac.length - 1] & 0x0f
  const value =
    ((hmac[offset + 0] & 0x7f) << 24) |
    ((hmac[offset + 1] & 0xff) << 16) |
    ((hmac[offset + 2] & 0xff) << 8) |
    (hmac[offset + 3] & 0xff)
  return value % 10 ** digits
}

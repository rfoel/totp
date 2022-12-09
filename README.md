# Time-based one-time password

This is a **web only** implementation of a [TOTP](https://en.wikipedia.org/wiki/Time-based_one-time_password). It uses the [Crypto.subtle](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/subtle) web API to generate these time-based passwords.

The demo application is only TOTP, although [HOTP](https://en.wikipedia.org/wiki/HMAC-based_one-time_password) could be extended as I use the HOTP algorithm to generate the TOTP.

The encoded secret provided works with Google Authenticator. It can be any string encoded in base32. I am using the [hi-base32](https://github.com/emn178/hi-base32) library to encode the string, striping any non-alphanumeric characters.

### References

- https://github.com/khovansky-al/web-otp-demo
- https://otplib.yeojz.dev/

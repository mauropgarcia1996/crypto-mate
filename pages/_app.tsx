import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { NextUIProvider, createTheme } from '@nextui-org/react';

const customTheme = createTheme({
  type: "light"
})
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider theme={customTheme}>
      <Component {...pageProps} />
    </NextUIProvider>
  )
}

export default MyApp

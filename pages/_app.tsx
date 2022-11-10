import { createTheme, NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import { store } from '../features/store';
import { Provider } from 'react-redux';

const lightTheme = createTheme({
  type: 'light',
  theme: {
    colors: {},
  },
})

const darkTheme = createTheme({
  type: 'dark',
  theme: {
    colors: {},
  },
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <NextThemesProvider
        defaultTheme='system'
        attribute='class'
        value={{
          light: lightTheme.className,
          dark: darkTheme.className,
        }}>
        <NextUIProvider>
          <Component {...pageProps} />
        </NextUIProvider>
      </NextThemesProvider>
    </Provider>
  )
}

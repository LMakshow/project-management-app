import { createTheme, NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import { store } from '../features/store'
import { Provider } from 'react-redux'
import { appWithTranslation } from 'next-i18next'

const lightTheme = createTheme({
  type: 'light',
  theme: {
    breakpoints: {
      xl: '1400px'
    }
  },
})

const darkTheme = createTheme({
  type: 'dark',
  theme: {
    breakpoints: {
      xl: '1400px'
    }
  },
})

const App = ({ Component, pageProps }: AppProps) => {
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

export default appWithTranslation(App);
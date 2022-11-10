import { createTheme, NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { messages as enMessages } from '../locales/en/messages'
import { messages as ruMessages } from '../locales/ru/messages'
import type { AppProps } from 'next/app'
import { store } from '../features/store'
import { Provider as ReduxProvider } from 'react-redux'
import { useRouter } from 'next/router'
import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { useEffect } from 'react'
import { en, ru } from 'make-plural/plurals'

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
  const { locale } = useRouter()

  useEffect(() => {
    async function load(locale: string) {
      i18n.load({
        en: enMessages,
        ru: ruMessages,
      })
      i18n.activate(locale)
    }

    load(locale as string)
  }, [locale])

  return (
    <ReduxProvider store={store}>
      <I18nProvider i18n={i18n}>
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
      </I18nProvider>
    </ReduxProvider>
  )
}

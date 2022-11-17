import { Container } from '@nextui-org/react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Benefits from '../components/Benefits/Benefits'
import Hero from '../components/Hero/Hero'
import Layout, { siteTitle } from '../components/layout'
import Team from '../components/Team/Team'

export const getStaticProps = async ({ locale }: { locale: 'en' | 'ru' }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', [
      'common',
      'home-page'
    ])),
  },
})

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Container>
        <Hero />
        <Benefits />
        <Team />
      </Container>
    </Layout>
  )
}

import Head from 'next/head'
import { Button } from '@nextui-org/react';
import Layout, { siteTitle } from '../components/layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getStaticProps = async ({ locale }: { locale: 'en' | 'ru' }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common'])),
  },
})

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <main>
        <p>Project Management App</p>
        <Button>Click me</Button>
      </main>
    </Layout>
  )
}

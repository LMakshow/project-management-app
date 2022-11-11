import Head from 'next/head'
import { Button } from '@nextui-org/react'
import Layout, { siteTitle } from '../components/layout'
import Hero from '../components/Hero/Hero'
import { Container } from '@nextui-org/react'

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Container>
        <Hero />
      </Container>
    </Layout>
  )
}

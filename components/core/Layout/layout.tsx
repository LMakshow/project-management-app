import { CSS } from '@nextui-org/react'
import { CSSProperties } from '@nextui-org/react/types/theme'
import Head from 'next/head'
import Footer from './Footer'
import Navbar from './Navbar'

export const siteTitle = 'Creative Management App'

export default function Layout({ children, style }: { children: React.ReactNode, style?: CSSProperties }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
      <Head>
        <meta
          name='description'
          content='Click. Manage. Agile! A digital project management tool to help visualize work, limit work-in-progress, and maximize efficiency'
        />
        <meta property='og:image' content='/logo/logo-cma.png' />
        <meta name='og:title' content={siteTitle} />
        <link rel='icon' href='/favicon.svg' />
      </Head>
      <Navbar />
      <main style={{ minHeight: 'calc(100vh - 150px)', ...style}}>{children}</main>
      <Footer />
    </div>
  )
}

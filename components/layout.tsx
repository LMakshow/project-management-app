import { CSS } from '@nextui-org/react'
import { CSSProperties } from '@nextui-org/react/types/theme'
import Head from 'next/head'
import Footer from './Footer'
import Navbar from './Navbar'

export const siteTitle = 'Project Management App'

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
          content='A Kanban board app that helps a team or group of developers achieve their goals. There are Jira, Trello, and even Github Projects, but this app is custom made with love!'
        />
        <meta property='og:image' content='/favicon.png' />
        <meta name='og:title' content={siteTitle} />
        <link rel='icon' href='/favicon.svg' />
      </Head>
      <Navbar />
      <main style={{ minHeight: 'calc(100vh - 150px)', ...style}}>{children}</main>
      <Footer />
    </div>
  )
}

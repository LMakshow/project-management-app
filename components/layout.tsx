import Head from 'next/head'
import Image from 'next/image'
import styles from './layout.module.css'
import { Container, Row, Col } from '@nextui-org/react'
import Link from 'next/link'
import Navbar from './Navbar'
import Footer from './Footer'

export const siteTitle = 'Project Management App'

export default function Layout({
  children,
  home,
}: {
  children: React.ReactNode
  home?: boolean
}) {
  return (
    <div
      style={{
        height: '100vh',
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
      <main style={{ minHeight: 'calc(100vh - 150px)' }}>{children}</main>
      <Footer />
    </div>
  )
}

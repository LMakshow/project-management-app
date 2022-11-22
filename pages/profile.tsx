import { Container } from '@nextui-org/react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout, { siteTitle } from '../components/layout'
import ProfileContent from '../components/profile/profile-content'
import Head from 'next/head'

export const getStaticProps = async ({ locale }: { locale: 'en' | 'ru' }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', [
      'common',
      'modal-window',
      'profile',
    ])),
  },
})
const Profile = () => {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Container
        css={{
          padding: '100px',
          display: 'flex',
          flexWrap: 'initial',
        }}>
        <ProfileContent />
      </Container>
    </Layout>
  )
}

export default Profile

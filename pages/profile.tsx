import { Container } from '@nextui-org/react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout from '../components/layout'
import ProfileContent from '../components/profile/profile-content'

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

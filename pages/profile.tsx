import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export const getStaticProps = async ({ locale }: { locale: 'en' | 'ru' }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', [
      'common',
      'modal-window',
    ])),
  },
})
const Profile = () => {
  return <div>profile</div>
}

export default Profile

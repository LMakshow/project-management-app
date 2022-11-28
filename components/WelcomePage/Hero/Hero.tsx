import { Button, Grid, Text } from '@nextui-org/react'
import Image from 'next/image'
import ReactDOM from 'react-dom'

import { useTranslation } from 'next-i18next'

import heroImg from '../../../assets/images/heroImage.png'

import { useAppSelector, useModal } from '../../../features/hooks'
import ModalWindow from '../../Modal-window/Modal-window'
import styles from './hero.module.scss'
import { useRouter } from 'next/router'

const Hero = () => {
  const router = useRouter()
  const { t } = useTranslation('home-page')
  const isSigned = useAppSelector((state) => state.user.token)
  const { isShowing: isModalShowing, toggle: toggleModal } = useModal()

  const heroStyles = {
    hero: {
      padding: '60px 0 60px',
      display: 'flex',
      gap: '60px',
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: '39px',
      fontFamily: '"Comfortaa", sans-serif',
      textAlign: 'center',
      fontWeight: '400',
      lineHeight: '47px',
      marginBottom: '30px',
    },
    text: {
      fontFamily: '"Inter", cursive',
      textAlign: 'center',
      fontSize: '18px',
      lineHeight: '22px',
      maxWidth: '549px',
      marginBottom: '50px',
    },
    button: {
      fontFamily: '"Inter", cursive',
      justifySelf: 'center',
      background: '#043B7C',
      borderRadius: '50px',
      padding: '29px 75px',
      fontWeight: '500',
      width: '300px',
      fontSize: '24px',
      lineHeight: '29px',
      '&:hover': {
        background: '#346aa8',
      },
      '@smMax': {
        margin: '0 auto',
        maxWidth: '300px',
      },
    },
  }

  const handleStartButton = () => {
    if (isSigned) router.push('/boards')
    if (!isSigned) toggleModal()
  }

  return (
    <>
      <Grid.Container gap={5} css={{ ai: 'center' }}>
        <Grid sm={5} css={{ fd: 'column', ai: 'center' }}>
          <Text h1 css={heroStyles.title}>
            {t('heroTitle')}
          </Text>
          <Text css={heroStyles.text}>{t(`heroText`)}</Text>
          <Button css={heroStyles.button} onPress={handleStartButton}>{t('heroBtn')}</Button>
        </Grid>
        <Grid sm={7}>
          <Image
            src={heroImg}
            alt='Hero Image'
            priority
            className={styles.img}
          />
        </Grid>
      </Grid.Container>
      {isModalShowing &&
        ReactDOM.createPortal(
          <ModalWindow
            isShowing={isModalShowing}
            hide={toggleModal}
            action='signUp'
          />,
          document.body
        )}
    </>
  )
}

export default Hero

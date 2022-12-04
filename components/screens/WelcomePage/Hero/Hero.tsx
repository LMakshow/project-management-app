import { Button, Grid, Text } from '@nextui-org/react'
import Image from 'next/image'
import ReactDOM from 'react-dom'

import { useTranslation } from 'next-i18next'

import heroImg from '../../../../assets/images/heroImage.png'

import { useAppSelector, useModal } from '../../../../features/hooks'
import ModalWindow from '../../../core/Modal/Modal-window'
import styles from './hero.module.scss'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Link from 'next/link'

const Hero = () => {
  const router = useRouter()
  const { t } = useTranslation('home-page')
  const isSigned = useAppSelector((state) => state.user.token)
  const { isShowing: isModalShowing, toggle: toggleModal } = useModal()

  const [signUserAction, setSignUserAction] = useState('')

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
    btnContainer: {
      display: 'flex',
      flexWrap: 'wrap' as const,
      justifyContent: 'center',
      gap: 20,
    },
    button: {
      fontFamily: '"Inter", cursive',
      justifySelf: 'center',
      height: '52px',
      borderRadius: '50px',
      padding: '22px 70px',
      fontWeight: '500',
      width: '240px',
      fontSize: '20px',
      lineHeight: '24px',
      '@smMax': {
        margin: '0 auto',
      },
    },
    btnStart: {
      background: '#043B7C',
      '&:hover': {
        background: '#346aa8',
      },
    },
  }

  const handleStartButton = () => {
    if (isSigned) router.push('/boards')
    if (!isSigned) {
      setSignUserAction('signUp')
      toggleModal()
    }
  }

  return (
    <>
      <Grid.Container gap={5} css={{ ai: 'center' }}>
        <Grid sm={5} css={{ fd: 'column', ai: 'center' }}>
          <Text h1 css={heroStyles.title}>
            {t('heroTitle')}
          </Text>
          <Text css={heroStyles.text}>{t(`heroText`)}</Text>
          <div style={heroStyles.btnContainer}>
            <Button
              css={{ ...heroStyles.button, ...heroStyles.btnStart }}
              onPress={handleStartButton}>
              {t('heroBtn')}
            </Button>
            <Link href='https://youtu.be/djB7RI5Cuc4'>
              <Button
                css={heroStyles.button}
                flat
                bordered>
                {t('heroBtnVideo')}
              </Button>
            </Link>
          </div>
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
            action={signUserAction}
            setAction={setSignUserAction}
          />,
          document.body
        )}
    </>
  )
}

export default Hero

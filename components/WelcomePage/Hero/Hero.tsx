import { Button, Grid, Text, useTheme } from '@nextui-org/react'
import Image from 'next/image'

import { useTranslation } from 'next-i18next'

import heroImg from '../../../assets/images/heroImage.png'

import styles from './hero.module.scss'

const Hero = () => {
  const { t } = useTranslation('home-page')
  const { theme } = useTheme()

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
  return (
    <>
      <Grid.Container gap={5} css={{ ai: 'center' }}>
        <Grid sm={5} css={{ fd: 'column', ai: 'center' }}>
          <Text h1 css={heroStyles.title}>
            {t('heroTitle')}
          </Text>
          <Text css={heroStyles.text}>{t(`heroText`)}</Text>
          <Button css={heroStyles.button}>{t('heroBtn')}</Button>
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
    </>
  )
}

export default Hero

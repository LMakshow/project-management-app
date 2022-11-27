import { Button, Text, useTheme } from '@nextui-org/react'
import Image from 'next/image'

import { useTranslation } from 'next-i18next'

import heroImg from '../../assets/images/heroImage.png'

import styles from './hero.module.scss'

const Hero = () => {
  const { t } = useTranslation('home-page')
  const { theme } = useTheme();

  const heroStyles = {
    hero: {
      padding: '60px 0 180px',
      display: 'flex',
      gap: '60px',
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: '39px',
      fontFamily: '"Comfortaa", sans-serif',
      fontWeight: '400',
      lineHeight: '47px',
      marginBottom: '30px',
    },
    text: {
      fontFamily: '"Inter", cursive',
      fontSize: '18px',
      lineHeight: '22px',
      maxWidth: '549px',
      marginBottom: '50px',
    },
    button: {
      fontFamily: '"Inter", cursive',
      background: '#043B7C',
      borderRadius: '50px',
      padding: '29px 75px',
      fontWeight: '500',
      fontSize: '24px',
      lineHeight: '29px',
      '&:hover': {
        background: '#346aa8',
      },
      '@smMax': {
        margin: '0 auto',
      },
    },
  }
  return (
    <section style={heroStyles.hero}>
      <div className={styles.hero__text}>
        <Text h1 css={heroStyles.title}>
          {t('heroTitle')}
        </Text>
        <Text css={heroStyles.text}>{t(`heroText`)}</Text>
        <Button css={heroStyles.button}>{t('heroBtn')}</Button>
      </div>
      <Image
        src={heroImg}
        alt='Hero Image'
        priority
        style={{
          height: '100%',
          marginRight: '-100px'
        }}
      />
    </section>
  )
}

export default Hero

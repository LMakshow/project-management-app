import { Text } from '@nextui-org/react'
import { Button } from '@nextui-org/react'
import Image from 'next/image'

import heroImg from '../../assets/icon/hero-img.svg'

import styles from './hero.module.scss'

const Hero = () => {
  const heroStyles = {
    title: {
      fontSize: '42px',
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
    },
  }
  return (
    <section className={styles.hero}>
      <div className={styles.hero__text}>
        <Text h1 css={heroStyles.title}>
          Нажми. Управляй. Ускоряй
        </Text>
        <Text css={heroStyles.text}>
          Цифровой инструмент управления проектами, предназначенный для
          визуализации работы, ограничения незавершенной работы и максимизации
          эффективности
        </Text>
        <Button css={heroStyles.button}>Начать</Button>
      </div>
      <Image
        src={heroImg}
        alt='Hero Image'
        style={{
          height: '100%',
        }}
      />
    </section>
  )
}

export default Hero
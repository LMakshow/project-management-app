import { Text } from '@nextui-org/react'
import Image from 'next/image'

import styles from './benefits.module.scss'

import interfaceImg from '../../assets/icon/interface.svg'
import noLimitsImg from '../../assets/icon/no-limits.svg'
import editionImg from '../../assets/icon/edition.svg'

const Benefits = () => {
  const benefitsStyles = {
    title: {
      marginBottom: '140px',
      textAlign: 'center',
      fontFamily: '"Inter", cursive',
    },
    text: {
      fontSize: '24px',
      lineHeight: '29px',
      fontFamily: '"Inter", cursive',
    },
    image: { width: '160px', height: 'auto' },
  }
  return (
    <section className={styles.benefits}>
      <Text h2 css={benefitsStyles.title}>
        Мы предлагаем
      </Text>
      <div className={styles.benefits__list}>
        <div className={styles.benefits__item}>
          <Image
            src={interfaceImg}
            alt='interface'
            style={benefitsStyles.image}
          />
          <Text span css={benefitsStyles.text}>
            Понятный интерфейс
          </Text>
        </div>
        <div className={styles.benefits__item}>
          <Image
            src={noLimitsImg}
            alt='no limits'
            style={benefitsStyles.image}
          />
          <Text span css={benefitsStyles.text}>
            Отсутсвие ограничений в количестве
          </Text>
        </div>
        <div className={styles.benefits__item}>
          <Image src={editionImg} alt='edition' style={benefitsStyles.image} />
          <Text span css={benefitsStyles.text}>
            Возможность редактирвоания
          </Text>
        </div>
      </div>
    </section>
  )
}

export default Benefits

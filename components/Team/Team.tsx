import { Text } from '@nextui-org/react'
import Image from 'next/image'

import { useTranslation } from 'next-i18next'

import styles from './team.module.scss'

import womanImage from '../../assets/icon/person-woman.svg'
import manImage from '../../assets/icon/person-man.svg'

const Team = () => {
  const { t } = useTranslation('home-page')

  const teamStyles = {
    title: {
      marginBottom: '140px',
      textAlign: 'center',
      fontFamily: '"Inter", cursive',
    },
    image: {},
    itemTitle: {
      fontFamily: '"Inter", cursive',
      fontSize: '18px',
      lineHeight: '22px',
    },
    itemText: {
      textAlign: 'center',
      fontFamily: '"Inter", cursive',
      fontSize: '16px',
      lineHeight: '19px',
    },
  }
  return (
    <section className={styles.team}>
      <Text h2 css={teamStyles.title}>
        {t('teamTitle')}
      </Text>
      <div className={styles.team__list}>
        <div className={styles.team__item}>
          <Image src={womanImage} alt='woman image' />
          <Text span css={teamStyles.itemTitle}>
            {t('teamBella')}
          </Text>
          <Text span css={teamStyles.itemText}>
            {t('teamBellaText')}
          </Text>
        </div>
        <div className={styles.team__item}>
          <Image src={manImage} alt='man image' />
          <Text span css={teamStyles.itemTitle}>
            {t('teamMaxim')}
          </Text>
          <Text span css={teamStyles.itemText}>
            {t('teamMaximText')}
          </Text>
        </div>
        <div className={styles.team__item}>
          <Image src={womanImage} alt='woman image' />
          <Text span css={teamStyles.itemTitle}>
            {t('teamChristina')}
          </Text>
          <Text span css={teamStyles.itemText}>
            {t('teamChristinaText')}
          </Text>
        </div>
      </div>
    </section>
  )
}

export default Team

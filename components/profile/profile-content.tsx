import { Button, Col, Row } from '@nextui-org/react'
import { useAppSelector } from '../../features/hooks'
import styles from './profile-content.module.scss'

import { EditIcon } from '../icons/profile/Edit-icon'
import { useTranslation } from 'next-i18next'

const ProfileContent = () => {
  const userName = useAppSelector((state) => state.user.name)
  const userLogin = useAppSelector((state) => state.user.login)
  const userPassword = useAppSelector((state) => state.user.password)

  const { t } = useTranslation('profile')

  return (
    <>
      <Col>
        <div
          style={{
            width: '300px',
            height: '300px',
            backgroundColor: '#C5DBF4',
            borderRadius: '5px',
          }}>
          userPhoto
        </div>
      </Col>

      <Col
        css={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-around',
        }}>
        <ul className={styles.list}>
          <li>
            <Button
              animated={false}
              size='xs'
              light
              icon={<EditIcon />}
              css={{ position: 'absolute', top: '-30px', right: '-50px' }}
            />
          </li>

          <li className={styles.list__item}>
            <span className={styles.list__prop}>{t('name')}</span>
            <span className={styles.list__value}>{userName}</span>
          </li>

          <li className={styles.list__item}>
            <span className={styles.list__prop}>{t('email')}</span>
            <span className={styles.list__value}>{userLogin}</span>
          </li>

          <li className={styles.list__item}>
            <span className={styles.list__prop}>{t('password')}</span>
            <span className={styles.list__value}>
              {''.padStart(userPassword?.length!, '*')}
            </span>
          </li>
        </ul>

        <Button color='error' auto>
          {t('delete')}
        </Button>
      </Col>
    </>
  )
}

export default ProfileContent

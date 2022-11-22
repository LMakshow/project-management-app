import { Button, Col, Popover, useTheme } from '@nextui-org/react'
import { useAppSelector, useModal } from '../../features/hooks'
import styles from './profile-content.module.scss'

import { EditIcon } from '../icons/profile/Edit-icon'

import { useTranslation } from 'next-i18next'
import ModalWindow from '../Modal-window/Modal-window'
import ReactDOM from 'react-dom'
import { DeleteUser } from './Delete-user-confirm'
import { useState } from 'react'

const ProfileContent = () => {
  const { isDark, theme } = useTheme()

  const userName = useAppSelector((state) => state.user.name)
  const userLogin = useAppSelector((state) => state.user.login)
  const userPassword = useAppSelector((state) => state.user.password)

  const { isShowing: isModalShowing, toggle: toggleModal } = useModal()

  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const { t } = useTranslation('profile')
  return (
    <>
      <Col
        css={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <ul
          className={styles.list}
          style={{
            border: `${isDark ? '1px solid #F1F3F5' : '#none'}`,
          }}>
          <li>
            <Button
              animated={false}
              auto
              light
              icon={<EditIcon />}
              css={{
                position: 'absolute',
                top: '-50px',
                right: '-50px',
                '@xsMax': {
                  right: '0',
                },
              }}
              onClick={toggleModal}
            />
          </li>

          <li
            className={styles.list__item}
            style={{
              color: `${isDark ? theme?.colors?.primary?.value : '#000'}`,
            }}>
            <span className={styles.list__prop}>{t('name')}</span>
            <span className={styles.list__value}>{userName}</span>
          </li>

          <li
            className={styles.list__item}
            style={{
              color: `${isDark ? theme?.colors?.primary?.value : '#000'}`,
            }}>
            <span className={styles.list__prop}>{t('email')}</span>
            <span className={styles.list__value}>{userLogin}</span>
          </li>

          <li
            className={styles.list__item}
            style={{
              color: `${isDark ? theme?.colors?.primary?.value : '#000'}`,
            }}>
            <span className={styles.list__prop}>{t('password')}</span>
            <span className={styles.list__value}>
              {''.padStart(userPassword?.length!, '*')}
            </span>
          </li>
        </ul>
        <Popover
          isBordered
          isOpen={isPopoverOpen}
          onOpenChange={setIsPopoverOpen}>
          <Popover.Trigger>
            <Button
              color='error'
              auto
              css={{
                margin: '0 auto',
              }}>
              {t('delete')}
            </Button>
          </Popover.Trigger>
          <Popover.Content>
            <DeleteUser isOpen={isPopoverOpen} setIsOpen={setIsPopoverOpen} />
          </Popover.Content>
        </Popover>
      </Col>
      {isModalShowing &&
        ReactDOM.createPortal(
          <ModalWindow
            isShowing={isModalShowing}
            hide={toggleModal}
            action='edit'
          />,
          document.body
        )}
    </>
  )
}

export default ProfileContent

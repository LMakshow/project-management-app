import { useTheme as useNextTheme } from 'next-themes'
import { Button, Popover, Switch, Text, useTheme } from '@nextui-org/react'
import { Navbar, Link } from '@nextui-org/react'
import LangSwitcher from '../utils/LangSwitcher'

// Import images
import logo_small from '../assets/logo/logo_small.svg'
import Image from 'next/image'
import { IconSun } from './icons/icon_sun'
import { IconMoon } from './icons/icon_moon'
import { IconKanban } from './icons/icon_kanban'
import { IconKanbanAdd } from './icons/icon_kanban_add'

// Import redux
import { useAppDispatch, useAppSelector, useModal } from '../features/hooks'
// import { signIn, signOut } from '../features/userSlice'
import { useSignInMutation, useSignUpMutation } from '../features/auth/authApi'

// Import translations
import { useTranslation } from 'next-i18next'
import { setUser } from '../features/auth/userSlice'

import ModalWindow from './Modal-window/Modal-window'
import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import PopoverAddBoard from './Popover-add-board'

export default function Header() {
  const { setTheme } = useNextTheme()
  const { isDark, theme } = useTheme()
  const [login, { isLoading }] = useSignInMutation()
  const [signUp] = useSignUpMutation()
  const dispatch = useAppDispatch()
  const isSigned = useAppSelector((state) => state.user.token)
  const userName = useAppSelector((state) => state.user.name)
  const { t } = useTranslation('common')

  const { isShowing, toggle } = useModal()
  const [action, setAction] = useState('')
  const [scroll, setScroll] = useState(false)

  const listenScrollEvent = () => {
    if (window.scrollY < 70) {
      return setScroll(false)
    } else if (window.scrollY > 70) {
      return setScroll(true)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', listenScrollEvent)

    return () => window.removeEventListener('scroll', listenScrollEvent)
  }, [])

  const signOutAction = () => {
    dispatch(setUser({ token: null, name: null, login: null, _id: null }))
  }

  return (
    <>
      <Navbar variant='sticky' isCompact={scroll}>
        <Navbar.Toggle showIn='xs' />
        <Navbar.Brand css={{ '@sm': { marginRight: '$12' } }}>
          <Link href='/' color='text'>
            <Image
              src={logo_small}
              width='40'
              style={{ marginRight: '10px' }}
              alt=''
            />
            <Text b size='$2xl' color='inherit'>
              CMA
            </Text>
          </Link>
        </Navbar.Brand>
        {isSigned ? (
          <Navbar.Content
            css={{ '@sm': { marginLeft: 'auto', marginRight: '$12' } }}
            hideIn='xs'>
            <Navbar.Link href='#'>
              <IconKanban fill={theme?.colors?.primary?.value} />
              <Text size='large'>{t('Boards')}</Text>
            </Navbar.Link>
            <Popover>
              <Popover.Trigger>
                <Navbar.Link href='#'>
                  <IconKanbanAdd fill={theme?.colors?.primary?.value} />
                  <Text size='large'>{t('Create Board')}</Text>
                </Navbar.Link>
              </Popover.Trigger>
              <Popover.Content>
                <PopoverAddBoard />
              </Popover.Content>
            </Popover>
          </Navbar.Content>
        ) : null}
        <Navbar.Content
          css={{ '@sm': { marginLeft: 'auto', marginRight: '$12' } }}
          hideIn='xs'>
          <Switch
            checked={isDark}
            iconOff={<IconSun />}
            iconOn={<IconMoon />}
            onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
          />
          <LangSwitcher />
        </Navbar.Content>
        <Navbar.Content hideIn='xs'>
          {isSigned ? (
            <Navbar.Link color='inherit' href='#' onClick={signOutAction}>
              <Text>{t('Sign Out')}&nbsp;</Text>
              <Text as='span' hideIn='sm'>{`(${userName})`}</Text>
            </Navbar.Link>
          ) : (
            <>
              <Navbar.Link
                color='inherit'
                href='#'
                onClick={() => {
                  setAction('signIn')
                  toggle()
                }}>
                {t('Sign In')}
              </Navbar.Link>
              <Navbar.Link color='inherit' href='#'>
                <Button
                  auto
                  flat
                  onClick={() => {
                    setAction('signUp')
                    toggle()
                  }}>
                  <Text>{t('Sign Up')}</Text>
                </Button>
              </Navbar.Link>
            </>
          )}
        </Navbar.Content>
        <Navbar.Collapse>
          {isSigned ? (
            <>
              <Navbar.CollapseItem>
                <Link href='#'>
                  <IconKanban fill={theme?.colors?.primary?.value} />
                  <Text size='large'>{t('Boards')}</Text>
                </Link>
              </Navbar.CollapseItem>
              <Navbar.CollapseItem>
                <Link href='#'>
                  <IconKanbanAdd fill={theme?.colors?.primary?.value} />
                  <Text size='large'>{t('Create Board')}</Text>
                </Link>
              </Navbar.CollapseItem>
              <Navbar.CollapseItem>
                <Link
                  color='error'
                  css={{ paddingLeft: '$12' }}
                  href='#'
                  onClick={signOutAction}>
                  {`${t('Sign Out')} (${userName})`}\
                </Link>
              </Navbar.CollapseItem>
            </>
          ) : (
            <>
              <Navbar.CollapseItem>
                <Link
                  color='inherit'
                  href='#'
                  css={{ paddingLeft: '$11' }}
                  onClick={() => {
                    setAction('signIn')
                    toggle()
                  }}>
                  {t('Sign In')}
                </Link>
              </Navbar.CollapseItem>
              <Navbar.CollapseItem>
                <Button
                  auto
                  flat
                  css={{ ml: '$10' }}
                  onClick={() => {
                    setAction('signUp')
                    toggle()
                  }}>
                  <Text>{t('Sign Up')}</Text>
                </Button>
              </Navbar.CollapseItem>
            </>
          )}
          <Navbar.CollapseItem>
            <LangSwitcher />
            <Switch
              checked={isDark}
              iconOff={<IconSun />}
              iconOn={<IconMoon />}
              onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
            />
          </Navbar.CollapseItem>
        </Navbar.Collapse>
      </Navbar>
      {isShowing &&
        ReactDOM.createPortal(
          <ModalWindow isShowing={isShowing} hide={toggle} action={action} />,
          document.body
        )}
    </>
  )
}

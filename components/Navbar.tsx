import { useTheme as useNextTheme } from 'next-themes'
import Link from 'next/link'
import { Button, Switch, Text, useTheme } from '@nextui-org/react'
import { Navbar } from '@nextui-org/react'
import LangSwitcher from '../utils/LangSwitcher'

// Import images
import logo_small from '../assets/logo/logo_small.svg'
import Image from 'next/image'
import { IconSun } from './icons/icon_sun'
import { IconMoon } from './icons/icon_moon'
import { IconKanban } from './icons/icon_kanban'
import { IconKanbanAdd } from './icons/icon_kanban_add'

// Import redux
import { useAppDispatch, useAppSelector } from '../features/hooks'
import { useSignInMutation, useSignUpMutation } from '../features/auth/authApi'

// Import translations
import { useTranslation } from 'next-i18next'
import { setUser } from '../features/auth/userSlice'
import { useEffect, useState } from 'react'

export default function Header() {
  const { setTheme } = useNextTheme()
  const { isDark, theme } = useTheme()
  const [login, { isLoading }] = useSignInMutation()
  const [signUp] = useSignUpMutation()
  const dispatch = useAppDispatch()
  const isSigned = useAppSelector((state) => state.user.token)
  const userName = useAppSelector((state) => state.user.name)
  const { t } = useTranslation('common')
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

  const signInAction = async () => {
    try {
      const userData = await login({
        login: 'TestUser',
        password: 'TestUserPwd',
      }).unwrap()
      dispatch(setUser(userData))
    } catch {}
  }

  const signUpAction = async () => {
    try {
      await signUp({
        login: 'TestUser',
        name: 'TestUser',
        password: 'TestUserPwd',
      })
      await signInAction()
    } catch (err) {
      console.log(err)
    }
  }

  const signOutAction = () => {
    dispatch(setUser({ token: null, name: null, login: null, _id: null }))
  }

  return (
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
          <Text b size='$2xl'>
            CMA
          </Text>
        </Link>
      </Navbar.Brand>
      {isSigned ? (
        <Navbar.Content
          css={{ '@sm': { marginLeft: 'auto', marginRight: '$12' } }}
          hideIn='xs'>
          <Navbar.Item>
            <Link href='/boards'>
              <IconKanban fill={theme?.colors?.primary?.value} />
              <Text size='large'>{t('Boards')}</Text>
            </Link>
          </Navbar.Item>
          <Link href='/boards'>
            <IconKanbanAdd fill={theme?.colors?.primary?.value} />
            <Text size='large'>{t('Create Board')}</Text>
          </Link>
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
          <Link color='inherit' href='#' onClick={signOutAction}>
            <Text>{t('Sign Out')}&nbsp;</Text>
            <Text as='span' hideIn='sm'>{`(${userName})`}</Text>
          </Link>
        ) : (
          <>
            <Link color='inherit' href='#' onClick={signInAction}>
              {t('Sign In')}
            </Link>
            <Link color='inherit' href='#'>
              <Button auto flat onClick={signUpAction}>
                <Text>{t('Sign Up')}</Text>
              </Button>
            </Link>
          </>
        )}
      </Navbar.Content>
      <Navbar.Collapse>
        {isSigned ? (
          <>
            <Navbar.CollapseItem>
              <Link href='/boards'>
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
                style={{ paddingLeft: '$12' }}
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
                style={{ paddingLeft: '$11' }}
                onClick={signInAction}>
                {t('Sign In')}
              </Link>
            </Navbar.CollapseItem>
            <Navbar.CollapseItem>
              <Link
                href='#'
                color='inherit'
                style={{ paddingLeft: '$4' }}
                onClick={signUpAction}>
                <Button auto flat>
                  <Text>{t('Sign Up')}</Text>
                </Button>
              </Link>
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
  )
}

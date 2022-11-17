import { Button, Link, Navbar, Switch, Text, useTheme } from '@nextui-org/react'
import { useTheme as useNextTheme } from 'next-themes'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import LangSwitcher from '../utils/LangSwitcher'

// Import images
import Image from 'next/image'
import logo_small from '../assets/logo/logo_small.svg'
import { IconKanban } from './icons/navbar/icon_kanban'
import { IconKanbanAdd } from './icons/navbar/icon_kanban_add'
import { IconMoon } from './icons/navbar/icon_moon'
import { IconSun } from './icons/navbar/icon_sun'

// Import redux
import { useAppDispatch, useAppSelector, useModal } from '../features/hooks'
import { setUser } from '../features/auth/userSlice'

// Import translations
import { useTranslation } from 'next-i18next'

import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import ModalWindow from './Modal-window/Modal-window'
import { useCreateBoardMutation } from '../features/boards/boardsApi'

export default function Header() {
  const { setTheme } = useNextTheme()
  const { isDark, theme } = useTheme()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const isSigned = useAppSelector((state) => state.user.token)
  const userName = useAppSelector((state) => state.user.name)
  const userId = useAppSelector((state) => state.user._id) as string
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

  const [createBoard] = useCreateBoardMutation()
  const handleCreateBoard = async () => {
    await createBoard({
      title: 'New Board',
      owner: userId,
      users: [userId]
    })
    router.push('/boards')
  }

  return (
    <>
      <Navbar variant='sticky' isCompact={scroll}>
        <Navbar.Toggle showIn='xs' />
        <Navbar.Brand css={{ '@sm': { marginRight: '$12' } }}>
          <NextLink passHref legacyBehavior href='/'>
            <Link color='text'>
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
          </NextLink>
        </Navbar.Brand>
        {isSigned ? (
          <Navbar.Content
            css={{ '@sm': { marginLeft: 'auto', marginRight: '$12' } }}
            hideIn='xs'>
            <NextLink passHref legacyBehavior href='/boards'>
              <Link>
                <IconKanban fill={theme?.colors?.primary?.value} />
                <Text size='large'>{t('Boards')}</Text>
              </Link>
            </NextLink>
            <NextLink passHref legacyBehavior href='#'>
              <Link onClick={handleCreateBoard}>
                <IconKanbanAdd fill={theme?.colors?.primary?.value} />
                <Text size='large'>{t('Create Board')}</Text>
              </Link>
            </NextLink>
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
              <Button
                auto
                light
                onClick={() => {
                  setAction('signIn')
                  toggle()
                }}>
                <Text>{t('Sign In')}</Text>
              </Button>
              <Button
                auto
                flat
                onClick={() => {
                  setAction('signUp')
                  toggle()
                }}>
                <Text>{t('Sign Up')}</Text>
              </Button>
            </>
          )}
        </Navbar.Content>
        <Navbar.Collapse>
          {isSigned ? (
            <>
              <Navbar.CollapseItem>
                <NextLink passHref legacyBehavior href='/boards'>
                  <Link>
                    <IconKanban fill={theme?.colors?.primary?.value} />
                    <Text size='large'>{t('Boards')}</Text>
                  </Link>
                </NextLink>
              </Navbar.CollapseItem>
              <Navbar.CollapseItem>
                <NextLink passHref legacyBehavior href='#'>
                  <Link onClick={handleCreateBoard}>
                    <IconKanbanAdd fill={theme?.colors?.primary?.value} />
                    <Text size='large'>{t('Create Board')}</Text>
                  </Link>
                </NextLink>
              </Navbar.CollapseItem>
              <Navbar.CollapseItem>
                <Link
                  color='error'
                  css={{ paddingLeft: '$12' }}
                  href='#'
                  onClick={signOutAction}>
                  {`${t('Sign Out')} (${userName})`}
                </Link>
              </Navbar.CollapseItem>
            </>
          ) : (
            <>
              <Navbar.CollapseItem>
                <Button
                  auto
                  light
                  css={{ ml: '$11' }}
                  onClick={() => {
                    setAction('signIn')
                    toggle()
                  }}>
                  <Text>{t('Sign In')}</Text>
                </Button>
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

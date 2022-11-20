import { useTheme as useNextTheme } from 'next-themes'
import { Button, Popover, Row, Switch, Text, useTheme } from '@nextui-org/react'
import { Navbar, Link } from '@nextui-org/react'
import NextLink from 'next/link'
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
  const dispatch = useAppDispatch()
  const isSigned = useAppSelector((state) => state.user.token)
  const userName = useAppSelector((state) => state.user.name)
  const { t } = useTranslation('common')

  const { isShowing: isModalShowing, toggle: toggleModal } = useModal()
  const [signUserAction, setSignUserAction] = useState('')
  const [scroll, setScroll] = useState(false)

  const [isCreateBoardOpen, setIsCreateBoardOpen] = useState(false)
  const [isCreateBoardSmOpen, setIsCreateBoardSmOpen] = useState(false)

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
    dispatch(
      setUser({
        token: null,
        name: null,
        login: null,
        _id: null,
        password: null,
      })
    )
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
              <Link css={{ px: 5 }}>
                <IconKanban fill={theme?.colors?.primary?.value} />
                <Text size='large'>{t('Boards')}</Text>
              </Link>
            </NextLink>
            <Popover
              isBordered
              isOpen={isCreateBoardOpen}
              onOpenChange={setIsCreateBoardOpen}>
              <Popover.Trigger>
                <Button auto light css={{ px: 5 }}>
                  <IconKanbanAdd fill={theme?.colors?.primary?.value} />
                  <Text size='large'>{t('Create Board')}</Text>
                </Button>
              </Popover.Trigger>
              <Popover.Content>
                <PopoverAddBoard
                  isOpen={isCreateBoardOpen}
                  setIsOpen={setIsCreateBoardOpen}
                />
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
            <>
              <Link color='inherit' href='#' onClick={signOutAction}>
                <Text>{t('Sign Out')}&nbsp;</Text>
                <Text as='span' hideIn='sm'>{`(${userName})`}</Text>
              </Link>

              <NextLink passHref legacyBehavior href='/profile'>
                <Link>
                  <Text
                    size='$2xl'
                    css={{
                      width: '40px',
                      height: '40px',
                      marginRight: '5px',
                      border: '1px solid #000',
                      borderRadius: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {userName!.slice(0, 2)}
                  </Text>
                  <Text size='large'>{userName}</Text>
                </Link>
              </NextLink>
            </>
          ) : (
            <>
              <Button
                auto
                light
                onClick={() => {
                  setSignUserAction('signIn')
                  toggleModal()
                }}>
                <Text>{t('Sign In')}</Text>
              </Button>
              <Button
                auto
                flat
                onClick={() => {
                  setSignUserAction('signUp')
                  toggleModal()
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
                  <Link css={{ px: 5 }}>
                    <IconKanban fill={theme?.colors?.primary?.value} />
                    <Text size='large'>{t('Boards')}</Text>
                  </Link>
                </NextLink>
              </Navbar.CollapseItem>
              <Navbar.CollapseItem>
                <Popover
                  isBordered
                  isOpen={isCreateBoardSmOpen}
                  onOpenChange={setIsCreateBoardSmOpen}>
                  <Popover.Trigger>
                    <Button auto light css={{ px: 5 }}>
                      <IconKanbanAdd fill={theme?.colors?.primary?.value} />
                      <Text size='large'>{t('Create Board')}</Text>
                    </Button>
                  </Popover.Trigger>
                  <Popover.Content>
                    <PopoverAddBoard
                      isOpen={isCreateBoardSmOpen}
                      setIsOpen={setIsCreateBoardSmOpen}
                    />
                  </Popover.Content>
                </Popover>
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

              <Navbar.CollapseItem>
                <NextLink passHref legacyBehavior href='/profile'>
                  <Link>
                    <Text
                      size='$2xl'
                      css={{
                        width: '45px',
                        height: '45px',
                        marginRight: '5px',
                        border: '1px solid #000',
                        borderRadius: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      {userName!.slice(0, 2)}
                    </Text>
                    <Text size='large'>{userName}</Text>
                  </Link>
                </NextLink>
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
                    setSignUserAction('signIn')
                    toggleModal()
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
                    setSignUserAction('signUp')
                    toggleModal()
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
      {isModalShowing &&
        ReactDOM.createPortal(
          <ModalWindow
            isShowing={isModalShowing}
            hide={toggleModal}
            action={signUserAction}
          />,
          document.body
        )}
    </>
  )
}

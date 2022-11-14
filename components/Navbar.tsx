import { useTheme as useNextTheme } from 'next-themes'
import { Button, Spacer, Switch, Text, useTheme } from '@nextui-org/react'
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
import { useAppDispatch, useAppSelector } from '../features/hooks'
import { useSignInMutation } from '../features/auth/authApi'

// Import translations
import { useTranslation } from 'next-i18next'
import { setUser } from '../features/auth/userSlice'

export default function Header() {
  const { setTheme } = useNextTheme()
  const { isDark, theme } = useTheme()
  const [login, { isLoading }] = useSignInMutation()
  const dispatch = useAppDispatch()
  const isSigned = useAppSelector((state) => state.user.token)
  const userName = useAppSelector((state) => state.user.name)
  const { t } = useTranslation('common')

  const signInAction = async () => {
    try {
      const userData = await login({
        login: 'TestUser',
        password: 'TestUserPwd',
      }).unwrap()
      dispatch(setUser(userData))
    } catch {}
  }

  return (
    <Navbar shouldHideOnScroll variant='sticky'>
      <Navbar.Toggle showIn='xs' />
      <Navbar.Brand css={{ '@sm': { marginRight: '$12' } }}>
        <Link href='/' color='text'>
          <Image
            src={logo_small}
            width='50'
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
          <Navbar.Link href='#'>
            <IconKanbanAdd fill={theme?.colors?.primary?.value} />
            <Text size='large'>{t('Create Board')}</Text>
          </Navbar.Link>
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
          <Navbar.Link
            color='inherit'
            href='#'
            // onClick={() => dispatch(signOut())}
          >
            <Text>{t('Sign Out')}&nbsp;</Text>
            <Text as='span' hideIn='sm'>{`(${userName})`}</Text>
          </Navbar.Link>
        ) : (
          <>
            <Navbar.Link color='inherit' href='#' onClick={signInAction}>
              {t('Sign In')}
            </Navbar.Link>
            <Navbar.Link color='inherit' href='#'>
              <Button auto flat onClick={signInAction}>
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
                // onClick={() => dispatch(signOut())}
              >
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
                onClick={signInAction}>
                {t('Sign In')}
              </Link>
            </Navbar.CollapseItem>
            <Navbar.CollapseItem>
              <Link
                color='inherit'
                css={{ paddingLeft: '$4' }}
                onClick={signInAction}>
                <Button auto flat href='#'>
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

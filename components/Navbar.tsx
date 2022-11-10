import { useTheme as useNextTheme } from 'next-themes'
import {
  Button,
  Dropdown,
  Switch,
  SwitchEvent,
  Text,
  useTheme,
} from '@nextui-org/react'
import { Navbar, Link } from '@nextui-org/react'
import logo_small from '../assets/logo/logo_small.svg'
import Image from 'next/image'
import { Trans } from '@lingui/macro'
import { IconSun } from './icons/icon_sun'
import { IconMoon } from './icons/icon_moon'
import { IconKanban } from './icons/icon_kanban'
import { IconKanbanAdd } from './icons/icon_kanban_add'
import { useAppDispatch, useAppSelector } from '../features/hooks'
import { signIn, signOut } from '../features/userSlice';
import LangSwitcher from '../utils/LangSwitcher'

export default function Header() {
  const { setTheme } = useNextTheme()
  const { isDark, theme } = useTheme()
  const dispatch = useAppDispatch();
  const isSigned = useAppSelector((state) => state.user.isSigned);

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
            <Text size='large'><Trans>Boards</Trans></Text>
          </Navbar.Link>
          <Navbar.Link href='#'>
            <IconKanbanAdd fill={theme?.colors?.primary?.value} />
            <Text size='large'><Trans>Create Board</Trans></Text>
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
          onChange={(e: SwitchEvent) => setTheme(e.target.checked ? 'dark' : 'light')}
        />
        <LangSwitcher />
      </Navbar.Content>
      <Navbar.Content hideIn='xs'>
        {isSigned ? (
          <Navbar.Link color='inherit' href='#' onClick={() => dispatch(signOut())}>
            <Trans>Sign Out</Trans>
          </Navbar.Link>
        ) : (
          <>
            <Navbar.Link color='inherit' href='#' onClick={() => dispatch(signIn())}>
            <Trans>Sign In</Trans>
            </Navbar.Link>
            <Navbar.Link color='inherit' href='#'>
              <Button auto flat onClick={() => dispatch(signIn())}>
                <Text><Trans>Sign Up</Trans></Text>
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
                <Text size='large'><Trans>Boards</Trans></Text>
              </Link>
            </Navbar.CollapseItem>
            <Navbar.CollapseItem>
              <Link href='#'>
                <IconKanbanAdd fill={theme?.colors?.primary?.value} />
                <Text size='large'><Trans>Create Board</Trans></Text>
              </Link>
            </Navbar.CollapseItem>
            <Navbar.CollapseItem>
              <Link color='error' css={{paddingLeft: '$12'}} href='#'  onClick={() => dispatch(signOut())}>
              <Trans>Sign Out</Trans>
              </Link>
            </Navbar.CollapseItem>
          </>
        ) : (
          <>
            <Navbar.CollapseItem>
              <Link color='inherit' href='#' css={{paddingLeft: '$11'}}  onClick={() => dispatch(signIn())}>
              <Trans>Sign In</Trans>
              </Link>
            </Navbar.CollapseItem>
            <Navbar.CollapseItem>
              <Link color='inherit' css={{paddingLeft: '$4'}} onClick={() => dispatch(signIn())}>
                <Button auto flat href='#' >
                  <Text><Trans>Sign Up</Trans></Text>
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

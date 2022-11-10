import { useTheme as useNextTheme } from 'next-themes'
import {
  Button,
  Dropdown,
  Switch,
  Text,
  useTheme,
} from '@nextui-org/react'
import { Navbar, Link } from '@nextui-org/react'
import logo_small from '../assets/logo/logo_small.svg'
import Image from 'next/image'
import { IconSun } from './icons/icon_sun'
import { IconMoon } from './icons/icon_moon'
import { Key, useState } from 'react'
import { IconKanban } from './icons/icon_kanban'
import { IconKanbanAdd } from './icons/icon_kanban_add'
import { useAppDispatch, useAppSelector } from '../features/hooks'
import { changeLang, signIn, signOut } from '../features/userSlice';

export default function Header() {
  const { setTheme } = useNextTheme()
  const { isDark, theme } = useTheme()
  const dispatch = useAppDispatch();
  const lang = useAppSelector((state) => state.user.lang);
  const isSigned = useAppSelector((state) => state.user.isSigned);

  const languageHandler = (keys: 'all' | Set<Key>) => {
    dispatch(changeLang(String(...keys)))
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
            <Text size='large'>Boards</Text>
          </Navbar.Link>
          <Navbar.Link href='#'>
            <IconKanbanAdd fill={theme?.colors?.primary?.value} />
            <Text size='large'>Create Board</Text>
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
        <Dropdown>
          <Dropdown.Button light css={{ '@sm': { marginRight: '$12' } }}>
            {lang}
          </Dropdown.Button>
          <Dropdown.Menu
            aria-label='Change Language'
            disallowEmptySelection
            selectionMode='single'
            selectedKeys={lang}
            onSelectionChange={languageHandler}>
            <Dropdown.Item key='EN'>English</Dropdown.Item>
            <Dropdown.Item key='RU'>Русский</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Navbar.Content>
      <Navbar.Content hideIn='xs'>
        {isSigned ? (
          <Navbar.Link color='inherit' href='#' onClick={() => dispatch(signOut())}>
            Sign Out
          </Navbar.Link>
        ) : (
          <>
            <Navbar.Link color='inherit' href='#' onClick={() => dispatch(signIn())}>
              Sign In
            </Navbar.Link>
            <Navbar.Link color='inherit' href='#'>
              <Button auto flat onClick={() => dispatch(signIn())}>
                <Text>Sign Up</Text>
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
                <Text size='large'>Boards</Text>
              </Link>
            </Navbar.CollapseItem>
            <Navbar.CollapseItem>
              <Link href='#'>
                <IconKanbanAdd fill={theme?.colors?.primary?.value} />
                <Text size='large'>Create Board</Text>
              </Link>
            </Navbar.CollapseItem>
            <Navbar.CollapseItem>
              <Link color='error' css={{paddingLeft: '$12'}} href='#'  onClick={() => dispatch(signOut())}>
                Sign Out
              </Link>
            </Navbar.CollapseItem>
          </>
        ) : (
          <>
            <Navbar.CollapseItem>
              <Link color='inherit' href='#' css={{paddingLeft: '$11'}}  onClick={() => dispatch(signIn())}>
                Sign In
              </Link>
            </Navbar.CollapseItem>
            <Navbar.CollapseItem>
              <Link color='inherit' css={{paddingLeft: '$4'}} onClick={() => dispatch(signIn())}>
                <Button auto flat href='#' >
                  <Text>Sign Up</Text>
                </Button>
              </Link>
            </Navbar.CollapseItem>
          </>
        )}
        <Navbar.CollapseItem>
          <Dropdown>
            <Dropdown.Button light>
              {lang}
            </Dropdown.Button>
            <Dropdown.Menu
              aria-label='Change Language'
              disallowEmptySelection
              selectionMode='single'
              selectedKeys={lang}
              onSelectionChange={languageHandler}>
              <Dropdown.Item key='EN'>English</Dropdown.Item>
              <Dropdown.Item key='RU'>Русский</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
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

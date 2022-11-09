import styles from './layout.module.css'
import { useTheme as useNextTheme } from 'next-themes'
import { Button, Dropdown, Switch, Text, useTheme } from '@nextui-org/react'
import { Navbar, Link } from '@nextui-org/react'
import logo_small from '../assets/logo/logo_small.svg'
import Image from 'next/image'
import { IconSun } from './icons/icon_sun'
import { IconMoon } from './icons/icon_moon'
import { Key, useState } from 'react'
import { IconKanban } from './icons/icon_kanban'
import { IconKanbanAdd } from './icons/icon_kanban_add'

export default function Header() {
  const { setTheme } = useNextTheme()
  const { isDark, theme } = useTheme()
  const [lang, setLang] = useState('EN')
  const [isSigned, setIsSigned] = useState(true)

  const languageHandler = (keys: 'all' | Set<Key>) => {
    setLang(String(...keys))
  }

  return (
    <Navbar shouldHideOnScroll variant='sticky'>
      <Navbar.Brand>
        <Link href='/' color='text'>
          <Image
            src={logo_small}
            width='50'
            style={{ marginRight: '10px' }}
            alt=''
          />
          <Text b size='$2xl' color='inherit' hideIn='xs'>
            CMA
          </Text>
        </Link>
      </Navbar.Brand>
      <Navbar.Content>
        {isSigned ? (
          <Navbar.Content hideIn='xs'>
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
      </Navbar.Content>
      <Navbar.Content>
        <Switch
          checked={isDark}
          iconOff={<IconSun />}
          iconOn={<IconMoon />}
          onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
        />
        <Dropdown>
          <Dropdown.Button flat light css={{ marginRight: '40px' }}>
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
        {isSigned ? (
          <Navbar.Link color='inherit' href='#'>
            Sign Out
          </Navbar.Link>
        ) : (
          <>
            <Navbar.Link color='inherit' href='#'>
              Sign In
            </Navbar.Link>
            <Navbar.Item>
              <Button auto flat as={Link} href='#'>
                Sign Up
              </Button>
            </Navbar.Item>
          </>
        )}
      </Navbar.Content>
    </Navbar>
  )
}

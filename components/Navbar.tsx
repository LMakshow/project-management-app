import styles from './layout.module.css'
import { useTheme as useNextTheme } from 'next-themes'
import { Button, Dropdown, Switch, Text, useTheme } from '@nextui-org/react'
import { Navbar } from '@nextui-org/react'
import logo_small from '../assets/logo/logo_small.svg'
import Image from 'next/image'
import { IconSun } from './icons/icon_sun'
import { IconMoon } from './icons/icon_moon'
import Link from 'next/link'
import { Key, useMemo, useState } from 'react'

export default function Header() {
  const { setTheme } = useNextTheme()
  const { isDark } = useTheme()
  const [lang, setLang] = useState('EN')
  const [isSigned, setIsSigned] = useState(false)

  const languageHandler = (keys: "all" | Set<Key>) => {
    setLang(String(...keys));
  }

  return (
    <Navbar shouldHideOnScroll variant='sticky'>
      <Navbar.Brand>
        <Image
          src={logo_small}
          width='50'
          style={{ marginRight: '10px' }}
          alt=''
        />
        <Text b size='$2xl' color='inherit' hideIn='xs'>
          CMA
        </Text>
      </Navbar.Brand>
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
        {isSigned ? null : (
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

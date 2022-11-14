import Link from 'next/link'
import { useRouter } from 'next/router'
import { Dropdown } from '@nextui-org/react'
import { Key } from 'react'

export default function LangSwitcher() {
  const { locale, locales, route, push } = useRouter()

  const langChange = (key: Key) => {
    push(route, route, { locale: key as string })
  }

  return (
    <Dropdown>
      <Dropdown.Button light css={{ '@sm': { marginRight: '$12' } }}>
        {String(locale).toLocaleUpperCase()}
      </Dropdown.Button>
      <Dropdown.Menu aria-label='Change Language' onAction={langChange}>
        <Dropdown.Item key='en'>English</Dropdown.Item>
        <Dropdown.Item key='ru'>Русский</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

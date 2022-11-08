import styles from './layout.module.css'
import { useTheme as useNextTheme } from 'next-themes'
import { Switch, useTheme } from '@nextui-org/react'

export default function Navbar() {
  const { setTheme } = useNextTheme()
  const { isDark, type } = useTheme()

  return (
    <header className={styles.header}>
      <p>Navbar</p>
      <div>
        The current theme is: {type}
        <Switch
          checked={isDark}
          onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
        />
      </div>
    </header>
  )
}

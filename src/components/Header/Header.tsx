import type { FC, PropsWithChildren } from 'react'
import { Logo, Button, UserGroup } from 'components'
import styles from './Header.module.scss'
import { useNavigate } from 'react-router'
import { useStore } from 'store/AuthStore'

interface HeaderProps {
  color?: 'black' | 'white'
  isButtonHided?: boolean
}

export const Header: FC<PropsWithChildren & HeaderProps> = ({ color = 'black', isButtonHided }) => {
  const navigate = useNavigate()
  const user = useStore((state) => state.user)

  return (
    <header className={styles.header}>
      <Logo color={color} />
      {isButtonHided || user ? null : (
        <Button onClick={() => navigate('/auth')} variant="green" width={120}>
          Войти
        </Button>
      )}

      {user && <UserGroup color={color} login={user.login} />}
    </header>
  )
}

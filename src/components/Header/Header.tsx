import type { FC, PropsWithChildren } from 'react'
import { Logo, Button } from 'components'
import styles from './Header.module.scss'
import { useNavigate } from 'react-router'

interface HeaderProps {
  color?: 'black' | 'white'
  isButtonHided?: boolean
}

export const Header: FC<PropsWithChildren & HeaderProps> = ({ color = 'black', isButtonHided }) => {
  const navigate = useNavigate()

  return (
    <header className={styles.header}>
      <Logo color={color} />
      {isButtonHided ? null : (
        <Button onClick={() => navigate('/auth')} variant="green" width={120}>
          Войти
        </Button>
       )}
    </header>
  )
}

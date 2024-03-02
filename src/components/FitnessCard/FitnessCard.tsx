import { Button } from 'components'
import type { FC, PropsWithChildren } from 'react'
import styles from './FitnessCard.module.scss'

interface FitnessCardProps {
  variant?: 'main' | 'myProfile'
  image?: string
  hasButton?: boolean
  onClick?: () => void
  buttonOnClick?: () => void
}

export const FitnessCard: FC<PropsWithChildren & FitnessCardProps> = ({
  children,
  image,
  hasButton = false,
  variant = 'main',
  onClick,
  buttonOnClick,
}) => (
  <div
    onClick={onClick}
    style={{ background: `url(${image})` }}
    className={`${styles.card} ${variant === 'myProfile' && styles.myProfile}`}
  >
    {children}

    {/* Здесь можно было бы использовать проверку variant === 'myProfile', но пока оставлю так
    возможно где-то придется разграничивать логику наличия кнопки и варианта отображения */}

    {hasButton && (
      <Button variant="green" width={150} onClick={buttonOnClick}>
        Перейти →
      </Button>
    )}
  </div>
)

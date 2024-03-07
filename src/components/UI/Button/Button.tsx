import type { FC, ButtonHTMLAttributes } from 'react'
import styles from './Button.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'base' | 'green' | 'transparent' | 'red'
  width?: number
  fontSize?: number
}

export const Button: FC<ButtonProps> = ({ children, variant = 'base', width = 275, fontSize = 24, ...otherProps }) => {
  const currentVariantClass: string = styles[variant]

  return (
    <button
      style={{ width: `${width}px`, fontSize: `${fontSize}px` }}
      type="button"
      className={`${styles.btn} ${currentVariantClass}`}
      {...otherProps}
    >
      {children}
    </button>
  )
}

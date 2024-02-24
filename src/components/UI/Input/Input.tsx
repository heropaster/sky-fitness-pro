import type { FC } from 'react'
import styles from './Input.module.scss'

interface InputProps {
  inputType: string
  value: string | number
  placeholderText: string
  onValueChange: (value: string | number) => void
}

export const Input: FC<InputProps> = ({ inputType, value, placeholderText, onValueChange }) => (
  <input
    className={styles.input}
    type={inputType}
    value={value}
    placeholder={placeholderText}
    onChange={(event) => onValueChange(event.target.value)}
  />
)

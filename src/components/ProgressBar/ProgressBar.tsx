import { FC } from 'react'
import styles from './ProgressBar.module.scss'

interface ProgressBarProps {
  maxValue: number
  currentValue: number
  variant: 'blue' | 'orange' | 'purple'
}

export const ProgressBar: FC<ProgressBarProps> = ({ maxValue, currentValue, variant }) => {
  const containerVariantClass: string = styles[`container-${variant}`]
  const fillerVariantClass: string = styles[`filler-${variant}`]

  const getCurrentProgress: () => number = () => {
    const currentProgress = (currentValue * 100) / maxValue
    return Math.floor(currentProgress)
  }

  return (
    <div className={`${styles.container} ${containerVariantClass}`}>
      <div className={`${styles.filler} ${fillerVariantClass}`} style={{ width: `${getCurrentProgress()}%` }}>
        <span className={styles.progressValue}>{`${getCurrentProgress()}%`}</span>
      </div>
    </div>
  )
}

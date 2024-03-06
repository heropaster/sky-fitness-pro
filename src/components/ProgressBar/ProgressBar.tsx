import type { FC } from 'react'
import styles from './ProgressBar.module.scss'

interface ProgressBarProps {
  maxValue?: number
  currentValue: number
  variant?: 'blue' | 'orange' | 'purple'
}

export const ProgressBar: FC<ProgressBarProps> = ({ maxValue = 100, currentValue, variant = 'blue' }) => {
  const containerVariantClass: string = styles[`container-${variant}`]
  const fillerVariantClass: string = styles[`filler-${variant}`]

  const currentProgress = Math.floor((currentValue * 100) / maxValue)

  return (
    <div className={`${styles.container} ${containerVariantClass}`}>
      <div
        className={`${styles.filler} ${fillerVariantClass}`}
        style={currentProgress < 100 ? { width: `${currentProgress}%` } : { width: `100%` }}
      >
        {currentProgress >= 25 && currentProgress < 100 && (
          <span className={styles.leftProgressValue}>{`${currentProgress}%`}</span>
        )}
        {currentProgress >= 100 && <span className={styles.leftProgressValue}>{`100%`}</span>}
      </div>
      {currentProgress < 25 && (
        <span
          className={styles.rightProgressValue}
          style={{ left: `${currentProgress + 4}%` }}
        >{`${currentProgress}%`}</span>
      )}
    </div>
  )
}

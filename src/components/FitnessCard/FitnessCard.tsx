import { Button } from 'components'
import { useState, type FC, type PropsWithChildren } from 'react'
import styles from './FitnessCard.module.scss'
import type { IWorkouts } from 'types'
import { useNavigate } from 'react-router-dom'
import type { Dispatch, SetStateAction } from 'react'

interface FitnessCardProps {
  variant?: 'main' | 'myProfile'
  image?: string
  onClick?: () => void
  userWorkouts?: { [index: string]: [boolean, ...number[]] }
  workoutsFromDB?: IWorkouts
  course: string[]
  setCardEditPopUp: Dispatch<SetStateAction<'delete' | 'add' | null>>
  setEditPopUpCourse: Dispatch<SetStateAction<string[]>>
}

export const FitnessCard: FC<PropsWithChildren & FitnessCardProps> = ({
  children,
  image,
  variant = 'main',
  onClick,
  userWorkouts,
  workoutsFromDB,
  course,
  setCardEditPopUp,
  setEditPopUpCourse,
}) => {
  const [isFlipped, setIsFlipped] = useState(false)
  const navigate = useNavigate()

  const resultingOnClick =
    variant === 'myProfile'
      ? () => {
          setIsFlipped(!isFlipped)
        }
      : onClick

  // Здесь можно вынести li-шку в отдельный компонент, но пока заморачиваться не захотел
  const workoutElements =
    userWorkouts &&
    workoutsFromDB &&
    Object.keys(userWorkouts).map((workout, index) => {
      const [heading, ...description] = workoutsFromDB[workout].name.split('/')
      const isDone = userWorkouts[workout][0]

      return (
        <li
          onClick={() => navigate(`/workouts/${course[0]}/${workout}`)}
          className={`${styles.workoutItem} ${isDone && styles.done}`}
          key={'workout' + index}
        >
          <h3 className={styles.workoutTitle}>{heading}</h3>
          <p className={styles.description}>{description.join('/')}</p>
        </li>
      )
    })

  return (
    <div className={`${styles.box} `}>
      <div
        onClick={resultingOnClick}
        className={`${styles.back} ${isFlipped && styles.flip_back} ${variant === 'myProfile' && styles.myProfile}`}
      >
        <div className={styles.workoutsBox}>
          {variant === 'myProfile' && <ul className={styles.list}>{workoutElements}</ul>}
        </div>
      </div>

      <div
        onClick={resultingOnClick}
        style={{ background: `url(${image})` }}
        className={`${styles.card} ${isFlipped && styles.flip_face} ${variant === 'myProfile' && styles.myProfile}`}
      >
        {children}

        {variant === 'myProfile' && (
          <Button variant="green" width={150}>
            Перейти →
          </Button>
        )}
      </div>
      {variant === 'myProfile' && (
        <Button
          onClick={() => {
            setCardEditPopUp('delete')
            setEditPopUpCourse(course)
          }}
          variant="red"
          width={145}
        >
          Удалить
        </Button>
      )}
    </div>
  )
}

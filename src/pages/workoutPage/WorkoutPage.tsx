import { Header, Button, ProgressBar, ProgressModal } from 'components'
import { useWorkoutQuery, useUserStateQuery, useCourseQuery } from 'hooks'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { createValidVideoUrl } from 'helpers/helpers'
import styles from './WorkoutPage.module.scss'

export const WorkoutPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { id = '', course = '' } = useParams()

  const { data: userState } = useUserStateQuery()
  const { data: courseFromBD } = useCourseQuery(course)
  const { data: workout, isSuccess } = useWorkoutQuery(id)

  const courseName = courseFromBD?.nameRU
  const workoutNumber = (courseFromBD?.workouts.indexOf(id) as number) + 1
  const progressArray = userState ? userState.progress[course][id] : [false]
  const [, ...currentProgress] = progressArray

  const handleOpenModal = () => {
    setIsModalVisible(true)
  }

  const handleCloseModal = () => {
    setIsModalVisible(false)
  }

  return workout ? (
    <div className={isModalVisible ? styles.modalContainer : styles.courseContainer}>
      <div className={styles.content}>
        <Header />
        <h1 className={styles.title}>{courseName}</h1>
        <p className={styles.heading}>{isSuccess && workout.name}</p>
        <iframe
          className={styles.video}
          src={createValidVideoUrl(isSuccess ? workout.video : '')}
          frameBorder={0}
          allowFullScreen
        />
        {workout.exercises && (
          <div className={styles.description}>
            <div className={styles.tasks}>
              <p className={styles.heading}>Упражнения</p>
              <ul className={styles.tasksList}>
                {isSuccess &&
                  workout.exercises &&
                  workout.exercises.map((exercise) => (
                    <li key={workout._id + exercise.name} className={styles.tasksListItem}>
                      {exercise.name}
                    </li>
                  ))}
              </ul>
              <Button variant="base" fontSize={18} onClick={handleOpenModal}>
                Заполнить свой прогресс
              </Button>
            </div>
            <div className={styles.progress}>
              <p className={styles.heading}>Мой прогресс по тренировке {workoutNumber}:</p>
              <div className={styles.progressItems}>
                {isSuccess &&
                  workout.exercises.map((exercise, index) => (
                    <div key={workout._id + exercise.name} className={styles.progressItem}>
                      <p className={styles.progressItemText}>{exercise.name.split(' (')[0]}</p>
                      <ProgressBar currentValue={currentProgress[index] as number} maxValue={exercise.quantity} />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
      {isModalVisible && <ProgressModal closeModal={handleCloseModal} />}
    </div>
  ) : null
}

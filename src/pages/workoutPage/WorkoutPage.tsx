import { Header, Button, ProgressBar, ProgressModal } from 'components'
import { useWorkoutQuery } from 'hooks'
import { useState } from 'react'
// import { useParams } from 'react-router-dom'
import videoPoster from './img/videoPoster.png'
import videoButtonPlay from './img/videoButtonPlay.svg'
import styles from './WorkoutPage.module.scss'

export const WorkoutPage = () => {
  // const { id } = useParams()
  const id = '3yvozj'

  if (!id) {
    return
  }

  const { data, isSuccess } = useWorkoutQuery(id)

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

  const handleOpenModal = () => {
    setIsModalVisible(true)
  }

  const handleCloseModal = () => {
    setIsModalVisible(false)
  }

  return (
    <div className={isModalVisible ? styles.modalContainer : styles.courseContainer}>
      <div className={styles.content}>
        <Header />
        <h1 className={styles.title}>Йога</h1>
        <p className={styles.heading}>{isSuccess && data.name}</p>
        <div className={styles.videoWrapper}>
          <img className={styles.videoButton} src={videoButtonPlay} />
          <video className={styles.video} src={isSuccess ? data.video : ''} poster={videoPoster} />
        </div>
        <div className={styles.description}>
          <div className={styles.tasks}>
            <p className={styles.heading}>Упражнения</p>
            <ul className={styles.tasksList}>
              {isSuccess &&
                data.exercises.map((exercise) => (
                  <li key={data._id} className={styles.tasksListItem}>
                    {exercise.name}
                  </li>
                ))}
            </ul>
            <Button variant="base" fontSize={18} onClick={handleOpenModal}>
              Заполнить свой прогресс
            </Button>
          </div>
          <div className={styles.progress}>
            <p className={styles.heading}>Мой прогресс по тренировке 2:</p>
            <div className={styles.progressItems}>
              {isSuccess &&
                data.exercises.map((exercise) => (
                  <div key={data._id} className={styles.progressItem}>
                    <p className={styles.progressItemText}>{exercise.name.split(' (')[0]}</p>
                    <ProgressBar currentValue={45} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      {isModalVisible && <ProgressModal closeModal={handleCloseModal} />}
    </div>
  )
}

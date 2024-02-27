import { Header, Button, ProgressBar, ProgressModal } from 'components'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { getWorkoutById } from 'services/api'
import videoPoster from './img/videoPoster.png'
import videoButtonPlay from './img/videoButtonPlay.svg'
import styles from './WorkoutPage.module.scss'

export const WorkoutPage = () => {
  const { id } = useParams()

  if (id) {
    getWorkoutById(id).then((workout) => {
      console.log(workout)
    })
  }

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
        <p className={styles.heading}>Красота и здоровье / Йога на каждый день / 2 день</p>
        <div className={styles.videoWrapper}>
          <img className={styles.videoButton} src={videoButtonPlay} />
          <video className={styles.video} poster={videoPoster} />
        </div>
        <div className={styles.description}>
          <div className={styles.tasks}>
            <p className={styles.heading}>Упражнения</p>
            <ul className={styles.tasksList}>
              <li className={styles.tasksListItem}>Наклон вперед (10 повторений)</li>
              <li className={styles.tasksListItem}>Наклон назад (10 повторений)</li>
              <li className={styles.tasksListItem}>Поднятие ног, согнутых в коленях (5 повторений)</li>
            </ul>
            <Button variant="base" fontSize={18} onClick={handleOpenModal}>
              Заполнить свой прогресс
            </Button>
          </div>
          <div className={styles.progress}>
            <p className={styles.heading}>Мой прогресс по тренировке 2:</p>
            <div className={styles.progressItems}>
              <div className={styles.progressItem}>
                <p className={styles.progressItemText}>Наклоны вперед</p>
                <ProgressBar currentValue={45} />
              </div>
              <div className={styles.progressItem}>
                <p className={styles.progressItemText}>Наклоны назад</p>
                <ProgressBar currentValue={45} variant={'orange'} />
              </div>
              <div className={styles.progressItem}>
                <p className={styles.progressItemText}>Поднятие ног, согнутых в коленях</p>
                <ProgressBar currentValue={45} variant={'purple'} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalVisible && <ProgressModal closeModal={handleCloseModal} />}
    </div>
  )
}

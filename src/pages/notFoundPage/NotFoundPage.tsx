import { Button, Header } from 'components'
import styles from './NotFoundPage.module.scss'
import { useNavigate } from 'react-router-dom'

export const NotFoundPage = () => {
  const navigate = useNavigate()

  const onButtonClick = () => {
    navigate('/')
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Header />
        <div className={styles.wrapper}>
          <h1 className={styles.info}>
            404 <br /> <span className={styles.infoMessage}>Страница не обнаружена</span>
          </h1>
          <Button children={'На главную'} onClick={onButtonClick} />
        </div>
      </div>
    </div>
  )
}

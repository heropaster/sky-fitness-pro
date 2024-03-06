import sticker from './img/sticker.png'
import styles from './SuccessProgressModal.module.scss'

export const SuccessProgressModal = () => (
  <div className={styles.successProgressModal}>
    <p className={styles.successProgressModalText}>
      Ваш прогресс <br /> засчитан!
    </p>
    <img className={styles.successProgressModalSticker} src={sticker} />
  </div>
)

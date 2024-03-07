import styles from './SuccessProgressModal.module.scss'
import sticker from './img/sticker.png'

export const SuccessProgressModal = () => (
  <div className={styles.successProgressModal}>
    <p className={styles.successProgressModalText}>
      Ваш прогресс <br /> засчитан!
    </p>
    <img className={styles.successProgressModalSticker} src={sticker} />
  </div>
)

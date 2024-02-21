import { Input } from 'components/UI/Input/Input'
import { useState } from 'react'
import { Button } from 'components'
import sticker from './img/sticker.png'
import styles from './ProgressModal.module.scss'

export const ProgressModal = () => {
  const [firstValue, setFirstValue] = useState<string | number>('')
  const [secondValue, setSecondValue] = useState<string | number>('')
  const [thirdValue, setThirdValue] = useState<string | number>('')

  const [isResponseFinished, setIsResponseFinished] = useState<boolean>(false)

  const handleSetIsResponseFinished = () => {
    setIsResponseFinished(true)
  }

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        {isResponseFinished ? (
          <div className={styles.finishedModal}>
            <p className={styles.finishedModalText}>
              Ваш прогресс <br /> засчитан!
            </p>
            <img className={styles.finishedModalSticker} src={sticker} />
          </div>
        ) : (
          <>
            <p className={styles.title}>Мой прогресс</p>
            <div className={styles.responseBlockContainer}>
              <div className={styles.responseBlock}>
                <p className={styles.responseBlockText}>Сколько раз вы сделали наклоны вперед?</p>
                <Input
                  inputType="number"
                  value={firstValue}
                  onValueChange={(event) => setFirstValue(event)}
                  placeholderText="Введите значение"
                />
              </div>
              <div className={styles.responseBlock}>
                <p className={styles.responseBlockText}>Сколько раз вы сделали наклоны назад?</p>
                <Input
                  inputType="number"
                  value={secondValue}
                  onValueChange={(event) => setSecondValue(event)}
                  placeholderText="Введите значение"
                />
              </div>
              <div className={styles.responseBlock}>
                <p className={styles.responseBlockText}>Сколько раз вы сделали поднятие ног, согнутых в коленях?</p>
                <Input
                  inputType="number"
                  value={thirdValue}
                  onValueChange={(event) => setThirdValue(event)}
                  placeholderText="Введите значение"
                />
              </div>
            </div>
            <Button fontSize={18} variant="base" children="Отправить" onClick={handleSetIsResponseFinished} />
          </>
        )}
      </div>
    </div>
  )
}

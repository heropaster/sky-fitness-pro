import { Button } from 'components/UI/Button/Button.tsx'
import style from './Application.module.scss'
import image from 'assets/images/applicationImage.png'

export const Application = () => (
  <div className={style.container}>
    <p className={style.text}>
      Оставьте заявку на пробное занятие, мы свяжемся с вами,
      <br /> поможем с выбором направления и тренер, <br /> с которым тренировки принесут здоровье и радость!
    </p>
    <Button width={275} fontSize={18}>
      Записаться на тренировку
    </Button>
    <img className={style.image} src={image} alt="application" />
  </div>
)
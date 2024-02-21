import { Header, Button, FitnessCard } from 'components'
import sticker from './img/sticker.png'
import yogaImg from './img/yoga.png'
import stratchingImg from './img/stratching.png'
import danceImg from './img/dance.png'
import stepImg from './img/step.png'
import bodyflexImg from './img/bodyflex.png'

import style from './Main.module.scss'
import { useNavigate } from 'react-router-dom'

export const Main = () => {
  const history = useNavigate()

  const fakeState = [
    { title: 'Йога', img: yogaImg, course: 'yoga' },
    { title: 'Стретчинг', img: stratchingImg, course: 'stretching' },
    { title: 'Танцевальный фитнес', img: danceImg, course: 'dance' },
    { title: 'Степ-аэробика', img: stepImg, course: 'aerobics' },
    { title: 'Бодифлекс', img: bodyflexImg, course: 'bodyflex' },
  ]
  const cards = fakeState.map((card) => (
    <FitnessCard key={card.title} image={card.img} onClick={() => history(`courses/${card.course}`)}>
      {card.title}
    </FitnessCard>
  ))

  return (
    <div className={style.container}>
      <div className={style.content}>
        <Header color="white" />
        <h1 className={style.topTitle}>Онлайн-тренировки для занятий дома</h1>

        <div className={style.leadGroup}>
          <p className={style.leadText}>Начните заниматься спортом и улучшите качество жизни</p>
          <img className={style.sticker} src={sticker} alt="Измени свое тело за полгода" />
        </div>

        <div className={style.fitnessCards}>{cards}</div>

        <footer className={style.footer}>
          <Button onClick={() => window.scrollTo(0, 0)} variant="green" width={150}>
            Наверх ↑
          </Button>
        </footer>
      </div>
    </div>
  )
}

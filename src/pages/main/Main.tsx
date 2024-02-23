import { Header, Button, FitnessCard } from 'components'
import sticker from 'assets/img/sticker.png'
import yogaImg from 'assets/img/yoga.png'
import stratchingImg from 'assets/img/stratching.png'
import danceImg from 'assets/img/dance.png'
import stepImg from 'assets/img/step.png'
import bodyflexImg from 'assets/img/bodyflex.png'

import style from './Main.module.scss'

export const Main = () => {
  const fakeState = [
    { title: 'Йога', img: yogaImg },
    { title: 'Стретчинг', img: stratchingImg },
    { title: 'Танцевальный фитнес', img: danceImg },
    { title: 'Степ-аэробика', img: stepImg },
    { title: 'Бодифлекс', img: bodyflexImg },
  ]
  const cards = fakeState.map((card) => (
    <FitnessCard key={card.title} image={card.img}>
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

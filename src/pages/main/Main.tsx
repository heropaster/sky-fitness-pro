import { Header, Button, FitnessCard } from 'components'
import sticker from 'assets/img/sticker.png'
import yogaImg from 'assets/img/yoga.png'
import stratchingImg from 'assets/img/stratching.png'
import danceImg from 'assets/img/dance.png'
import stepImg from 'assets/img/step.png'
import bodyflexImg from 'assets/img/bodyflex.png'

import style from './Main.module.scss'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getAll, getAllWorkouts } from 'services/api'

export const Main = () => {
  const history = useNavigate()
  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => getAll('courses'),
    queryKey: ['courses', 'all'],
  })

  const { data: workouts } = useQuery({
    queryFn: () => getAllWorkouts(),
    queryKey: ['workouts', 'all'],
  })
  if (workouts) console.log('Это воркауты',Object.values(workouts))

  if (isLoading) return <div>Загрузка</div>
  if (isError) return <div>{error.message}</div>
  if (!data) return

  const imagesByIndex: Record<string, string> = {
    '6i67sm': stepImg,
    ab1c3f: yogaImg,
    kfpq8e: stratchingImg,
    q02a6i: bodyflexImg,
    ypox9r: danceImg,
  }

  const coursesArray = Object.values(data)

  const cardsElements = coursesArray.map((card) => (
    <FitnessCard key={card._id} image={imagesByIndex[card._id]} onClick={() => history(`courses/${card.nameEN}`)}>
      {card.nameRU}
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

        <div className={style.fitnessCards}>{cardsElements}</div>

        <footer className={style.footer}>
          <Button onClick={() => window.scrollTo(0, 0)} variant="green" width={150}>
            Наверх ↑
          </Button>
        </footer>
      </div>
    </div>
  )
}

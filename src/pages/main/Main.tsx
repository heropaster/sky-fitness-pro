import { Header, Button, FitnessCard, LoaderSpinner } from 'components'
import { useNavigate } from 'react-router-dom'
import { useAllCoursesQuery } from 'hooks'
import { imagesMap } from 'consts'
import sticker from 'assets/img/sticker.png'
import style from './Main.module.scss'

export const Main = () => {
  const history = useNavigate()
  const { data, isLoading, isError, error } = useAllCoursesQuery()

  if (isLoading) return <LoaderSpinner />
  if (isError) return <div>{error.message}</div>
  if (!data) return

  const coursesArray = Object.values(data)

  const cardsElements = coursesArray.map((card) => (
    <FitnessCard
      key={card._id}
      image={imagesMap[card._id]}
      onClick={() => history(`courses/${card.nameEN}`)}
      course={''}
    >
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
          <Button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} variant="green" width={150}>
            Наверх ↑
          </Button>
        </footer>
      </div>
    </div>
  )
}

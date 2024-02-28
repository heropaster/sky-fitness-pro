import { Header, Button, FitnessCard, ProfileEdit } from 'components'
// --- Импорт изображений ---
import yogaImg from 'assets/img/yoga.png'
import stratchingImg from 'assets/img/stratching.png'
import bodyflexImg from 'assets/img/bodyflex.png'
// --- Импорт изображений ---
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useStore } from 'store/AuthStore'

import style from './ProfilePage.module.scss'

export const ProfilePage = () => {
  const navigate = useNavigate()
  const user = useStore((store) => store.user)
  const login = user?.email
  const password = user?.password

  const [isPassVisible, setIsPassVisible] = useState<boolean>(false)
  const [popUp, setPopUp] = useState<'loginEdit' | 'passEdit' | null>(null)

  const fakeState = [
    { title: 'Йога', img: yogaImg },
    { title: 'Стретчинг', img: stratchingImg },
    { title: 'Бодифлекс', img: bodyflexImg },
  ]
  const cards = fakeState.map((card) => (
    <FitnessCard
      buttonOnClick={() => navigate('/')}
      variant="myProfile"
      key={card.title}
      hasButton={true}
      image={card.img}
    >
      {card.title}
    </FitnessCard>
  ))
  // (event: MouseEvent<Element, MouseEvent>) => void
  const closeFunc = () => {
    setPopUp(null)
  }

  return (
    <div className={style.container}>
      {popUp === 'loginEdit' && <ProfileEdit closeFunc={closeFunc} />}
      {popUp === 'passEdit' && <ProfileEdit variant="password" closeFunc={closeFunc} />}

      <div className={style.content}>
        <Header />
        <h1 className={style.title}>Мой профиль</h1>
        <p className={style.text}>Логин: &nbsp;&nbsp;&nbsp; {login}</p>
        <p className={`${style.text} ${style.password}`}>
          <span>Пароль: &nbsp;&nbsp;&nbsp; {isPassVisible ? password : '********'} </span>{' '}
          <Button
            onClick={(): void => {
              setIsPassVisible(!isPassVisible)
            }}
            variant="green"
            width={100}
            fontSize={20}
          >
            {isPassVisible ? 'Скрыть' : 'Показать'}
          </Button>
        </p>
        <div className={style.editBox}>
          <Button fontSize={18} onClick={() => setPopUp('loginEdit')}>
            Редактировать логин
          </Button>
          <Button fontSize={18} onClick={() => setPopUp('passEdit')}>
            Редактировать пароль
          </Button>
        </div>
        <h2 className={style.title}>Мои курсы</h2>

        <div className={style.cards}>{cards}</div>
      </div>
    </div>
  )
}

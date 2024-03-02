import { Header, Button, FitnessCard, ProfileEdit } from 'components'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useStore } from 'store/AuthStore'
import { useAllCoursesQuery, useUserStateQuery } from 'hooks'
import style from './ProfilePage.module.scss'
import { imagesMap } from 'consts'

export const ProfilePage = () => {
  const navigate = useNavigate()
  const user = useStore((store) => store.user)
  const login = user?.email
  const password = user?.password

  const userStateQuery = useUserStateQuery()
  const userState = userStateQuery.data

  const coursesQuery = useAllCoursesQuery()
  const coursesFromDB = coursesQuery.data

  const [isPassVisible, setIsPassVisible] = useState<boolean>(false)
  const [popUp, setPopUp] = useState<'loginEdit' | 'passEdit' | null>(null)

  const cardElements =
    userState && coursesFromDB ? (
      userState?.courses.map((course, index) => (
        <FitnessCard
          buttonOnClick={() => navigate(`/workouts/${coursesFromDB[course].nameEN}`)}
          variant="myProfile"
          key={'card' + index}
          hasButton={true}
          image={imagesMap[course]}
        >
          {coursesFromDB[course].nameRU}
        </FitnessCard>
      ))
    ) : (
      <div className={style.notFound}>Нет курсов</div>
    )

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

        <div className={style.cards}>{cardElements}</div>
      </div>
    </div>
  )
}

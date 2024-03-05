import { Header, Button, FitnessCard, ProfileEdit, YesNoPopUp } from 'components'
import { useState } from 'react'
import { useStore } from 'store/AuthStore'
import { useAllCoursesQuery, useAllWorkoutsQuery, useUserStateQuery } from 'hooks'
import style from './ProfilePage.module.scss'
import { imagesMap } from 'consts'

export const ProfilePage = () => {
  const user = useStore((store) => store.user)
  const login = user?.email
  const password = user?.password

  const { data: userState } = useUserStateQuery()
  const { data: coursesFromDB } = useAllCoursesQuery()
  const { data: workoutsFromDB } = useAllWorkoutsQuery()

  const [isPassVisible, setIsPassVisible] = useState<boolean>(false)
  const [authPopUp, setAuthPopUp] = useState<'loginEdit' | 'passEdit' | null>(null)
  const [isDropdownOpened, setIsDropdownOpened] = useState(false)
  const [cardEditPopUp, setCardEditPopUp] = useState<'delete' | 'add' | null>(null)
  const [editPopUpCourse, setEditPopUpCourse] = useState<string[]>([''])

  // const progressTemplate = {[editPopUpCourse]: }

  const closeFunc = () => {
    setAuthPopUp(null)
    setCardEditPopUp(null)
  }



  // Элементы карточек с курсами
  const cardElements =
    userState && coursesFromDB && workoutsFromDB ? (
      userState?.courses.map((course, index) => {
        const userWorkouts = userState.progress[course]

        return (
          <FitnessCard
            variant="myProfile"
            key={'card' + index}
            image={imagesMap[course]}
            userWorkouts={userWorkouts}
            workoutsFromDB={workoutsFromDB}
            course={[course, coursesFromDB[course].nameRU]}
            setCardEditPopUp={setCardEditPopUp}
            setEditPopUpCourse={setEditPopUpCourse}
          >
            {coursesFromDB[course].nameRU}
          </FitnessCard>
        )
      })
    ) : (
      <div className={style.notFound}>Нет курсов</div>
    )

  const noAddedCourses =
    userState && coursesFromDB && Object.keys(coursesFromDB).filter((course) => !userState.courses.includes(course))

  const noAddedCourseNames = coursesFromDB && noAddedCourses?.map((course) => [course, coursesFromDB[course].nameRU])

  // Элементы выпадающего меню на добавить курс
  const dropdownElements = noAddedCourseNames ? (
    noAddedCourseNames.map((course, index) => {
      const agreeFunc = ''

      return (
        <div
          onClick={() => {
            setEditPopUpCourse(course)
            setCardEditPopUp('add')
          }}
          className={style.dropdownItem}
          key={'noAdded' + index}
        >
          {course[1]}
        </div>
      )
    })
  ) : (
    <div>Все курсы уже добавлены</div>
  )

  return (
    <div className={style.container}>
      {authPopUp === 'loginEdit' && <ProfileEdit closeFunc={closeFunc} />}
      {authPopUp === 'passEdit' && <ProfileEdit variant="password" closeFunc={closeFunc} />}
      <YesNoPopUp variant={cardEditPopUp} course={editPopUpCourse} closeFunc={closeFunc} />

      <div className={style.content}>
        <Header />

        <h1 className={style.title}>Мой профиль</h1>

        <p className={style.text}>Логин: &nbsp;&nbsp;&nbsp; {login}</p>
        <p className={`${style.text} ${style.password}`}>
          <span>Пароль: &nbsp;&nbsp;&nbsp; {isPassVisible ? password : '********'} </span>

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
          <Button fontSize={18} onClick={() => setAuthPopUp('loginEdit')}>
            Редактировать логин
          </Button>

          <Button fontSize={18} onClick={() => setAuthPopUp('passEdit')}>
            Редактировать пароль
          </Button>
        </div>

        <h2 className={style.title}>
          Мои курсы&nbsp;&nbsp;&nbsp;&nbsp;
          <div className={style.btnContainer}>
            <Button onClick={() => setIsDropdownOpened(!isDropdownOpened)} width={170} variant="transparent">
              Добавить +
            </Button>

            <div className={`${style.dropdownCourses} ${isDropdownOpened && style.dropdown_open}`}>
              {dropdownElements}
            </div>
          </div>
        </h2>

        <div className={style.cards}>{cardElements}</div>
      </div>
    </div>
  )
}

import { Header, Button, FitnessCard, ProfileEdit, CourseAddPopup, LoaderSpinner } from 'components'
import { useState } from 'react'
import { useStore } from 'store/AuthStore'
import {
  useAddCourseQuery,
  useAllCoursesQuery,
  useAllWorkoutsQuery,
  useDeleteCourseQuery,
  useUserStateQuery,
} from 'hooks'
import { imagesMap } from 'consts'
import { getProgressTemplate } from 'helpers/helpers'
import type { IUserState } from 'types'
import style from './ProfilePage.module.scss'

// eslint-disable-next-line sonarjs/cognitive-complexity
export const ProfilePage = () => {
  const user = useStore((store) => store.user)
  const login = user?.email
  const password = user?.password

  const { data: userState, isLoading: isUserStateLoading } = useUserStateQuery()
  const { data: coursesFromDB, isLoading: isCoursesFromDBLoading } = useAllCoursesQuery()
  const { data: workoutsFromDB, isLoading: isWorkoutsFromDBLoading } = useAllWorkoutsQuery()

  const [isPassVisible, setIsPassVisible] = useState<boolean>(false)
  const [authPopUp, setAuthPopUp] = useState<'login' | 'password' | null>(null)
  const [isDropdownOpened, setIsDropdownOpened] = useState(false)
  const [cardEditPopUp, setCardEditPopUp] = useState<'delete' | 'add' | null>(null)
  const [editPopUpCourse, setEditPopUpCourse] = useState<string[]>([''])
  const doCoursesExist = userState && userState?.courses?.length > 0

  // Элементы карточек с курсами
  const cardElements =
    doCoursesExist && coursesFromDB ? (
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

  const noAddedCourseNames = doCoursesExist
    ? coursesFromDB &&
      Object.keys(coursesFromDB)
        .filter((course) => !userState.courses.includes(course))
        .map((course) => [course, coursesFromDB[course].nameRU])
    : coursesFromDB && Object.keys(coursesFromDB).map((course) => [course, coursesFromDB[course].nameRU])

  // Элементы выпадающего меню на добавить курс
  const dropdownElements: JSX.Element | JSX.Element[] = noAddedCourseNames ? (
    noAddedCourseNames.map((course, index) => (
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
    ))
  ) : (
    <div>Все курсы уже добавлены</div>
  )

  const resultProgress = coursesFromDB &&
    workoutsFromDB &&
    editPopUpCourse[0] !== '' && {
      ...getProgressTemplate(coursesFromDB, editPopUpCourse, workoutsFromDB),
      ...userState?.progress,
    }

  const resultCourses = doCoursesExist ? [...(userState.courses ?? []), editPopUpCourse[0]] : [editPopUpCourse[0]]
  const resultCoursesForDel = doCoursesExist && userState.courses.filter((el) => el !== editPopUpCourse[0])
  const { mutate: addCourse } = useAddCourseQuery(resultCourses as string[], resultProgress as IUserState['progress'])
  const { mutate: deleteCourse } = useDeleteCourseQuery(
    resultCoursesForDel as string[],
    resultProgress as IUserState['progress'],
  )

  const closeFunc = () => {
    setAuthPopUp(null)
    setCardEditPopUp(null)
  }

  const agreeFunc = cardEditPopUp === 'delete' ? () => deleteCourse() : () => addCourse()

  if (isUserStateLoading || isCoursesFromDBLoading || isWorkoutsFromDBLoading) {
    return <LoaderSpinner />
  }

  return (
    <div className={style.container}>
      <ProfileEdit variant={authPopUp} closeFunc={closeFunc} />
      <CourseAddPopup variant={cardEditPopUp} course={editPopUpCourse} agreeFunc={agreeFunc} closeFunc={closeFunc} />

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
          <Button fontSize={18} onClick={() => setAuthPopUp('login')}>
            Редактировать логин
          </Button>

          <Button fontSize={18} onClick={() => setAuthPopUp('password')}>
            Редактировать пароль
          </Button>
        </div>

        <h2 className={style.title}>
          Мои курсы
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

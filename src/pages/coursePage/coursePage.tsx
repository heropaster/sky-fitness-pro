import { useParams } from 'react-router-dom'
import mock from 'mock.json'
import { Application, Header } from 'components'
import style from './coursePage.module.scss'

export const CoursePage = () => {
  const { name } = useParams()
  // Получаем тип данных для объекта моковых данных
  type MockData = typeof mock

  // Определяем тип для курса на основе типа данных из mock.json
  type Course = MockData[keyof MockData]

  // Проверяем, существует ли курс по указанному имени
  const course: Course | undefined = mock[name as keyof typeof mock]

  return (
    <div className={style.container}>
      <Header color="black" isButtonHided={true} />
      <div className={style.content}>
        <div className={style.preview}>
          <img src={`${import.meta.env.VITE_BASE_URL}${course.previewPath}`} alt={course.title} />
        </div>
        <div className={style.conditions}>
          <h2>Подойдет для вас, если:</h2>
          <ul>
            {course.conditions.map((item, index) => (
              <li className={style.condition} key={index}>
                <div className={style.circle}>
                  <span>{index + 1}</span>
                </div>
                <div className={style.conditionText}>{item}</div>
              </li>
            ))}
          </ul>
        </div>
        <div className={style.directions}>
          <h2>Направления:</h2>
          <ul>
            {course.directions.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <p className={style.description}>{course.description}</p>
        <Application />
      </div>
    </div>
  )
}
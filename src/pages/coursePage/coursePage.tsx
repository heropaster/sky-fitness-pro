import { useParams } from 'react-router-dom'
import { Application, Header } from 'components'
import { useCourseQuery } from 'hooks'
import { PromoImage } from 'components/PromoImage/PromoImage.tsx'
import type { CourseNamesEnum } from 'types'
import style from './coursePage.module.scss'

export const CoursePage = () => {
  const { name } = useParams()
  const { data } = useCourseQuery(name?.toLowerCase() as string)
  return (
    <div className={style.container}>
      {data ? (
        <>
          <Header color="black" isButtonHided={true} />
          <div className={style.content}>
            <div className={style.preview}>
              <PromoImage name={data.nameEN as CourseNamesEnum} />
            </div>
            <div className={style.conditions}>
              <h2>Подойдет для вас, если:</h2>
              <ul>
                {data.fitting.map((item, index) => (
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
                {data.directions.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <p className={style.description}>{data.description[0].toUpperCase() + data.description.slice(1, -1)}</p>
            <Application />
          </div>
        </>
      ) : null}
    </div>
  )
}
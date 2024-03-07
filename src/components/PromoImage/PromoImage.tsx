import { Title } from 'components/UI/Title/Title.tsx'
import type { FC } from 'react'
import type { CourseNamesEnum } from 'types'
import yogaImg from 'assets/img/yoga.png'
import stratchingImg from 'assets/img/stratching.png'
import danceImg from 'assets/img/dance.png'
import stepImg from 'assets/img/step.png'
import bodyflexImg from 'assets/img/bodyflex.png'
import styles from './PromoImage.module.scss'

interface PromoImageProps {
  name: CourseNamesEnum
}

const namesMap = {
  Yoga: { ruName: 'Йога', img: yogaImg },
  StepAirobic: { ruName: 'Степ-Аэробика', img: stepImg },
  Stretching: { ruName: 'Стретчинг', img: stratchingImg },
  BodyFlex: { ruName: 'Бодифлекс', img: bodyflexImg },
  DanceFitness: { ruName: 'Танцевальный фитнес', img: danceImg },
}

export const PromoImage: FC<PromoImageProps> = ({ name }) => {
  const course = namesMap[name]
  return (
    <div className={styles.container} style={{ backgroundImage: `url(${course.img})` }}>
      <Title>{course.ruName}</Title>
    </div>
  )
}
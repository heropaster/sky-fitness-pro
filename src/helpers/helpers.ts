import type { ICourses, IWorkouts, IUserState } from 'types'

export const createValidVideoUrl = (url: string) => {
  const lastPath = url.slice(url.lastIndexOf('/'))
  return `https://www.youtube.com/embed${lastPath}`
}

// Возвращает шаблон объекта прогресса по курсу со стартовыми значениями
export const getProgressTemplate = (
  coursesFromDB: ICourses | undefined,
  currentCourse: string[],
  workoutsFromDB: IWorkouts | undefined,
): IUserState["progress"] | undefined => {
  if (!(coursesFromDB && currentCourse[0] !== '' && workoutsFromDB)) return  

  const editCourseWorkoutsArr = coursesFromDB[currentCourse[0]]?.workouts

  const exercisesQuantityArr: [
    string,
    {
      length: number
    },
  ][] = editCourseWorkoutsArr.map((workout) => [workout, { length: workoutsFromDB[workout].exercises?.length ?? 0 }])
  // Бредовое правило при создании массивов на основе объекта с ключом length
  // Как обойтись без Array.from не придумал, да и не захотел придумывать
  // поэтому отключил правило
  // eslint-disable-next-line unicorn/prefer-spread
  const quantitesToArray = exercisesQuantityArr.map((el) => [el[0], [false, ...Array.from(el[1]).fill(0)]])

  const objectEx = Object.fromEntries(quantitesToArray)

  return { [currentCourse[0]]: objectEx }
}

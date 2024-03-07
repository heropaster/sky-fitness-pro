import type { ICourses, IWorkouts, IUserState } from 'types'

type ExerciseQuantity = [string, { length: number }][]

export const createValidVideoUrl = (url: string) => {
  const lastPath = url.slice(url.lastIndexOf('/'))
  return `https://www.youtube.com/embed${lastPath}`
}

// Возвращает шаблон объекта прогресса по курсу со стартовыми значениями
export const getProgressTemplate = (
  coursesFromDB: ICourses,
  currentCourse: string[],
  workoutsFromDB: IWorkouts,
): IUserState['progress'] => {
  const editCourseWorkoutsArr = coursesFromDB[currentCourse[0]]?.workouts

  const exercisesQuantityArr: ExerciseQuantity = editCourseWorkoutsArr.map((workout) => [
    workout,
    { length: workoutsFromDB[workout].exercises?.length ?? 0 },
  ])

  const quantitesToArray = exercisesQuantityArr.map((el) => [
    el[0],
    [false, ...Array.from({ length: el[1].length }).fill(0)],
  ])
  const objectEx = Object.fromEntries(quantitesToArray)

  return { [currentCourse[0]]: objectEx }
}

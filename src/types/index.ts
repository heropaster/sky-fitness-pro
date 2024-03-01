import type { User } from 'firebase/auth'

export interface IUserState {
  courses: string[]
  progress: { [index: string]: { [index: string]: [boolean, ...number[]] } }
  _id?: string
}

export interface ICustomUser extends User {
  password: string
}

export interface ICourse {
  description: string
  directions: string[]
  fitting: string[]
  nameEN: string
  nameRU: string
  order: number
  workouts: string[]
  _id: string
}

export interface ICourses {
  [index: string]: ICourse
}

export interface IWorkout {
  exercises: { name: string; quantity: number }[]
  name: string
  video: string
  _id: string
}

export interface IWorkouts {
  [index: string]: IWorkout
}

export type CourseNamesEnum = 'Yoga' | 'StepAirobic' | 'Stretching' | 'BodyFlex' | 'DanceFitness'
// Import the functions you need from the SDKs you need
import axios from 'axios'
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
} from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { child, get, getDatabase, ref, update } from 'firebase/database'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBvuF-A_PIndBSDWJZUWSMJs86Ly-5tOyM',
  authDomain: 'sky-fitness-pro-2f260.firebaseapp.com',
  databaseURL: 'https://sky-fitness-pro-2f260-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'sky-fitness-pro-2f260',
  storageBucket: 'sky-fitness-pro-2f260.appspot.com',
  messagingSenderId: '580124679540',
  appId: '1:580124679540:web:13546acbb3a83ee1ed2021',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
type EmailPassword = Record<string, string>

//
// !!!! Константу нужно потом перенести
//

const DEFAULT_USER_PROGRESS: { [index: string]: { [index: string]: number[] } } = {
  q02a6i: {
    '17oz5f': [0, 0, 0],
    pyvaec: [0, 0, 0],
    xlpkqy: [0, 0, 0],
  },
}

export const initUserProgress = async () => {
  const user = getAuth(app).currentUser
  if (user) {
    const { uid } = user
    const db = ref(getDatabase(app))

    return update(child(db, 'users'), {
      [uid]: { ...DEFAULT_USER_PROGRESS, _id: uid },
    })
  }
}

export const loginUser = async ({ email, password }: EmailPassword) => {
  const response = await signInWithEmailAndPassword(getAuth(app), email, password)
  return { ...response.user, password }
}

export const createNewUser = async ({ email, password }: EmailPassword) => {
  await createUserWithEmailAndPassword(getAuth(app), email, password)
  const newUser = await loginUser({ email, password })
  initUserProgress()

  return newUser
}

export const logoutUser = async () => {
  await signOut(getAuth(app))
  return true
}

export const updateLogin = async ({ email }: EmailPassword) => {
  const user = getAuth(app).currentUser

  if (user) return updateEmail(user, email)
}

export const updateUserPassword = async ({ password }: EmailPassword) => {
  const user = getAuth(app).currentUser

  if (user) return updatePassword(user, password)
}

export const updateUserProgress = async ({
  courseId,
  workoutId,
  progressArray,
}: {
  courseId: string
  workoutId: string
  progressArray: number[]
}) => {
  const user = getAuth(app).currentUser
  const db = ref(getDatabase(app))

  if (user) {
    const { uid } = user

    const exercisePath = `users/${uid}/${courseId}`

    return update(child(db, exercisePath), {
      [workoutId]: progressArray,
    })
  }
}

export const getDBChild = async <T>(childPath: string) => {
  const db = ref(getDatabase(app))
  const requiredChild = await get(child(db, childPath))

  if (requiredChild.exists()) {
    return requiredChild.val() as T
  }
  console.warn('Data was no found')
}

// Интиерфейсы пока оставил, вдруг пригодятся
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

export interface IUser {
  id: string
  login: string | number
  password: string | number
  courses: string[]
}

const baseUrl = 'https://sky-fitness-pro-2f260-default-rtdb.asia-southeast1.firebasedatabase.app/'

export const getAll = async (entity: 'courses' | 'workouts'): Promise<ICourses | IWorkouts> => {
  const response = await axios.get(`${baseUrl}${entity}.json`)
  return response.data
}

export const getAllCourses = async () => {
  try {
    const response = await axios.get(`${baseUrl}courses.json`)
    return response.data
  } catch (error) {
    return error
  }
}

export const getCourseById = async (id: string) => {
  try {
    const response = await axios.get(`${baseUrl}courses/${id}.json`)
    console.log(response.data)
    return response.data
  } catch (error) {
    return error
  }
}

export const getAllWorkouts = async () => {
  try {
    const response = await axios.get(`${baseUrl}workouts.json`)
    console.log(response.data)
    return response.data
  } catch (error) {
    return error
  }
}

export const getWorkoutById = async (id: string): Promise<IWorkout> => {
  const response = await axios.get(`${baseUrl}workouts/${id}.json`)
  console.log(response.data)
  return response.data
}

export const fetchLogin = async ({ login, password }: { login: string | number; password: string | number }) => {
  try {
    const { data: user } = await axios.get(`${baseUrl}users/${login}.json`)
    if (user.password !== password) throw new Error('Неправильный пароль')
    return user
  } catch (error) {
    if (error instanceof Error) {
      throw new TypeError(error.message)
    }
  }
}

export const setNewLogin = async (login: string, user: IUser) => {
  try {
    const requestedUser: IUser = await axios.get(`${baseUrl}users/${login}.json`)
    const isFree = !requestedUser?.login
    if (isFree) {
      return axios({
        method: 'patch',
        url: `${baseUrl}users.json`,
        data: { [login]: { ...user, login: login } },
      })
    } else {
      throw new Error('Такой логин уже занят')
    }
  } catch (error) {
    if (error instanceof Error) {
      console.warn(error.message)
      throw error
    }
  }
}

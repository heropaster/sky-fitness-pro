// Import the functions you need from the SDKs you need
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  type User,
} from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { DEFAULT_USER_STATE } from 'consts'
import { child, get, getDatabase, ref, update, remove } from 'firebase/database'
import type { IUserState } from 'types'

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

type StringObject = Record<string, string>

const db = ref(getDatabase(app))
const getUserFromLS = (): User => JSON.parse(localStorage.getItem('user-storage') as string).state.user

export const initUserState = async () => {
  try {
    const user = getAuth(app).currentUser
    if (user) {
      const { uid } = user
      const db = ref(getDatabase(app))

      return update(child(db, 'users'), {
        [uid]: { ...DEFAULT_USER_STATE, _id: uid },
      })
    }
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message)
  }
}

export const loginUser = async ({ email, password }: StringObject) => {
  try {
    const response = await signInWithEmailAndPassword(getAuth(app), email, password)
    return { ...response.user, password }
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message)
  }
}

export const createNewUser = async ({ email, password }: StringObject) => {
  try {
    await createUserWithEmailAndPassword(getAuth(app), email, password)
    const newUser = loginUser({ email, password })
    initUserState()

    return newUser
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message)
  }
}

export const logoutUser = async () => {
  try {
    await signOut(getAuth(app))
    return true
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message)
  }
}

export const updateLogin = async ({ email }: StringObject) => {
  try {
    const userFromLS: User = getUserFromLS()
    const user: User = getAuth(app).currentUser ?? userFromLS

    if (user) return updateEmail(user, email)
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message)
  }
}

export const updateUserPassword = async ({ password }: StringObject) => {
  try {
    const userFromLS: User = getUserFromLS()
    const user: User = getAuth(app).currentUser ?? userFromLS

    if (user) return updatePassword(user, password)
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message)
  }
}

export const deleteCourse = async ({ course, courseIndex }: { course: string; courseIndex: number }) => {
  try {
    const userFromLS: User = getUserFromLS()

    const user: User = getAuth(app).currentUser ?? userFromLS
    const { uid } = user

    const pathToCourse = `users/${uid}/courses/${courseIndex}`
    const pathToProgress = `users/${uid}/progress/${course}`

    await remove(child(db, pathToCourse))
    await remove(child(db, pathToProgress))
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message)
  }
}

export const addCourse = async ({
  course,
  progressTemp,
}: {
  course: string[]
  progressTemp: IUserState['progress']
}) => {
  try {
    const userFromLS: User = getUserFromLS()
    const user: User = getAuth(app).currentUser ?? userFromLS
    const { uid } = user

    const pathToUser = `users/${uid}`
    const pathToCourses = `users/${uid}`

    await update(child(db, pathToCourses), {
      courses: course,
    })

    await update(child(db, pathToUser), {
      progress: progressTemp,
    })
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message)
  }
}

export const removeCourse = async ({ courses, course }: { courses: string[]; course: string }) => {
  try {
    const userFromLS: User = getUserFromLS()
    const user: User = getAuth(app).currentUser ?? userFromLS
    const { uid } = user

    const pathToProgres = `users/${uid}/progress/${course}`
    const pathToCourses = `users/${uid}`

    await update(child(db, pathToCourses), {
      courses: courses,
    })

    await remove(child(db, pathToProgres))
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message)
  }
}

export const updateUserProgress = async ({
  course,
  workoutId,
  progressArray,
}: {
  course: string
  workoutId: string
  progressArray: [boolean, ...number[]]
}) => {
  try {
    const userFromLS: User = JSON.parse(localStorage.getItem('user-storage') as string).state.user

    const user: User = getAuth(app).currentUser ?? userFromLS

    if (user) {
      const { uid } = user

      const exercisePath = `users/${uid}/progress/${course}`

      return update(child(db, exercisePath), {
        [workoutId]: progressArray,
      })
    }
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message)
  }
}

export const getDBChild = async <T>(childPath: string) => {
  try {
    const requiredChild = await get(child(db, childPath))

    if (requiredChild.exists() && requiredChild.val() !== undefined) {
      return requiredChild.val() as T
    }
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message)
  }
}

export const getUserState = async <T>() => {
  try {
    const userFromLS: User = getUserFromLS()

    const user: User = getAuth(app).currentUser ?? userFromLS

    const { uid } = user
    const path = `users/${uid}`
    const requiredChild = await get(child(db, path))

    if (requiredChild.exists() && requiredChild.val() !== undefined) {
      return requiredChild.val() as T
    }
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message)
  }
}

// На всякий пожарный случай
// const baseUrl = 'https://sky-fitness-pro-2f260-default-rtdb.asia-southeast1.firebasedatabase.app/'

// Import the functions you need from the SDKs you need
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
} from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { DEFAULT_USER_STATE } from 'const'
import { child, get, getDatabase, ref, update } from 'firebase/database'

import type { IUserState } from 'types'
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

export const initUserState = async () => {
  const user = getAuth(app).currentUser
  if (user) {
    const { uid } = user
    const db = ref(getDatabase(app))

    return update(child(db, 'users'), {
      [uid]: { ...DEFAULT_USER_STATE, _id: uid },
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
  initUserState()

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

  if (requiredChild.exists() && requiredChild.val() !== undefined) {
    return requiredChild.val() as T
  }
  console.warn('Data was not found')
}

export const getUserState = async () => {
  const user = getAuth(app).currentUser

  if (user) {
    const { uid } = user
    const path = `users/${uid}`
    return await getDBChild<IUserState>(path)
  }
}

// const baseUrl = 'https://sky-fitness-pro-2f260-default-rtdb.asia-southeast1.firebasedatabase.app/'

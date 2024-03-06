// Import the functions you need from the SDKs you need
import type { User } from 'firebase/auth'
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
} from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { DEFAULT_USER_STATE } from 'consts'
import { child, get, getDatabase, ref, update } from 'firebase/database'

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

// Initialize Cloud Firestore and get a reference to the service
const db = ref(getDatabase(app))
const user = getAuth(app).currentUser

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
  if (user) return updateEmail(user, email)
}

export const updateUserPassword = async ({ password }: EmailPassword) => {
  if (user) return updatePassword(user, password)
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
  const userFromLS: User = JSON.parse(localStorage.getItem('user-storage') as string).state.user

  const user: User = getAuth(app).currentUser ?? userFromLS

  if (user) {
    const { uid } = user

    const exercisePath = `users/${uid}/progress/${course}`

    return update(child(db, exercisePath), {
      [workoutId]: progressArray,
    })
  }
}

export const getDBChild = async <T>(childPath: string) => {
  const requiredChild = await get(child(db, childPath))

  if (requiredChild.exists() && requiredChild.val() !== undefined) {
    return requiredChild.val() as T
  }
  console.warn('Data was not found')
}

export const getUserState = async <T>() => {
  const userFromLS: User = JSON.parse(localStorage.getItem('user-storage') as string).state.user

  const user: User = getAuth(app).currentUser ?? userFromLS

  const { uid } = user
  const path = `users/${uid}`
  const requiredChild = await get(child(db, path))

  if (requiredChild.exists() && requiredChild.val() !== undefined) {
    return requiredChild.val() as T
  }
  console.warn('Data was not found')
}

// const baseUrl = 'https://sky-fitness-pro-2f260-default-rtdb.asia-southeast1.firebasedatabase.app/'

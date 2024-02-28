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

type UserProgress = Record<string, {[index: string]: number[]}>

const DEFAULT_USER_PROGRESS: UserProgress = {
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


// const baseUrl = 'https://sky-fitness-pro-2f260-default-rtdb.asia-southeast1.firebasedatabase.app/'

// Пример использования
// import { useQuery } from "@tanstack/react-query";

// const {data, isLoading, isError, isSuccess} = useQuery({queryFn: () => getAllCourses(), queryKey: ['courses', 'all']})
import axios from 'axios'

interface ICourse {
  description: string
  directions: string[]
  fitting: string[]
  nameEN: string
  nameRU: string
  order: number
  workouts: string[]
  _id: string
}

interface ICourses {
  [index: string]: ICourse
}

interface IWorkout {
  exercises: { name: string; quantity: number }[]
  name: string
  video: string
  _id: string
}

interface IWorkouts {
  [index: string]: IWorkout
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

export const getWorkoutById = async (id: string) => {
  try {
    const response = await axios.get(`${baseUrl}workouts/${id}.json`)
    console.log(response.data)
    return response.data
  } catch (error) {
    return error
  }
}

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${baseUrl}users.json`)
    return response.data
  } catch (error) {
    return error
  }
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

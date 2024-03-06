import { useQuery } from '@tanstack/react-query'
import { getDBChild } from '../services/api'
import type { IWorkout } from 'types'

export const useWorkoutQuery = (id?: string) =>
  useQuery({ queryFn: () => getDBChild<IWorkout>(`workouts/${id}`), queryKey: ['workouts', id], enabled: !!id })

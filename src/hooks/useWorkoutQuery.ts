import { useQuery } from '@tanstack/react-query'
import { getDBChild } from '../services/api'

export const useWorkoutQuery = (id: string) =>
  useQuery({ queryFn: () => getDBChild(`workouts/${id}`), queryKey: ['workouts', id] })

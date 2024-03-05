import { useQuery } from '@tanstack/react-query'
import { getDBChild } from 'services/api'
import type { IWorkouts } from 'types'

export const useAllWorkoutsQuery = () =>
  useQuery({
    queryFn: () => getDBChild<IWorkouts>('workouts'),
    queryKey: ['workouts', 'all'],
    staleTime: 1000 * 60 * 60 * 2,
  })

import { useQuery } from '@tanstack/react-query'
import { getAll } from 'services/api'

export const useGetAll = (entity: 'courses' | 'workouts') =>
  useQuery({
    queryFn: () => getAll(entity),
    queryKey: [entity, 'all'],
  })

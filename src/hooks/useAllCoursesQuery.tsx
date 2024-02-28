import { useQuery } from '@tanstack/react-query'
import { getDBChild } from 'services/api'
import type { ICourses } from 'types'

export const useAllCoursesQuery = () =>
  useQuery({
    queryFn: () => getDBChild<ICourses>('courses'),
    queryKey: ['courses', 'all'],
  })

import { useQuery } from '@tanstack/react-query'
import { getDBChild } from '../services/api'
import type { ICourse } from 'types'

export const useCourseQuery = (id: string) =>
  useQuery({ queryFn: () => getDBChild<ICourse>(`courses/${id}`), queryKey: ['courses', id] })

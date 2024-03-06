import { useQuery } from '@tanstack/react-query'
import { getDBChild } from '../services/api'
import type { ICourse } from 'types'

export const useCourseQuery = (name?: string) =>
  useQuery({ queryFn: () => getDBChild<ICourse>(`courses/${name}`), queryKey: ['courses', name] })

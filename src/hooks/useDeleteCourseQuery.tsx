import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addCourse } from '../services/api'
import type { IUserState } from 'types'

export const useDeleteCourseQuery = (course: string[], progressTemp: IUserState['progress']) => {
  const client = useQueryClient()

  return useMutation({
    mutationFn: () => addCourse({ course, progressTemp }),
    onSuccess: () => client.invalidateQueries({ queryKey: ['user', 'state'] }),
  })
}

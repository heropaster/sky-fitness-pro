import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteCourse } from '../services/api'

export const useDeleteCourseQuery = (course: string, courseIndex: number) => {
  const client = useQueryClient()

  return useMutation({
    mutationFn: () => deleteCourse({ course, courseIndex }),
    onSuccess: () => client.invalidateQueries({ queryKey: ['user', 'state'] }),
  })
}

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateUserProgress } from 'services/api'

interface IArgumentsUpdateUserProgress {
  course: string
  workoutId: string
  progressArray: [boolean, ...number[]]
}

export const useUpdateUserProgress = ({ course, workoutId, progressArray }: IArgumentsUpdateUserProgress) => {
  const client = useQueryClient()

  return useMutation({
    mutationFn: () => updateUserProgress({ course, workoutId, progressArray }),
    onSuccess: () => client.invalidateQueries({ queryKey: ['user', 'state'] }),
  })
}

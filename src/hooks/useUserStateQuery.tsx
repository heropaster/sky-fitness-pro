import { useQuery } from '@tanstack/react-query'
import { getUserState } from '../services/api'

export const useUserStateQuery = () =>
  useQuery({ queryFn: () => getUserState(), queryKey: ['user'], refetchInterval: 3000 })

import { useQuery } from '@tanstack/react-query'
import { getUserState } from '../services/api'
import type { IUserState } from 'types'

export const useUserStateQuery = () =>
  useQuery({
    queryFn: () => getUserState<IUserState>(),
    queryKey: ['user', 'state'],
  })

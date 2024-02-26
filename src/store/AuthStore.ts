import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface IUser {
  id: string
  login: string | number
  password: string | number
  courses: string[]
}

interface IMyStore {
  user: IUser | null | undefined
  setUser: (user: IUser | null | undefined) => void
}

export const useStore = create<IMyStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

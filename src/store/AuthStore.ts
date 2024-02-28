import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type { ICustomUser } from 'types'

interface IMyStore {
  user: ICustomUser | null | undefined
  setUser: (user: ICustomUser | null | undefined) => void
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

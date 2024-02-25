import type { FC, PropsWithChildren } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const client = new QueryClient()

export const Providers: FC<PropsWithChildren> = ({ children }) => (
  <QueryClientProvider client={client}>
    <BrowserRouter>{children}</BrowserRouter>
  </QueryClientProvider>
)

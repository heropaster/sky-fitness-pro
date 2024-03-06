import { Providers } from 'providers/Providers.tsx'
import { AppRoutes } from 'routes/routes'
import './App.scss'

export const App = () => (
  <Providers>
    <AppRoutes />
  </Providers>
)

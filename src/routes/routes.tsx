import { Routes, Route } from 'react-router-dom'
import { CoursePage } from 'pages/coursePage/coursePage.tsx'
import { Main, AuthPage, ProfilePage, WorkoutPage } from 'pages'
import { ProtectedRoute } from 'routes/protected-route'
import { useStore } from 'store/AuthStore'

export function AppRoutes() {
  const isAuthenticated = Boolean(useStore((state) => state.user))

  return (
    <Routes>
      <Route element={<ProtectedRoute isAuthenticated={Boolean(isAuthenticated)} />}>
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
      <Route path="/" element={<Main />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/courses/:name" element={<CoursePage />} />
      <Route path="/workout/:id" element={<WorkoutPage />} />
    </Routes>
  )
}

import { Routes, Route } from 'react-router-dom'
import { Main } from 'pages'
import { AuthPage } from 'pages/authPage/auth'
import { CoursePage } from 'pages/coursePage/coursePage.tsx'

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Main />} />
    <Route path="/auth" element={<AuthPage />} />
    <Route path="/courses/:name" element={<CoursePage />} />
  </Routes>
)
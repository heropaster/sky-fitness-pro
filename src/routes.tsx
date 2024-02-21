import { Routes, Route } from 'react-router-dom'
import { Main } from 'pages'
import { AuthPage } from 'pages/authPage/auth'
import { Course } from 'pages/course/Course'

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Main />} />
    <Route path="/auth" element={<AuthPage />} />
    <Route path="/course" element={<Course />} />
  </Routes>
)

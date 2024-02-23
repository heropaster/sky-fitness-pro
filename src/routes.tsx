import { Routes, Route } from 'react-router-dom'
import { Main, AuthPage, ProfilePage, Course } from 'pages'

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Main />} />
    <Route path="/auth" element={<AuthPage />} />
    <Route path="/course" element={<Course />} />
    <Route path="/profile" element={<ProfilePage />} />
  </Routes>
)

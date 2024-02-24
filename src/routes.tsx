import { Routes, Route } from 'react-router-dom'
import { CoursePage } from 'pages/coursePage/coursePage.tsx'
import { Main, AuthPage, ProfilePage, Course } from 'pages'


export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Main />} />
    <Route path="/auth" element={<AuthPage />} />

    <Route path="/courses/:name" element={<CoursePage />} />

    <Route path="/course" element={<Course />} />
    <Route path="/profile" element={<ProfilePage />} />
  </Routes>
)
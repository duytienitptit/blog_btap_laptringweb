import { Routes, Route, Outlet, Navigate } from 'react-router-dom'
import Home from './components/Home'
import Blog from './components/Blog'
import BlogPost from './components/BlogPost'
import Login from './components/Login'
import Register from './components/Register'
import Layout from './components/Layout'
import { isAuthenticated } from './auth'
import NotFound from './components/NotFound'
import Admin from './components/Admin'

const ProtectedRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to='/login' replace />
}

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path='blogs' element={<Blog />} />
          <Route path='blogs/:postId' element={<BlogPost />} />
          <Route path='admin' element={<Admin />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App

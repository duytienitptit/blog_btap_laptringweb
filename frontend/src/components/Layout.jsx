import { Link, useNavigate, Outlet } from 'react-router-dom'
import { isAuthenticated, logout } from '../auth'

export default function Navbar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <>
      <nav>
        <Link to='/'>Home</Link> |<Link to='/blog'>Blog</Link> |<Link to='/admin'>Admin</Link> |
        {!isAuthenticated() ? (
          <button>
            <Link to='/login'>Login</Link>
          </button>
        ) : (
          <button onClick={handleLogout}>Logout</button>
        )}
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  )
}

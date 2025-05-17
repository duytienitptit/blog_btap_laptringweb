import { Link, useNavigate, Outlet, NavLink } from 'react-router-dom'
import { isAuthenticated, logout } from '../auth'

export default function Layout() {
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <>
      <nav className='bg-gray-800 shadow-md'>
        <div className='container mx-auto px-6 py-3 flex justify-between items-center'>
          <div className='text-2xl font-bold text-white hover:text-blue-300 transition-colors'>WebBlog</div>
          <ul className='flex items-center space-x-6'>
            <li>
              <NavLink
                to='/'
                className={({ isActive }) =>
                  isActive ? 'text-blue-300 font-medium' : 'text-gray-300 hover:text-white transition-colors'
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/blogs'
                className={({ isActive }) =>
                  isActive ? 'text-blue-300 font-medium' : 'text-gray-300 hover:text-white transition-colors'
                }
              >
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/admin'
                className={({ isActive }) =>
                  isActive ? 'text-blue-300 font-medium' : 'text-gray-300 hover:text-white transition-colors'
                }
              >
                Admin
              </NavLink>
            </li>
            {!isAuthenticated() ? (
              <li>
                <Link
                  to='/login'
                  className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors'
                >
                  Login
                </Link>
              </li>
            ) : (
              <li>
                <button
                  onClick={handleLogout}
                  className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors'
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>

      <main className='bg-gray-50 min-h-screen'>
        <div className='container mx-auto px-6 py-8'>
          <Outlet />
        </div>
      </main>
    </>
  )
}

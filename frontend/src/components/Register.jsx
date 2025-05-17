import { useState } from 'react'
import { register } from '../auth'
import { useNavigate, Link } from 'react-router-dom'

export default function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleRegister = async () => {
    // Basic validation
    if (!username || !password || !name) {
      setError('Vui lòng điền đầy đủ thông tin')
      return
    }

    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp')
      return
    }

    try {
      setLoading(true)
      setError('')
      const result = await register(username, password, name)

      if (result.success) {
        // Registration successful, redirect to login page
        navigate('/login', {
          state: {
            message: 'Đăng ký thành công! Vui lòng đăng nhập.'
          }
        })
      } else {
        setError(result.error)
      }
    } catch (error) {
      console.error('Registration error:', error)
      setError('Lỗi đăng ký. Vui lòng thử lại.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-[80vh] flex items-center justify-center px-4 py-12'>
      <div className='w-full max-w-md bg-white p-8 rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-xl border border-gray-100'>
        <div className='text-center mb-10'>
          <h2 className='text-3xl font-bold text-gray-800 mb-2'>Create Account</h2>
          <p className='text-gray-500'>Sign up to start your journey</p>
        </div>

        {error && (
          <div className='mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md animate-fade-in'>
            <p className='flex items-center'>
              <svg
                className='w-5 h-5 mr-2'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                  clipRule='evenodd'
                />
              </svg>
              {error}
            </p>
          </div>
        )}

        <div className='space-y-5'>
          <div>
            <label className='block text-gray-700 font-medium mb-2' htmlFor='name'>
              Full Name
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <svg
                  className='h-5 w-5 text-gray-400'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
              <input
                className='w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                id='name'
                type='text'
                placeholder='Nhập họ tên'
                value={name}
                onChange={e => setName(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label className='block text-gray-700 font-medium mb-2' htmlFor='username'>
              Username
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <svg
                  className='h-5 w-5 text-gray-400'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
              <input
                className='w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                id='username'
                type='text'
                placeholder='Nhập tên đăng nhập'
                value={username}
                onChange={e => setUsername(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label className='block text-gray-700 font-medium mb-2' htmlFor='password'>
              Password
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <svg
                  className='h-5 w-5 text-gray-400'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
              <input
                className='w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                id='password'
                type='password'
                placeholder='Nhập mật khẩu'
                value={password}
                onChange={e => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label className='block text-gray-700 font-medium mb-2' htmlFor='confirmPassword'>
              Confirm Password
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <svg
                  className='h-5 w-5 text-gray-400'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
              <input
                className='w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                id='confirmPassword'
                type='password'
                placeholder='Xác nhận mật khẩu'
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') handleRegister()
                }}
                disabled={loading}
              />
            </div>
          </div>

          <div className='pt-2'>
            <button
              className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-300 transform ${
                loading
                  ? 'bg-blue-400 cursor-not-allowed opacity-70'
                  : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:-translate-y-0.5'
              }`}
              onClick={handleRegister}
              disabled={loading}
            >
              {loading ? (
                <span className='flex items-center justify-center'>
                  <svg
                    className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                    ></circle>
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                    ></path>
                  </svg>
                  Đang đăng ký...
                </span>
              ) : (
                'Sign Up'
              )}
            </button>
          </div>

          <div className='text-center mt-4 text-gray-500'>
            Already have an account?{' '}
            <Link to='/login' className='text-blue-600 hover:underline'>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

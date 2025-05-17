import { Link, useLocation } from 'react-router-dom'

function NotFound() {
  const location = useLocation()
  return (
    <div className='flex flex-col items-center justify-center py-16 px-4 text-center'>
      <h2 className='text-4xl font-bold text-red-500 mb-6'>404 - Page Not Found</h2>
      <p className='text-xl text-gray-700 mb-3'>
        Không tìm thấy trang: <strong className='text-gray-900'>{location.pathname}</strong>
      </p>
      <p className='text-lg text-gray-600 mb-8'>Chắc bạn gõ nhầm. Thử về trang khác nhé!</p>
      <Link
        to='/'
        className='inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors'
      >
        Về trang chủ
      </Link>
    </div>
  )
}
export default NotFound

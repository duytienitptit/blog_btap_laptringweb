import { useLocation } from 'react-router-dom'
function NotFound() {
  const location = useLocation()
  return (
    <div>
      <h2>404 - Không tìm thấy: {location.pathname}</h2>
      <p>
        Chắc bạn gõ nhầm. Thử về <Link to='/'>trang chủ</Link> nhé!
      </p>
    </div>
  )
}
export default NotFound

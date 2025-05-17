import axios from 'axios'
import config from './config'

export const isAuthenticated = () => localStorage.getItem('userInfo') !== null

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${config.API_URL}/auth/login`, { username, password })
    const user = response.data.user
    if (user) {
      localStorage.setItem('userInfo', JSON.stringify(user))
      return true
    }

    return false
  } catch (error) {
    console.error('Login error:', error)
    return false
  }
}

export const register = async (username, password, name) => {
  try {
    const response = await axios.post(`${config.API_URL}/auth/register`, {
      username,
      password,
      fullName: name,
      email: `${username}@example.com` // Since email is required by the backend
    })
    return { success: true, data: response.data }
  } catch (error) {
    console.error('Registration error:', error)
    return {
      success: false,
      error: error.response?.data?.message || 'Lỗi đăng ký. Vui lòng thử lại.'
    }
  }
}

export const logout = () => {
  localStorage.removeItem('userInfo')
}

// Hàm lấy thông tin người dùng từ localStorage
export const getUserInfo = () => {
  const userInfo = localStorage.getItem('userInfo')
  return userInfo ? JSON.parse(userInfo) : null
}

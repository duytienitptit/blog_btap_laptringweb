export const isAuthenticated = () => localStorage.getItem('token') === 'blog123'
export const login = password => {
  if (password === '123') {
    localStorage.setItem('token', 'blog123')
    return true
  }
  return false
}
export const logout = () => localStorage.removeItem('token')

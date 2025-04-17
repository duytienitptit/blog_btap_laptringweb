import { useState } from "react"
import { login } from "../auth"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleLogin = () => {
    if (login(password)) {
      navigate("/blog")
    } else {
      setError("Sai mật khẩu rồi bro 😅")
    }
  }

  return (
    <div>
      <h2>🔐 Login Page</h2>
      <input
        type="password"
        placeholder="Nhập mật khẩu"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleLogin()
        }}
      />
      <button onClick={handleLogin}>Login</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  )
}

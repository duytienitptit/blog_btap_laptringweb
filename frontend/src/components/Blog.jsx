import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

export default function Blog() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const posts = await axios.get("http://localhost:8080/blogs")
        console.log("📚", posts.data)
        setPosts(posts.data)
      } catch (err) {
        console.error("🚨 API Error:", err.message)
      }
    }

    fetchData()
  }, [])
  return (
    <div>
      <h2>📝 Blog Page (Protected)</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/blog/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

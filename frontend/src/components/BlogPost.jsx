import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

export default function BlogPost() {
  const { postId } = useParams()
  const [post, setPost] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const posts = await axios.get("http://localhost:8080/blogs")
        setPost(posts.data.find((p) => p.id.toString() === postId))
      } catch (err) {
        console.error("🚨 API Error:", err.message)
      }
    }

    fetchData()
  }, [postId])

  return (
    <div>
      <h2>📄 Blog Post #{postId}</h2>
      {post ? (
        <p>{post.content}</p>
      ) : (
        <p>🕵️‍♂️ Không tìm thấy bài viết này... maybe nó biến mất vô vũ trụ 🌌</p>
      )}
    </div>
  )
}

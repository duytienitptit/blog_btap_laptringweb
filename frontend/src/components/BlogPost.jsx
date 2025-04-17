import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

// const postContent = {
//   1: 'To hustle like Elon, divide your day into 5-minute slots and drink 5 Red Bulls 🐂⚡.',
//   2: 'React Router is like Google Maps for your app. Learn nested routes and lazy loading!',
//   3: 'Freelancing, TikTok, and code = $1k/month. Start simple, then scale like a beast 💼👾.',
//   4: 'VSCode, GitHub Copilot, Postman, Figma, and Notion – your squad for dev domination 💪.',
//   5: 'Debugging is just being sus with your own code. Use breakpoints, logs, and rubber ducks 🦆.'
// }

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

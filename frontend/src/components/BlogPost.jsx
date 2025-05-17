import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import config from '../config'

export default function BlogPost() {
  const { postId } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${config.API_URL}/blogs/${postId}`)
        setPost(response.data)
      } catch (err) {
        console.error('🚨 API Error:', err.message)
        setPost(null)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [postId])

  if (loading) {
    return <div className='flex justify-center items-center p-8 text-gray-600'>Loading post...</div>
  }

  return (
    <div className='bg-white rounded-lg shadow-md p-6'>
      {post ? (
        <>
          <h2 className='text-3xl font-bold mb-6 text-gray-800'>📄 {post.title}</h2>
          <div className='prose max-w-none text-gray-700 mb-8'>{post.content}</div>
          <div className='mt-8 pt-4 border-t border-gray-200'>
            <Link
              to='/blogs'
              className='inline-flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition-colors'
            >
              &larr; Back to Blog List
            </Link>
          </div>
        </>
      ) : (
        <div className='text-center py-8'>
          <h2 className='text-2xl font-bold mb-4 text-gray-800'>Post Not Found</h2>
          <p className='text-lg text-gray-600 mb-6'>
            🕵️‍♂️ Không tìm thấy bài viết này... maybe nó biến mất vô vũ trụ 🌌
          </p>
          <Link
            to='/blogs'
            className='inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors'
          >
            Back to Blog List
          </Link>
        </div>
      )}
    </div>
  )
}

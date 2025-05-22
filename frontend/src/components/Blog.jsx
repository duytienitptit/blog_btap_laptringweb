import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import config from '../config'
import { getUserInfo } from '../auth'

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [newPost, setNewPost] = useState({ title: '', content: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    fetchPosts()
  }, [])

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (searchTerm !== '') {
        searchPosts(searchTerm)
      } else {
        fetchPosts()
      }
    }, 500)

    return () => clearTimeout(delaySearch)
  }, [searchTerm])
  const fetchPosts = async () => {
    try {
      const posts = await axios.get(`${config.API_URL}/blogs`)
      console.log('📚', posts.data)
      setPosts(posts.data)
    } catch (err) {
      console.error('🚨 API Error:', err.message)
    }
  }
  const searchPosts = async searchTerm => {
    try {
      setIsSearching(true)
      const encodedSearchTerm = encodeURIComponent(searchTerm.trim())
      const posts = await axios.get(`${config.API_URL}/blogs?keywords=${encodedSearchTerm}`)
      console.log('📚 Search results:', posts.data)
      setPosts(posts.data)
    } catch (err) {
      console.error('🚨 API Error:', err.message)
    } finally {
      setIsSearching(false)
    }
  }

  const handleInputChange = e => {
    const { name, value } = e.target
    setNewPost({
      ...newPost,
      [name]: value
    })
  }
  const handleSubmit = async e => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')
    const { fullName } = getUserInfo()
    console.log('👤', fullName)
    try {
      await axios.post(`${config.API_URL}/blogs`, { ...newPost, author: fullName })
      setNewPost({ title: '', content: '' })
      setSubmitMessage('✅ Blog post created successfully!')
      fetchPosts()
    } catch (err) {
      console.error('🚨 API Error:', err.message)
      setSubmitMessage('❌ Failed to create blog post. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleForm = () => {
    setShowForm(!showForm)
    if (!showForm) {
      setNewPost({ title: '', content: '' })
      setSubmitMessage('')
    }
  }

  return (
    <div>
      <h2 className='text-3xl font-bold mb-6 text-gray-800'>📝 Blog Management</h2>

      <div className='mb-6'>
        <button
          className='py-2 px-4 rounded-md text-white font-medium bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          onClick={toggleForm}
        >
          + New Post
        </button>
      </div>

      {showForm && (
        <div className='fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl m-4 max-h-[90vh] overflow-y-auto'>
            <div className='flex justify-between items-center mb-4'>
              <h3 className='text-xl font-semibold text-blue-600'>Create New Blog Post</h3>
              <button
                onClick={toggleForm}
                className='text-gray-500 hover:text-gray-700 focus:outline-none'
                aria-label='Close'
              >
                <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>

            {submitMessage ? (
              <div className='mb-4 p-3 bg-green-100 text-green-700 border border-green-200 rounded-md'>
                {submitMessage}
              </div>
            ) : submitMessage ? (
              <div className='mb-4 p-3 bg-red-100 text-red-700 border border-red-200 rounded-md'>
                {submitMessage}
              </div>
            ) : null}

            <form onSubmit={handleSubmit}>
              <div className='mb-4'>
                <label className='block text-gray-700 font-medium mb-2' htmlFor='title'>
                  Title:
                </label>
                <input
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  type='text'
                  id='title'
                  name='title'
                  value={newPost.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700 font-medium mb-2' htmlFor='content'>
                  Content:
                </label>
                <textarea
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  id='content'
                  name='content'
                  value={newPost.content}
                  onChange={handleInputChange}
                  rows='5'
                  required
                />
              </div>
              <div className='flex justify-end gap-2'>
                <button
                  type='button'
                  onClick={toggleForm}
                  className='py-2 px-4 rounded-md text-gray-700 font-medium border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
                >
                  Cancel
                </button>
                <button
                  className={`py-2 px-4 rounded-md text-white font-medium transition-colors ${
                    isSubmitting
                      ? 'bg-blue-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                  }`}
                  type='submit'
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creating...' : 'Create Post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <h3 className='text-xl font-semibold mb-4 text-gray-800'>Blog Posts</h3>
      <input
        type='text'
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value.toLowerCase())}
        className='mb-4 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
        placeholder='Search...'
      />
      {isSearching ? (
        <p className='text-gray-600'>Searching...</p>
      ) : posts.length === 0 ? (
        <p className='text-gray-600 italic'>No blog posts found.</p>
      ) : (
        <ul className='bg-white rounded-lg shadow divide-y'>
          {posts.map(post => (
            <li key={post.id} className='px-6 py-4 hover:bg-gray-50 transition-colors'>
              <Link to={`/blogs/${post.id}`} className='text-blue-600 hover:text-blue-800 font-medium'>
                {post.title}
              </Link>
              {post.author === getUserInfo().fullName && (
                <>
                  <button className='bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2'>
                    Edit
                  </button>
                  <button className='bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-red-500'>
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

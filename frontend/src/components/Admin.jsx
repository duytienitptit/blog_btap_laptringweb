import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import { getUserInfo } from '../auth'
import config from '../config'

const Admin = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [currentBlog, setCurrentBlog] = useState({ id: '', title: '', content: '' })

  useEffect(() => {
    // Get user info from localStorage
    const userInfo = getUserInfo()
    setUser(userInfo)

    const fetchBlogs = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${config.API_URL}/blogs`)
        setBlogs(response.data)
        setError(null)
      } catch (err) {
        console.error('Error fetching blogs:', err)
        setError('Failed to load blogs. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, []) // Hàm để xóa bài viết
  const handleDelete = async id => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await axios.delete(`${config.API_URL}/blogs/${id}`)
        setBlogs(blogs.filter(blog => blog.id !== id))
      } catch (err) {
        console.error('Error deleting blog:', err)
        setError('Failed to delete blog post. Please try again.')
      }
    }
  }

  // Hàm để lấy bài viết cần chỉnh sửa
  const handleEditClick = async id => {
    try {
      const response = await axios.get(`${config.API_URL}/blogs/${id}`)
      setCurrentBlog({
        id: response.data._id,
        title: response.data.title,
        content: response.data.content
      })
      setEditMode(true)
    } catch (err) {
      console.error('Error fetching blog for edit:', err)
      setError('Failed to load blog for editing. Please try again.')
    }
  }

  // Hàm xử lý thay đổi nội dung form
  const handleChange = e => {
    const { name, value } = e.target
    setCurrentBlog({ ...currentBlog, [name]: value })
  }

  // Hàm gửi dữ liệu cập nhật lên server
  const handleUpdate = async e => {
    e.preventDefault()

    if (!currentBlog.title || !currentBlog.content) {
      setError('Title and content are required')
      return
    }

    try {
      await axios.put(`${config.API_URL}/blogs/${currentBlog.id}`, {
        title: currentBlog.title,
        content: currentBlog.content
      })

      // Cập nhật danh sách blogs sau khi cập nhật thành công
      const updatedBlogs = blogs.map(blog =>
        blog.id === currentBlog.id ? { ...blog, title: currentBlog.title } : blog
      )

      setBlogs(updatedBlogs)
      setEditMode(false)
      setCurrentBlog({ id: '', title: '', content: '' })
      setError(null)
    } catch (err) {
      console.error('Error updating blog:', err)
      setError('Failed to update blog. Please try again.')
    }
  }

  // Hủy chỉnh sửa
  const handleCancel = () => {
    setEditMode(false)
    setCurrentBlog({ id: '', title: '', content: '' })
    setError(null)
  }

  return (
    <div className='bg-white rounded-lg shadow-md p-6'>
      <div className='flex justify-between items-center mb-6 pb-4 border-b border-gray-200'>
        <h2 className='text-2xl font-bold text-gray-800'>👑 Admin Dashboard</h2>
        {user && (
          <div className='bg-blue-50 px-4 py-2 rounded-lg'>
            <p className='text-blue-800'>
              Welcome, <strong>{user.fullName}</strong>
            </p>
          </div>
        )}
      </div>
      {error && (
        <div className='mb-4 p-3 bg-red-100 text-red-700 border border-red-200 rounded-md'>{error}</div>
      )}
      {loading ? (
        <p className='text-gray-600 text-center py-4'>Loading blog posts...</p>
      ) : (
        <>
          <h3 className='text-xl font-semibold mb-4 text-gray-700'>Blog Posts Management</h3>
          {blogs.length === 0 ? (
            <p className='text-gray-600 italic text-center py-4'>No blog posts found.</p>
          ) : (
            <div className='overflow-x-auto'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Title
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {blogs.map(blog => (
                    <tr key={blog.id} className='hover:bg-gray-50'>
                      <td className='px-6 py-4 text-sm text-gray-900'>{blog.title}</td>{' '}
                      <td className='px-6 py-4 whitespace-nowrap text-sm flex space-x-2'>
                        <button
                          className='bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2'
                          onClick={() => handleEditClick(blog.id)}
                        >
                          Edit
                        </button>
                        <button
                          className='bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-red-500'
                          onClick={() => handleDelete(blog.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}{' '}
      {editMode && (
        <div className='mt-8 border-t pt-6 border-gray-200'>
          <h3 className='text-xl font-semibold mb-4 text-gray-700'>Edit Blog Post</h3>
          <form onSubmit={handleUpdate} className='space-y-4'>
            <div>
              <label htmlFor='title' className='block text-sm font-medium text-gray-700'>
                Title
              </label>
              <input
                type='text'
                id='title'
                name='title'
                value={currentBlog.title}
                onChange={handleChange}
                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                required
              />
            </div>
            <div>
              <label htmlFor='content' className='block text-sm font-medium text-gray-700'>
                Content
              </label>
              <textarea
                id='content'
                name='content'
                value={currentBlog.content}
                onChange={handleChange}
                rows={8}
                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                required
              />
            </div>
            <div className='flex justify-end space-x-3'>
              <button
                type='button'
                onClick={handleCancel}
                className='bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500'
              >
                Cancel
              </button>
              <button
                type='submit'
                className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-green-500'
              >
                Update Blog
              </button>
            </div>
          </form>
        </div>
      )}
      <Outlet />
    </div>
  )
}

export default Admin

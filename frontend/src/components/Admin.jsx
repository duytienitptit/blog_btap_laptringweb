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
  }, [])
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
                      ID
                    </th>
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
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{blog.id}</td>
                      <td className='px-6 py-4 text-sm text-gray-900'>{blog.title}</td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm'>
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
      )}

      <Outlet />
    </div>
  )
}

export default Admin

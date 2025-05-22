// Load environment variables first - must be at the top
require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
// Import models instead of static data
const User = require('./models/User')
const Blog = require('./models/Blog')
const app = express()

const PORT = process.env.PORT || 8080
const MONGODB_URI = process.env.MONGODB_URI

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('🌿 Kết nối thành công với MongoDB'))
  .catch(err => console.error('❌ Lỗi kết nối MongoDB:', err))

// Middlewares
app.use(cors())
app.use(express.json())

// Auth Routes
app.post('/auth/login', async (req, res) => {
  const { username, password } = req.body

  // Validate required fields
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' })
  }

  try {
    // Find user
    const user = await User.findOne({ username })
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    // Verify password (simple string comparison)
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    // Return user info (without password)
    return res.json({
      user: {
        id: user._id,
        username: user.username,
        fullName: user.fullName
      }
    })
  } catch (err) {
    console.error('❌ Error during login:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

// User Registration Route
app.post('/auth/register', async (req, res) => {
  const { username, email, password, fullName } = req.body

  // Validate required fields
  if (!username || !email || !password || !fullName) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  try {
    // Check if username already exists
    const existingUsername = await User.findOne({ username })
    if (existingUsername) {
      return res.status(400).json({ error: 'Username already taken' })
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ email })
    if (existingEmail) {
      return res.status(400).json({ error: 'Email already registered' })
    }

    // Create new user
    const newUser = new User({
      username,
      email,
      password, // Note: In production, password should be hashed
      fullName
    })

    // Save to database
    await newUser.save()

    // Return success without exposing password
    return res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        fullName: newUser.fullName
      }
    })
  } catch (err) {
    console.error('❌ Error during registration:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

// Routes
// Get all blogs (only id and title)
app.get('/blogs', async (req, res) => {
  const { keywords } = req.query
  console.log(keywords)

  try {
    // Nếu không có keywords thì trả lại toàn bộ blogs
    if (!keywords) {
      const blogs = await Blog.find({}, '_id title author')
      return res.json(
        blogs.map(blog => ({
          id: blog._id,
          title: blog.title,
          author: blog.author
        }))
      )
    }

    // Filter blogs based on keywords (case-insensitive)
    const blogs = await Blog.find({ title: { $regex: keywords, $options: 'i' } }, '_id title')
    return res.json(
      blogs.map(blog => ({
        id: blog._id,
        title: blog.title
      }))
    )
  } catch (err) {
    console.error('❌ Error fetching blogs:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

// Get a specific blog by ID
app.get('/blogs/:id', async (req, res) => {
  const id = req.params.id

  try {
    // Find blog with the requested id
    const blog = await Blog.findById(id)

    // If blog not found, return 404 error
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' })
    }

    // Return the found blog
    return res.json(blog)
  } catch (err) {
    console.error('❌ Error fetching blog:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

// Add new blog post
app.post('/blogs', async (req, res) => {
  const { title, content, author } = req.body

  // Validate required fields
  if (!title || !content || !author) {
    return res.status(400).json({ error: 'Title, content, and author are required' })
  }

  try {
    // Create new blog object
    const newBlog = new Blog({
      title,
      content,
      author
    })
    console.log('New blog object:', newBlog)

    // Save to database
    await newBlog.save()

    // Return the newly created blog
    return res.status(201).json(newBlog)
  } catch (err) {
    console.error('❌ Error creating blog:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

// Edit blog post
app.put('/blogs/:id', async (req, res) => {
  const id = req.params.id
  const { title, content } = req.body

  // Validate required fields
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' })
  }

  try {
    // Find and update the blog post
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, content },
      { new: true } // Return the updated document
    )

    // If blog not found
    if (!updatedBlog) {
      return res.status(404).json({ error: 'Blog not found' })
    }

    // Return the updated blog
    return res.json(updatedBlog)
  } catch (err) {
    console.error('❌ Error updating blog:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

// Delete blog post
app.delete('/blogs/:id', async (req, res) => {
  const id = req.params.id

  try {
    // Find and delete the blog post
    const deletedBlog = await Blog.findByIdAndDelete(id)

    // If blog not found
    if (!deletedBlog) {
      return res.status(404).json({ error: 'Blog not found' })
    }

    // Return success message
    return res.json({ message: 'Blog deleted successfully' })
  } catch (err) {
    console.error('❌ Error deleting blog:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy ở http://localhost:${PORT}`)
})

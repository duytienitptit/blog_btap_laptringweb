const express = require("express")
const cors = require("cors")
const blogs = require("./data/blogs")

const app = express()
const PORT = 8080

// Middlewares
app.use(cors())
app.use(express.json())

// Route
app.get("/blogs", (req, res) => {
  return res.json(blogs)
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy ở http://localhost:${PORT}`)
})

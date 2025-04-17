const express = require("express")
const cors = require("cors")
const blogRoutes = require("./routes/blogRoutes")

const app = express()
const PORT = 8080

app.use(cors()) // 👈 THÊM DÒNG NÀY để tránh lỗi CORS
app.use(express.json())

app.use("/blogs", blogRoutes)

app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy ở http://localhost:${PORT}`)
})

const express = require("express")
const router = express.Router()
const { getAllBlogs, getBlogById } = require("../controllers/blogController")

router.get("/", getAllBlogs)

module.exports = router

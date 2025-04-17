const blogs = require("../data/blogs")

const getAllBlogs = (req, res) => {
  const blogList = blogs.map(({ id, slug, title, content }) => ({
    id,
    slug,
    title,
    content,
  }))
  res.json(blogList)
}

module.exports = { getAllBlogs }

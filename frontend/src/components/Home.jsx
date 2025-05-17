import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth'
import { useState, useEffect } from 'react'

export default function Home() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className='min-h-screen transition-colors duration-300 bg-gradient-to-b from-gray-50 to-gray-100'>
      <div
        className={`max-w-6xl mx-auto text-center py-24 px-6 relative ${
          scrolled ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-95'
        } transition-all duration-700`}
      >
        <div className='absolute inset-0 bg-white/30 backdrop-blur-sm rounded-2xl -z-10 border border-gray-200'></div>

        <h1 className='text-6xl font-extrabold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500'>
          <span className='inline-block animate-float'>Web</span>
          <span className='inline-block animate-float animation-delay-300'>Blog</span>
        </h1>

        <p className='text-xl mb-10 max-w-3xl mx-auto leading-relaxed text-gray-700'>
          A modern blogging platform for sharing your thoughts and ideas with the world. Start writing and
          connect with readers today.
        </p>

        <div className='flex flex-wrap justify-center gap-4 mt-8'>
          {isAuthenticated() ? (
            <Link
              to='/blogs'
              className='group relative overflow-hidden px-8 py-3 rounded-full font-medium bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-white transition-all duration-300 hover:shadow-lg hover:scale-105 transform'
            >
              <span className='relative z-10'>Explore Blog Posts</span>
              <span className='absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300'></span>
            </Link>
          ) : (
            <Link
              to='/login'
              className='group relative overflow-hidden px-8 py-3 rounded-full font-medium bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-white transition-all duration-300 hover:shadow-lg hover:scale-105 transform'
            >
              <span className='relative z-10'>Login to Get Started</span>
              <span className='absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300'></span>
            </Link>
          )}

          <Link
            to='/about'
            className='group relative overflow-hidden px-8 py-3 rounded-full font-medium bg-white text-blue-600 hover:text-blue-700 transition-all duration-300 border border-blue-200 hover:shadow-lg'
          >
            <span className='relative z-10'>Learn More</span>
            <span className='absolute inset-0 bg-blue-50 translate-y-full group-hover:translate-y-0 transition-transform duration-300'></span>
          </Link>
        </div>
      </div>

      {/* Features Section with card improvements */}
      <div
        className={`max-w-6xl mx-auto my-24 px-6 relative ${
          scrolled ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-95'
        } transition-all duration-700 delay-300`}
      >
        <h2 className='text-3xl font-bold text-center mb-16 text-gray-800'>
          Why Choose <span className='text-blue-600'>WebBlog</span>?
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div className='group p-8 rounded-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/70 backdrop-blur-sm hover:bg-white shadow-md hover:shadow-xl border border-gray-100'>
            <div className='w-16 h-16 mb-6 flex items-center justify-center rounded-2xl bg-blue-100 text-blue-600 text-2xl transition-transform group-hover:scale-110'>
              📝
            </div>
            <h3 className='text-2xl font-semibold mb-4 text-blue-600'>Blog Posts</h3>
            <p className='leading-relaxed text-gray-700'>
              Create and read interesting blog posts on various topics. Our modern editor makes it easy to
              express yourself with style.
            </p>
          </div>

          <div className='group p-8 rounded-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/70 backdrop-blur-sm hover:bg-white shadow-md hover:shadow-xl border border-gray-100'>
            <div className='w-16 h-16 mb-6 flex items-center justify-center rounded-2xl bg-purple-100 text-purple-600 text-2xl transition-transform group-hover:scale-110'>
              🔒
            </div>
            <h3 className='text-2xl font-semibold mb-4 text-purple-600'>Secure Access</h3>
            <p className='leading-relaxed text-gray-700'>
              Protected content only for authenticated users. Your data is always safe with our advanced
              security infrastructure.
            </p>
          </div>

          <div className='group p-8 rounded-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/70 backdrop-blur-sm hover:bg-white shadow-md hover:shadow-xl border border-gray-100'>
            <div className='w-16 h-16 mb-6 flex items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 text-2xl transition-transform group-hover:scale-110'>
              ⚡
            </div>
            <h3 className='text-2xl font-semibold mb-4 text-indigo-600'>Fast Experience</h3>
            <p className='leading-relaxed text-gray-700'>
              Built with React for a smooth user experience. Enjoy lightning-fast page loads and seamless
              navigation throughout the site.
            </p>
          </div>
        </div>
      </div>

      {/* Newsletter Section - New Addition */}
      <div
        className={`max-w-4xl mx-auto my-24 px-6 py-12 rounded-2xl relative ${
          scrolled ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-95'
        } transition-all duration-700 delay-500 bg-white/70 backdrop-blur-sm shadow-xl`}
      >
        <div className='absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-20 -z-10'></div>

        <h2 className='text-3xl font-bold text-center mb-6 text-gray-800'>Stay Updated</h2>
        <p className='text-center max-w-2xl mx-auto mb-8 text-gray-700'>
          Subscribe to our newsletter to receive the latest updates and featured posts.
        </p>

        <form className='flex flex-col sm:flex-row gap-3 max-w-md mx-auto'>
          <input
            type='email'
            placeholder='Your email address'
            className='flex-1 px-4 py-3 rounded-lg focus:outline-none bg-white border border-gray-300 focus:border-blue-500'
          />
          <button
            type='submit'
            className='px-6 py-3 rounded-lg font-medium transition-all bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
          >
            Subscribe
          </button>
        </form>
      </div>

      {/* Footer - New Addition */}
      <footer className='py-8 mt-auto border-t border-gray-200 text-gray-600'>
        <div className='max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center'>
          <div className='mb-4 md:mb-0'>
            <p>© 2023 WebBlog. All rights reserved.</p>
          </div>
          <div className='flex gap-6'>
            <a href='#' className='hover:text-blue-500 transition-colors'>
              Terms
            </a>
            <a href='#' className='hover:text-blue-500 transition-colors'>
              Privacy
            </a>
            <a href='#' className='hover:text-blue-500 transition-colors'>
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

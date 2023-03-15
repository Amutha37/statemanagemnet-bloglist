import { useDispatch, useSelector } from 'react-redux'
import Blog from './Blog.js'
// none default  function exported with curly bracess
import React from 'react'
// import blogService from '../services/blogs'
import { updateNewLikes, updateDeleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogList = (user) => {
  const dispatch = useDispatch()
  // * const importantBlogs = useSelector(state => state.filter(blog => blog.important))

  const blogs = useSelector((state) => state.blogs)
  console.log('blog list', blogs)
  // ? above
  // let sortLikes = (a, b) => (b.likes > a.likes ? 1 : -1)

  // blogs.sort(sortLikes)

  const handleBlogLikes = async (blog) => {
    console.log('handlelikes', blog)
    dispatch(updateNewLikes(blog))
    dispatch(setNotification(`You voted for : '${blog.title}'`, 5))
  }

  // === Delete Blog ===
  const handleDeleteBlog = async (blogId) => {
    const blogToDelete = blogs.find((blog) => blog.id === blogId)
    const sureToDelete = window.confirm(
      `Confirm remove blog you're don't need!  :${blogToDelete.title}`
    )

    if (sureToDelete) {
      dispatch(updateDeleteBlog(blogId))
    }
  }

  return (
    <div>
      <h2>List of blogs</h2>
      {blogs.map((blog, i) => (
        <Blog
          key={blog.id}
          blog={blog}
          ind={i}
          handleBlogLikes={handleBlogLikes}
          handleDeleteBlog={handleDeleteBlog}
          logedUser={user.name}
        />
      ))}

      {/* <ol>
        {anecdotes.map((anecdote, index) => (
          <li id='list' key={index}>
            {anecdote.content} has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </li>
        ))}
      </ol> */}
    </div>
  )
}

export default BlogList

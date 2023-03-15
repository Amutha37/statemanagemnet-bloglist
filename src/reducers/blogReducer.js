import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    addLike(state, action) {
      const blog = action.payload

      return state.map((blo) => (blo.id !== blog.id ? blo : blog))
    },
    removeBlog(state, action) {
      const blog = action.payload
      state.filter((blo) => {
        return blo.id !== blog
      })
    },

    // Add blog object to the backend db
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      state = action.payload
      return state
    },
  },
})

export const { addLike, removeBlog, appendBlog, setBlogs } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    blogs.sort((a, b) => (b.likes > a.likes ? 1 : -1))
    dispatch(setBlogs(blogs))
  }
}

export const createNewBlog = (content) => {
  return async (dispatch) => {
    const newblog = await blogService.create(content)
    dispatch(appendBlog(newblog))
  }
}

export const updateNewLikes = (blog) => {
  console.log(blog)
  const newLike = {
    ...blog,
    likes: blog.likes + 1,
    user: blog.user.id,
  }
  return async (dispatch) => {
    dispatch(addLike(newLike))
    await blogService.update(newLike)
  }
}

export const updateDeleteBlog = (blogId) => {
  return async (dispatch) => {
    dispatch(removeBlog(blogId))
    await blogService.deleteBlog(blogId)
  }
}

export default blogSlice.reducer

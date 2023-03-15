import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    addVote(state, action) {
      const blog = action.payload

      return state.map((blo) => (blo.id !== blog.id ? blo : blog))
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

export const { addVote, appendBlog, setBlog } = blogSlice.actions

export const initializeBlog = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setblog(blogs))
  }
}

export const createNewBlog = (content) => {
  return async (dispatch) => {
    const newblog = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newblog))
  }
}

export const updateNewVote = (blog) => {
  const newVote = {
    ...blog,
    votes: blog.likes + 1,
  }
  return async (dispatch) => {
    dispatch(addVote(newVote))
    await blogService.update(newVote)
  }
}

export default anecdoteSlice.reducer

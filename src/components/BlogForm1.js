import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { createNewBlog } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = () => {
  const dispatch = useDispatch()
  // == new blog list local state ===
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  // === handle change ===
  const handleChangeTitle = (event) => {
    setTitle(event.target.value)
  }
  const handleChangeAuthor = (event) => {
    setAuthor(event.target.value)
  }
  const handleChangeUrl = (event) => {
    setUrl(event.target.value)
  }

  // === add blog ===
  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    setErrTextColour(false)
    try {
      const saveBlog = await blogService.create(blogObject)
      console.log('saveBlog', saveBlog)

      setBlogs([...blogs, saveBlog])
      setShowing(true)
      setErrorMessage(`Blog '${saveBlog.title}' succesfully saved.`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (error) {
      console.log(error.response.data)
      setErrTextColour(true)
      setShowing(true)
      setErrorMessage(error.response.data)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  // const addBlog = async (e) => {
  //   e.preventDefault()
  //   const content = {
  //     title,
  //     author,
  //     url,
  //   }
  //  dispatch(createNewBlog(content))
  //   // createBlog({
  //   //   title,
  //   //   author,
  //   //   url,
  //   // })
  //   dispatch(setNotification(`Added new blog : ${title}`, 5))
  //   setTitle('')
  //   setUrl('')
  //   setAuthor('')
  // }

  return (
    <div className='newBlog'>
      <h2>Create a new blog list</h2>
      <form onSubmit={addBlog}>
        <label>
          Title
          <input
            type='text'
            value={title}
            id='title'
            placeholder='title'
            onChange={handleChangeTitle}
          />
        </label>
        <label>
          Author
          <input
            type='text'
            value={author}
            id='author'
            placeholder='author'
            onChange={handleChangeAuthor}
          />
        </label>
        <label>
          URL
          <input
            type='text'
            value={url}
            id='url'
            placeholder='web url'
            onChange={handleChangeUrl}
          />
        </label>
        <button type='submit'>Save</button>
      </form>
    </div>
  )
}

export default BlogForm

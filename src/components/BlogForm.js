import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = ({ createBlog }) => {
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

  const addBlog = (e) => {
    e.preventDefault()

    createBlog({
      title,
      author,
      url,
    })
    dispatch(setNotification(`Added new blog : ${title}`, 5))
    setTitle('')
    setUrl('')
    setAuthor('')
  }

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

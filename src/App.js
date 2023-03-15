import './app.css'
import React, { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
// import { createNewBlog } from '../reducers/blogReducer'
// import { setNotification } from '../reducers/notificationReducer'

import blogService from './services/blogs'
import BlogList from './components/BlogList'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { initializeBlogs } from './reducers/blogReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const [user, setUser] = useState(null)

  const [errorMessage, setErrorMessage] = useState(null)
  const [errTextColour, setErrTextColour] = useState(true)

  const [showing, setShowing] = useState(false)

  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])
  // Handle the first loading page with user loged in
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  // === Add new blog list ===
  const addBlog = async (blogObject) => {
    // const newBlog = { title, author, url }

    // blogService.create(blogObject).then((returnedBlog) => {
    //   setBlogs(blogs.concat(returnedBlog))
    // })
    blogFormRef.current.toggleVisibility()
    setErrTextColour(false)
    try {
      const saveBlog = await blogService.create(blogObject)
      console.log('saveBlog', saveBlog)

      // setBlogs([...blogs, saveBlog])
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

  // === handling loging ===
  const handleLogin = async (loginObject) => {
    try {
      const user = await loginService.login({
        username: loginObject.username,
        password: loginObject.password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setErrTextColour(true)
      setShowing(true)
      setErrorMessage('Wrong user name or password!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  // === login form ===

  const loginForm = () => (
    <Togglable buttonLabel='Log In'>
      <LoginForm createLogin={handleLogin} />
    </Togglable>
  )

  // === New Blog list form ===
  const blogForm = () => (
    <Togglable buttonLabel='Create new blog list' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} signOff={signOff} />
    </Togglable>
  )

  //  === signoff ===
  const signOff = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    return setUser(null)
  }
  // === handleLikes ===
  // const handleBlogLikes = async (blogId) => {
  //   const blogToChange = blogs.find((blog) => blog.id === blogId)

  //   const updatedBlog = {
  //     ...blogToChange,
  //     likes: ++blogToChange.likes,
  //     user: blogToChange.user.id,
  //   }
  //   const resStatus = await blogService.update(blogId, updatedBlog)
  //   console.log('resStatus', resStatus.data)
  // }
  // === Delete Blog ===
  // const handleDeleteBlog = async (blogId) => {
  //   const blogToDelete = blogs.find((blog) => blog.id === blogId)
  //   const sureToDelete = window.confirm(
  //     `Confirm remove blog you're don't need!  :${blogToDelete.title}`
  //   )

  //   if (sureToDelete) {
  //     await blogService.deleteBlog(blogId)
  //     setBlogs(
  //       blogs.filter((blog) => {
  //         return blog.id !== blogId
  //       })
  //     )
  //   }
  // }

  return (
    <>
      <div className='main_container'>
        <h2>Blog List </h2>
        <div>
          {showing && (
            // <Notification message={errorMessage} textColor={errTextColour} />
            <Notification />
          )}

          {/* == conditional form */}
          {user === null ? (
            loginForm()
          ) : (
            <>
              <div className='logInBy'>
                <p>{user.name} logged-in</p>
                <button type='button' onClick={signOff}>
                  Log Out
                </button>
              </div>
              {blogForm()}
            </>
          )}
        </div>
        <BlogList user={user} />
      </div>
    </>
  )
}

export default App

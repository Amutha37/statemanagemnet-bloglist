import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
  // return request.then((response) => response.data)
}

const create = async (newObject) => {
  // authorize token
  const config = {
    headers: { Authorization: token },
  }

  const request = await axios.post(baseUrl, newObject, config)
  // without async
  // return request.then((response) => response.data)
  return request.data
}

const update = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = await axios.put(
    `${baseUrl}/${newObject.id}`,
    newObject,
    config
  )
  const response = request
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = await axios.delete(`${baseUrl}/${id}`, config)
  const response = request
  return response.data
}
// Since the names of the keys and the assigned variables are the same, we can write the object definition with more compact syntax:
// from this to ES6 {
//   getAll: getAll,
//   create: create,
//   update: update
// }
//  to this

const fetchAll = {
  getAll: getAll,
  create: create,
  update: update,
  deleteBlog: deleteBlog,
  setToken: setToken,
}
export default fetchAll

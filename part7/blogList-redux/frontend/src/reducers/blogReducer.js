import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    removeBlog(state, action) {
      const id = action.payload
      return state.filter((blog) => blog.id !== id)
    },
    like(state, action) {
      const votedBlog = action.payload
      return state.map((blog) => (blog.id !== votedBlog.id ? blog : votedBlog))
    },
  },
})

export const { setBlogs, appendBlog, removeBlog, like } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.deletion(id)
    dispatch(removeBlog(id))
  }
}

export const likeBlog = (id) => {
  return async (dispatch, getState) => {
    const blogToLike = getState().blogs.find((blog) => blog.id === id)
    const updatedBlog = {
      ...blogToLike,
      likes: blogToLike.likes + 1,
    }

    const likedBlog = await blogService.update(id, updatedBlog)
    console.log('like response', likedBlog)
    dispatch(like(likedBlog))
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blog)
      dispatch(appendBlog(newBlog))
      return newBlog
    } catch (error) {
      if (error.response && error.response.data.error) {
        throw error.response.data.error
      } else {
        throw error
      }
    }
  }
}

export default blogSlice.reducer

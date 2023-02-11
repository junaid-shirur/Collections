import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { Action } from '../actions/common'
import { Images as Img, UserAccount } from '../actions/types'

// Define a type for the slice state
interface State {
  User: UserAccount
  Images: Array<Img>
  favourites: Array<Img>
}

// Define the initial state using that type
const initialState: State = {
  User: {
    userId: '',
    username: '',
    createdAt: 0,
    password: ''
  },
  Images: [],
  favourites: []
}

export const Images = createSlice({
  name: 'images',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    deleteImage: (state, action) => {
      return {
        ...state,
        Images: action.payload
      }
    },
    filter: (state, action) => {
      // @ts-ignore
      state.images = action.payload
    },
    uploadImage: (state, action) => {
      return {
        ...state,
        Images: [...state.Images, action.payload]
      }
    },
    getImages: (state, action: PayloadAction<Array<Img>>) => {
      return {
        ...state,
        Images: action.payload
      }
    }
  },
})


export const { deleteImage, filter, uploadImage, getImages } = Images.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.test.value

export default Images.reducer
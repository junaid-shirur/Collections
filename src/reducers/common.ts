import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
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
  initialState,
  reducers: {
    deleteImage: (state, action) => {
      const updatedState = state.Images.filter(img => !(action.payload[img._id] && action.payload[img._id]))
      return {
        ...state,
        Images: [...updatedState]
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
        Images: action.payload,
        favourites: action.payload.filter(img => img.favourite)
      }
    },
    updateFavImages: (state, action: PayloadAction<{ imgIds: any, add: boolean }>) => {
      const updateImgs = state.Images.map(img => (action.payload.imgIds[img._id] == img._id ?
        { ...img, favourite: action.payload.add ? true : false }
        : img))
      return {
        ...state,
        Images: updateImgs,
        favourites: updateImgs.filter(img => img.favourite)
      }
    },
    filterImages: (state, { payload }: PayloadAction<{ page: string, filterBy: string }>) => {
      let imgs: Array<Img> = payload.page == 'favs' ? state.favourites : state.Images
      if (payload.filterBy === 'title') {
        imgs.sort((a, b) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1
          }
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1
          }
          return 0
        })
      } else if (payload.filterBy === 'date') {
        imgs.sort((a, b) => {

          if (a.createdAt < b.createdAt) {
            return -1
          }
          if (a.createdAt > b.createdAt) {
            return 1
          }
          return 0
        })
      } else if (payload.filterBy === 'size') {
        imgs.sort((a, b) => {
          if (a.thumbnail < b.thumbnail) {
            return -1
          }
          if (a.thumbnail > b.thumbnail) {
            return 1
          }
          return 0
        })
      }
    }
  }
})


export const { deleteImage, filter, uploadImage, getImages, updateFavImages, filterImages } = Images.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.test.value

export default Images.reducer
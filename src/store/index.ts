import { configureStore } from '@reduxjs/toolkit'
import { Images } from '../reducers/common'
// ...

export const store:any = configureStore({
  reducer: {
    images: Images.reducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
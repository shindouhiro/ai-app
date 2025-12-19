import { configureStore } from '@reduxjs/toolkit'
import navigationReducer from './slices/navigationSlice'
import vehicleReducer from './slices/vehicleSlice'

export const store = configureStore({
  reducer: {
    navigation: navigationReducer,
    vehicle: vehicleReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

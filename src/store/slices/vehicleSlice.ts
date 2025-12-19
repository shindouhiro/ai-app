import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Vehicle {
  id: string
  model: string
  vin: string
  color: string
  battery_level: number
  range: number
  is_locked: boolean
  window_status: string
  temperature: number
  trunk_open?: boolean
  location?: { lat: number; lon: number }
  status: string
}

interface VehicleState {
  vehicles: Vehicle[]
  currentVehicle: Vehicle | null
  loading: boolean
  error: string | null
  controlLoading: { [key: string]: boolean }
}

const initialState: VehicleState = {
  vehicles: [],
  currentVehicle: null,
  loading: false,
  error: null,
  controlLoading: {},
}

const vehicleSlice = createSlice({
  name: 'vehicle',
  initialState,
  reducers: {
    setVehicles: (state, action: PayloadAction<Vehicle[]>) => {
      state.vehicles = action.payload
      if (action.payload.length > 0 && !state.currentVehicle) {
        state.currentVehicle = action.payload[0]
      }
    },
    setCurrentVehicle: (state, action: PayloadAction<Vehicle>) => {
      state.currentVehicle = action.payload
    },
    updateVehicleStatus: (state, action: PayloadAction<Partial<Vehicle>>) => {
      if (state.currentVehicle) {
        state.currentVehicle = { ...state.currentVehicle, ...action.payload }
      }
      const index = state.vehicles.findIndex(v => v.id === action.payload.id)
      if (index !== -1) {
        state.vehicles[index] = { ...state.vehicles[index], ...action.payload }
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setControlLoading: (state, action: PayloadAction<{ key: string; loading: boolean }>) => {
      state.controlLoading[action.payload.key] = action.payload.loading
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const {
  setVehicles,
  setCurrentVehicle,
  updateVehicleStatus,
  setLoading,
  setControlLoading,
  setError,
} = vehicleSlice.actions

export default vehicleSlice.reducer

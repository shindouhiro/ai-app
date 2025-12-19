import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { message } from 'antd'
import type { RootState } from '../store'
import { vehicleApi } from '../services/vehicleApi'
import {
  setVehicles,
  setCurrentVehicle,
  updateVehicleStatus,
  setLoading,
  setControlLoading,
  setError,
} from '../store/slices/vehicleSlice'

export function useVehicle() {
  const dispatch = useDispatch()
  const { vehicles, currentVehicle, loading, controlLoading } = useSelector(
    (state: RootState) => state.vehicle
  )

  const loadVehicles = useCallback(async (userId: string) => {
    dispatch(setLoading(true))
    try {
      const data = await vehicleApi.getVehicles(userId)
      dispatch(setVehicles(data.vehicles))
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '加载车辆失败'
      dispatch(setError(errorMessage))
      message.error(errorMessage)
    } finally {
      dispatch(setLoading(false))
    }
  }, [dispatch])

  const loadVehicle = useCallback(async (vehicleId: string) => {
    dispatch(setLoading(true))
    try {
      const vehicle = await vehicleApi.getVehicle(vehicleId)
      dispatch(setCurrentVehicle(vehicle))
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '加载车辆失败'
      dispatch(setError(errorMessage))
      message.error(errorMessage)
    } finally {
      dispatch(setLoading(false))
    }
  }, [dispatch])

  const controlLock = useCallback(async (vehicleId: string, action: 'lock' | 'unlock') => {
    dispatch(setControlLoading({ key: 'lock', loading: true }))
    try {
      const result = await vehicleApi.controlLock(vehicleId, action)
      dispatch(updateVehicleStatus({ id: vehicleId, is_locked: action === 'lock' }))
      message.success(result.message)
    } catch (error) {
      message.error('控制车锁失败')
    } finally {
      dispatch(setControlLoading({ key: 'lock', loading: false }))
    }
  }, [dispatch])

  const controlWindow = useCallback(async (vehicleId: string, action: 'open' | 'close') => {
    dispatch(setControlLoading({ key: 'window', loading: true }))
    try {
      const result = await vehicleApi.controlWindow(vehicleId, action)
      dispatch(updateVehicleStatus({ id: vehicleId, window_status: action === 'open' ? 'opened' : 'closed' }))
      message.success(result.message)
    } catch (error) {
      message.error('控制车窗失败')
    } finally {
      dispatch(setControlLoading({ key: 'window', loading: false }))
    }
  }, [dispatch])

  const controlTrunk = useCallback(async (vehicleId: string, action: 'open' | 'close') => {
    dispatch(setControlLoading({ key: 'trunk', loading: true }))
    try {
      const result = await vehicleApi.controlTrunk(vehicleId, action)
      dispatch(updateVehicleStatus({ id: vehicleId, trunk_open: action === 'open' }))
      message.success(result.message)
    } catch (error) {
      message.error('控制尾门失败')
    } finally {
      dispatch(setControlLoading({ key: 'trunk', loading: false }))
    }
  }, [dispatch])

  const controlTemperature = useCallback(async (vehicleId: string, temperature: number) => {
    dispatch(setControlLoading({ key: 'temperature', loading: true }))
    try {
      await vehicleApi.controlTemperature(vehicleId, temperature)
      dispatch(updateVehicleStatus({ id: vehicleId, temperature }))
      message.success(`温度已设置为 ${temperature}°C`)
    } catch (error) {
      message.error('设置温度失败')
    } finally {
      dispatch(setControlLoading({ key: 'temperature', loading: false }))
    }
  }, [dispatch])

  const findVehicle = useCallback(async (vehicleId: string) => {
    dispatch(setControlLoading({ key: 'find', loading: true }))
    try {
      const result = await vehicleApi.findVehicle(vehicleId)
      message.success(result.message)
    } catch (error) {
      message.error('寻车失败')
    } finally {
      dispatch(setControlLoading({ key: 'find', loading: false }))
    }
  }, [dispatch])

  return {
    vehicles,
    currentVehicle,
    loading,
    controlLoading,
    loadVehicles,
    loadVehicle,
    controlLock,
    controlWindow,
    controlTrunk,
    controlTemperature,
    findVehicle,
  }
}

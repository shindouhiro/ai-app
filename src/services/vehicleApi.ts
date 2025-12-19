import { API_BASE_URL } from '../config/api'

export const vehicleApi = {
  // 获取用户车辆列表
  async getVehicles(userId: string) {
    const response = await fetch(`${API_BASE_URL}/api/v1/vehicles?user_id=${userId}`)
    if (!response.ok) throw new Error('Failed to fetch vehicles')
    return response.json()
  },

  // 获取车辆详情
  async getVehicle(vehicleId: string) {
    const response = await fetch(`${API_BASE_URL}/api/v1/vehicles/${vehicleId}`)
    if (!response.ok) throw new Error('Failed to fetch vehicle')
    return response.json()
  },

  // 车锁控制
  async controlLock(vehicleId: string, action: 'lock' | 'unlock') {
    const response = await fetch(`${API_BASE_URL}/api/v1/vehicles/${vehicleId}/lock?action=${action}`, {
      method: 'POST',
    })
    if (!response.ok) throw new Error('Failed to control lock')
    return response.json()
  },

  // 车窗控制
  async controlWindow(vehicleId: string, action: 'open' | 'close') {
    const response = await fetch(`${API_BASE_URL}/api/v1/vehicles/${vehicleId}/window?action=${action}`, {
      method: 'POST',
    })
    if (!response.ok) throw new Error('Failed to control window')
    return response.json()
  },

  // 尾门控制
  async controlTrunk(vehicleId: string, action: 'open' | 'close') {
    const response = await fetch(`${API_BASE_URL}/api/v1/vehicles/${vehicleId}/trunk?action=${action}`, {
      method: 'POST',
    })
    if (!response.ok) throw new Error('Failed to control trunk')
    return response.json()
  },

  // 温度控制
  async controlTemperature(vehicleId: string, temperature: number) {
    const response = await fetch(`${API_BASE_URL}/api/v1/vehicles/${vehicleId}/temperature?temperature=${temperature}`, {
      method: 'POST',
    })
    if (!response.ok) throw new Error('Failed to control temperature')
    return response.json()
  },

  // 寻车功能
  async findVehicle(vehicleId: string) {
    const response = await fetch(`${API_BASE_URL}/api/v1/vehicles/${vehicleId}/find`, {
      method: 'POST',
    })
    if (!response.ok) throw new Error('Failed to find vehicle')
    return response.json()
  },
}

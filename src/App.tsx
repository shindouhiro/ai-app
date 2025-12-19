import { Routes, Route } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { HomePage } from './pages/HomePage'
import { VehiclePage } from './pages/VehiclePage'
import { ServicePage } from './pages/ServicePage'
import { MallPage } from './pages/MallPage'
import { ProfilePage } from './pages/ProfilePage'
import { LoginPage } from './pages/LoginPage'
import { ResponsiveLayout } from './components/Layout/ResponsiveLayout'
import { AuthProvider } from './contexts/AuthContext'

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <AuthProvider>
        <Routes>
<Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<ResponsiveLayout />}>
            <Route index element={<HomePage />} />
            <Route path="vehicle" element={<VehiclePage />} />
            <Route path="service" element={<ServicePage />} />
            <Route path="mall" element={<MallPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </ConfigProvider>
  )
}

export default App

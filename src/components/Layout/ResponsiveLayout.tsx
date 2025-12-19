import { Outlet } from 'react-router-dom'
import { Layout, Badge } from 'antd'
import { HomeOutlined, CarOutlined, CustomerServiceOutlined, ShoppingOutlined, UserOutlined } from '@ant-design/icons'
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useResponsive } from '../../hooks/useResponsive'
import { setCurrentTab, saveScrollPosition, restoreScrollPosition, clearUnreadCount } from '../../store/slices/navigationSlice'
import type { RootState } from '../../store'
import './ResponsiveLayout.css'

const { Content } = Layout

const navItems = [
  { key: '/', label: '发现', icon: <HomeOutlined /> },
  { key: '/mall', label: '商城', icon: <ShoppingOutlined /> },
  { key: '/vehicle', label: '车控', icon: <CarOutlined /> },
  { key: '/service', label: '服务', icon: <CustomerServiceOutlined /> },
  { key: '/profile', label: '我的', icon: <UserOutlined /> },
]

export function ResponsiveLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const deviceType = useResponsive()
  const dispatch = useDispatch()
  const unreadCounts = useSelector((state: RootState) => state.navigation.unreadCounts)

  useEffect(() => {
    dispatch(setCurrentTab(location.pathname))
    dispatch(clearUnreadCount(location.pathname))
    dispatch(restoreScrollPosition(location.pathname))
  }, [location.pathname, dispatch])

  useEffect(() => {
    const handleScroll = () => {
      dispatch(saveScrollPosition({ path: location.pathname, position: window.scrollY }))
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [location.pathname, dispatch])

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ paddingBottom: deviceType === 'mobile' ? 60 : 0 }}>
        <Outlet />
      </Content>

      {/* 底部导航栏 */}
      <div className="bottom-nav">
        {navItems.map(item => (
          <div
            key={item.key}
            className={`nav-item ${location.pathname === item.key ? 'active' : ''}`}
onClick={() => navigate(item.key)}
          >
            <Badge count={unreadCounts[item.key] || 0} size="small" offset={[5, -5]}>
              <div className="nav-icon">{item.icon}</div>
            </Badge>
            <div className="nav-label">{item.label}</div>
          </div>
        ))}
      </div>
    </Layout>
  )
}

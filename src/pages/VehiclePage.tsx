import { useEffect } from 'react'
import { Card, Button, Typography, Space, Spin, Row, Col } from 'antd'
import {
  LockOutlined,
  WindowsOutlined,
  CarOutlined,
  UserOutlined,
  EnvironmentOutlined,
  SearchOutlined,
  ThunderboltOutlined,
  ExperimentOutlined,
  ApiOutlined,
  KeyOutlined,
  HeartOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import { useVehicle } from '../hooks/useVehicle'

const { Title, Text } = Typography

export function VehiclePage() {
  const {
    currentVehicle,
    loading,
    controlLoading,
    loadVehicles,
    controlLock,
    controlWindow,
    controlTrunk,
    findVehicle,
  } = useVehicle()

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      const userData = JSON.parse(user)
      loadVehicles(userData.id)
    }
  }, [loadVehicles])

  // 检查用户是否登录
  const user = localStorage.getItem('user')

  if (!user) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
        padding: '20px'
      }}>
        <CarOutlined style={{ fontSize: '64px', color: '#d9d9d9', marginBottom: '16px' }} />
        <Text type="secondary" style={{ fontSize: '16px' }}>请先登录查看车辆信息</Text>
      </div>
    )
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <Spin size="large" />
      </div>
    )
  }

  if (!currentVehicle) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
        padding: '20px'
      }}>
        <CarOutlined style={{ fontSize: '64px', color: '#d9d9d9', marginBottom: '16px' }} />
        <Text type="secondary" style={{ fontSize: '16px', marginBottom: '8px' }}>暂无车辆信息</Text>
        <Text type="secondary" style={{ fontSize: '14px' }}>请联系客服添加车辆</Text>
      </div>
    )
  }

  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh', paddingBottom: '60px' }}>
      {/* 顶部车辆信息区 */}
      <div style={{ background: '#fff', padding: '16px' }}>
        <Title level={4} style={{ margin: 0, marginBottom: '12px' }}>
          龙尾达者的{currentVehicle.model}
        </Title>

        {/* 续航信息 */}
        <Space size="large" style={{ marginBottom: '12px' }}>
          <Text style={{ fontSize: '20px', fontWeight: 'bold' }}>
            {currentVehicle.range}km
          </Text>
          <Space>
            <ThunderboltOutlined style={{ color: '#52c41a', fontSize: '16px' }} />
            <Text style={{ fontSize: '16px', color: '#52c41a', fontWeight: 'bold' }}>
              {Math.round(currentVehicle.range * 0.175)}km
            </Text>
          </Space>
          <Space>
            <ExperimentOutlined style={{ color: '#1890ff', fontSize: '16px' }} />
            <Text style={{ fontSize: '16px', color: '#1890ff', fontWeight: 'bold' }}>
              {Math.round(currentVehicle.range * 0.825)}km
            </Text>
          </Space>
        </Space>

        <Text type="secondary" style={{ fontSize: '13px' }}>
          已驻车 11月26日 请下拉连接车辆
        </Text>

        {/* 车辆3D图片 */}
        <div style={{
          textAlign: 'center',
          padding: '40px 20px',
          background: 'linear-gradient(180deg, #f0f0f0 0%, #ffffff 100%)',
          borderRadius: '12px',
          marginTop: '16px'
        }}>
          <img
            src="/images/vehicle/vehicle-3d.png"
            alt="车辆3D图"
            style={{
              maxWidth: '100%',
              height: 'auto',
              maxHeight: '200px',
              objectFit: 'contain'
            }}
          />
        </div>
      </div>

      {/* 控制按钮区 */}
      <div style={{ background: '#fff', marginTop: '12px', padding: '24px 16px' }}>
        <Row gutter={[32, 32]}>
          <Col span={8}>
            <div
              onClick={() => controlLock(currentVehicle.id, currentVehicle.is_locked ? 'unlock' : 'lock')}
              style={{
                textAlign: 'center',
                cursor: 'pointer',
                opacity: controlLoading.lock ? 0.5 : 1
              }}
            >
              <div style={{
                width: '60px',
                height: '60px',
                margin: '0 auto',
                borderRadius: '50%',
                background: '#f5f5f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '8px'
              }}>
                <LockOutlined style={{ fontSize: '28px', color: '#666' }} />
              </div>
              <Text style={{ fontSize: '14px' }}>车锁</Text>
            </div>
          </Col>
          <Col span={8}>
            <div
              onClick={() => controlWindow(currentVehicle.id, currentVehicle.window_status === 'closed' ? 'open' : 'close')}
              style={{
                textAlign: 'center',
                cursor: 'pointer',
                opacity: controlLoading.window ? 0.5 : 1
              }}
            >
              <div style={{
                width: '60px',
                height: '60px',
                margin: '0 auto',
                borderRadius: '50%',
                background: '#f5f5f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '8px'
              }}>
                <WindowsOutlined style={{ fontSize: '28px', color: '#666' }} />
              </div>
              <Text style={{ fontSize: '14px' }}>车窗</Text>
            </div>
          </Col>
          <Col span={8}>
            <div
              onClick={() => controlTrunk(currentVehicle.id, currentVehicle.trunk_open ? 'close' : 'open')}
              style={{
                textAlign: 'center',
                cursor: 'pointer',
                opacity: controlLoading.trunk ? 0.5 : 1
              }}
            >
              <div style={{
                width: '60px',
                height: '60px',
                margin: '0 auto',
                borderRadius: '50%',
                background: '#f5f5f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '8px'
              }}>
                <CarOutlined style={{ fontSize: '28px', color: '#666' }} />
              </div>
              <Text style={{ fontSize: '14px' }}>尾门</Text>
            </div>
          </Col>
          <Col span={8}>
            <div style={{ textAlign: 'center', cursor: 'pointer' }}>
              <div style={{
                width: '60px',
                height: '60px',
                margin: '0 auto',
                borderRadius: '50%',
                background: '#f5f5f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '8px'
              }}>
                <UserOutlined style={{ fontSize: '28px', color: '#666' }} />
              </div>
              <Text style={{ fontSize: '14px' }}>授权驾驶</Text>
            </div>
          </Col>
          <Col span={8}>
            <div style={{ textAlign: 'center', cursor: 'pointer' }}>
              <div style={{
                width: '60px',
                height: '60px',
                margin: '0 auto',
                borderRadius: '50%',
                background: '#f5f5f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '8px'
              }}>
                <EnvironmentOutlined style={{ fontSize: '28px', color: '#666' }} />
              </div>
              <Text style={{ fontSize: '14px' }}>直线召唤</Text>
            </div>
          </Col>
          <Col span={8}>
            <div
              onClick={() => findVehicle(currentVehicle.id)}
              style={{
                textAlign: 'center',
                cursor: 'pointer',
                opacity: controlLoading.find ? 0.5 : 1
              }}
            >
              <div style={{
                width: '60px',
                height: '60px',
                margin: '0 auto',
                borderRadius: '50%',
                background: '#f5f5f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '8px'
              }}>
                <SearchOutlined style={{ fontSize: '28px', color: '#666' }} />
              </div>
              <Text style={{ fontSize: '14px' }}>寻车</Text>
            </div>
          </Col>
        </Row>
      </div>

      {/* 空调和蓝牙控制区 */}
      <div style={{ background: '#fff', marginTop: '12px', padding: '20px 16px' }}>
        <Row gutter={16}>
          <Col span={12}>
            <Card
              bodyStyle={{ padding: '16px', textAlign: 'center' }}
              style={{ borderRadius: '12px' }}
            >
              <Text style={{ fontSize: '32px', fontWeight: 'bold', display: 'block' }}>
                {currentVehicle.temperature}°C
              </Text>
              <Text type="secondary" style={{ fontSize: '12px' }}>
                目标25.0°C
              </Text>
              <div style={{ fontSize: '24px', marginTop: '8px' }}>🌀</div>
            </Card>
          </Col>
          <Col span={12}>
            <Card
              bodyStyle={{ padding: '16px' }}
              style={{ borderRadius: '12px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <ApiOutlined style={{ fontSize: '24px', color: '#1890ff', marginRight: '8px' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <KeyOutlined style={{ fontSize: '20px', color: '#999', marginRight: '8px' }} />
                  <Text style={{ fontSize: '14px' }}>钥匙管理</Text>
                </div>
              </div>
              <Text type="secondary" style={{ fontSize: '12px', display: 'block', marginTop: '8px' }}>
                未连接
              </Text>
            </Card>
          </Col>
        </Row>
      </div>

      {/* 车辆健康和设置 */}
      <div style={{ padding: '16px', marginTop: '12px' }}>
        <Row gutter={12}>
          <Col span={12}>
            <Button
              size="large"
              block
              style={{
                height: '60px',
                borderRadius: '12px',
                border: '1px solid #e8e8e8',
                background: '#fff'
              }}
            >
              <Space>
                <HeartOutlined style={{ fontSize: '20px' }} />
                <Text style={{ fontSize: '16px' }}>车辆健康</Text>
              </Space>
            </Button>
          </Col>
          <Col span={12}>
            <Button
              size="large"
              block
              style={{
                height: '60px',
                borderRadius: '12px',
                border: '1px solid #e8e8e8',
                background: '#fff'
              }}
            >
              <Space>
                <SettingOutlined style={{ fontSize: '20px' }} />
                <Text style={{ fontSize: '16px' }}>车辆设置</Text>
              </Space>
            </Button>
          </Col>
        </Row>
      </div>

      {/* 帮助区 */}
      <div style={{ textAlign: 'center', padding: '24px 16px' }}>
        <Text strong style={{ fontSize: '18px' }}>
          帮助
        </Text>
      </div>
    </div>
  )
}

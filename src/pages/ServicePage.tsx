import { useState, useEffect } from 'react'
import { Card, Typography, Space, message, Row, Col, Button } from 'antd'
import {
  QrcodeOutlined,
  FileTextOutlined,
  StarOutlined,
  ReadOutlined,
  CustomerServiceOutlined,
  ShopOutlined,
  CarOutlined,
  RightOutlined,
} from '@ant-design/icons'
import { API_ENDPOINTS } from '../config/api'

const { Title, Text } = Typography

interface ChargingStation {
  id: string
  name: string
  address: string
  lat: number
  lon: number
  available_ports: number
  total_ports: number
  price: number
  distance: number
  type: string
}

export function ServicePage() {
  const [stations, setStations] = useState<ChargingStation[]>([])

  useEffect(() => {
    loadStations()
  }, [])

  const loadStations = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.CHARGING_STATIONS)
      const data = await response.json()
      setStations(data.stations)
    } catch (error) {
      message.error('加载充电站失败')
    }
  }

  const handleChargingAction = (action: string) => {
    message.info(`功能开发中: ${action}`)
  }

  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh', paddingBottom: '60px' }}>
      {/* 标题 */}
      <div style={{ background: '#fff', padding: '16px 16px 0' }}>
        <Title level={3} style={{ margin: 0, marginBottom: '16px' }}>
          服务
        </Title>
      </div>

      {/* 充电区域 */}
      <div style={{ background: '#fff', padding: '16px', marginBottom: '12px' }}>
        <Title level={4} style={{ margin: 0, marginBottom: '16px' }}>
          充电
        </Title>

        {/* 充电地图卡片 */}
        <Card
          bodyStyle={{ padding: '16px' }}
          style={{
            borderRadius: '12px',
            marginBottom: '16px',
            background: 'linear-gradient(135deg, #e3f2fd 0%, #e8f5e9 100%)',
            border: 'none'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <Text type="secondary" style={{ fontSize: '13px', display: 'block', marginBottom: '8px' }}>
                充电地图
              </Text>
              <Text strong style={{ fontSize: '18px', display: 'block', marginBottom: '12px' }}>
                10km内有{stations.length || 153}个充电站
              </Text>
              <Button
                style={{
                  borderRadius: '20px',
                  paddingLeft: '24px',
                  paddingRight: '24px'
                }}
              >
                查看附近
              </Button>
            </div>
            <div style={{
              width: 'clamp(100px, 25vw, 150px)',
              height: 'clamp(100px, 25vw, 150px)',
              background: 'rgba(255,255,255,0.5)',
              borderRadius: '8px',
              overflow: 'hidden',
              flexShrink: 0
            }}>
              <img
                src="/images/service/charging-map.png"
                alt="充电地图"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
          </div>
        </Card>

        {/* 充电功能按钮 */}
        <Row gutter={16}>
          <Col span={6}>
            <div
              onClick={() => handleChargingAction('扫码充电')}
              style={{ textAlign: 'center', cursor: 'pointer' }}
            >
              <div style={{
                width: '50px',
                height: '50px',
                margin: '0 auto',
                borderRadius: '12px',
                background: '#f5f5f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '8px'
              }}>
                <QrcodeOutlined style={{ fontSize: '24px' }} />
              </div>
              <Text style={{ fontSize: '12px' }}>扫码充电</Text>
            </div>
          </Col>
          <Col span={6}>
            <div
              onClick={() => handleChargingAction('充电订单')}
              style={{ textAlign: 'center', cursor: 'pointer' }}
            >
              <div style={{
                width: '50px',
                height: '50px',
                margin: '0 auto',
                borderRadius: '12px',
                background: '#f5f5f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '8px'
              }}>
                <FileTextOutlined style={{ fontSize: '24px' }} />
              </div>
              <Text style={{ fontSize: '12px' }}>充电订单</Text>
            </div>
          </Col>
          <Col span={6}>
            <div
              onClick={() => handleChargingAction('收藏站点')}
              style={{ textAlign: 'center', cursor: 'pointer' }}
            >
              <div style={{
                width: '50px',
                height: '50px',
                margin: '0 auto',
                borderRadius: '12px',
                background: '#f5f5f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '8px'
              }}>
                <StarOutlined style={{ fontSize: '24px' }} />
              </div>
              <Text style={{ fontSize: '12px' }}>收藏站点</Text>
            </div>
          </Col>
          <Col span={6}>
            <div
              onClick={() => handleChargingAction('充电资讯')}
              style={{ textAlign: 'center', cursor: 'pointer' }}
            >
              <div style={{
                width: '50px',
                height: '50px',
                margin: '0 auto',
                borderRadius: '12px',
                background: '#f5f5f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '8px'
              }}>
                <ReadOutlined style={{ fontSize: '24px' }} />
              </div>
              <Text style={{ fontSize: '12px' }}>充电资讯</Text>
            </div>
          </Col>
        </Row>
      </div>

      {/* 服务区域 */}
      <div style={{ background: '#fff', padding: '16px', marginBottom: '12px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px'
        }}>
          <Title level={4} style={{ margin: 0 }}>
            服务
          </Title>
          <Space
            style={{ cursor: 'pointer' }}
            onClick={() => message.info('查看所有订单')}
          >
            <Text type="secondary" style={{ fontSize: '13px' }}>
              查看所有订单
            </Text>
            <RightOutlined style={{ fontSize: '12px', color: '#999' }} />
          </Space>
        </div>

        <Row gutter={16}>
          <Col span={8}>
            <Card
              bodyStyle={{ padding: '16px', textAlign: 'center' }}
              style={{ borderRadius: '12px', cursor: 'pointer' }}
              onClick={() => message.info('服务专家')}
            >
              <div style={{
                width: '48px',
                height: '48px',
                margin: '0 auto',
                borderRadius: '50%',
                background: '#f5f5f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '8px'
              }}>
                <CustomerServiceOutlined style={{ fontSize: '24px' }} />
              </div>
              <Text style={{ fontSize: '13px' }}>服务专家</Text>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              bodyStyle={{ padding: '16px', textAlign: 'center' }}
              style={{ borderRadius: '12px', cursor: 'pointer' }}
              onClick={() => message.info('服务网点')}
            >
              <div style={{
                width: '48px',
                height: '48px',
                margin: '0 auto',
                borderRadius: '50%',
                background: '#f5f5f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '8px'
              }}>
                <ShopOutlined style={{ fontSize: '24px' }} />
              </div>
              <Text style={{ fontSize: '13px' }}>服务网点</Text>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              bodyStyle={{ padding: '16px', textAlign: 'center' }}
              style={{ borderRadius: '12px', cursor: 'pointer' }}
              onClick={() => message.info('道路救援')}
            >
              <div style={{
                width: '48px',
                height: '48px',
                margin: '0 auto',
                borderRadius: '50%',
                background: '#f5f5f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '8px'
              }}>
                <CarOutlined style={{ fontSize: '24px' }} />
              </div>
              <Text style={{ fontSize: '13px' }}>道路救援</Text>
            </Card>
          </Col>
        </Row>
      </div>

      {/* 权益区域 */}
      <div style={{ background: '#fff', padding: '16px' }}>
        <Title level={4} style={{ margin: 0, marginBottom: '16px' }}>
          权益
        </Title>

        <Card
          bodyStyle={{ padding: '16px' }}
          style={{
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)',
            border: 'none'
          }}
        >
          <Space direction="vertical" style={{ width: '100%' }}>
            <Text strong style={{ fontSize: '16px' }}>
              会员专享权益
            </Text>
            <Text type="secondary" style={{ fontSize: '13px' }}>
              开通会员享受更多服务特权
            </Text>
            <Button
              type="primary"
              style={{
                borderRadius: '20px',
                marginTop: '8px'
              }}
              onClick={() => message.info('查看会员权益')}
            >
              了解详情
            </Button>
          </Space>
        </Card>
      </div>
    </div>
  )
}

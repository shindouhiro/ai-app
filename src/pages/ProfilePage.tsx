import { Card, Avatar, Typography, Space, Badge, Row, Col, Button, Modal } from 'antd'
import {
  QrcodeOutlined,
  AppstoreOutlined,
  SettingOutlined,
  BellOutlined,
  RightOutlined,
  TrophyOutlined,
  ShoppingOutlined,
  CarOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const { Text, Title } = Typography

export function ProfilePage() {
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    Modal.confirm({
      title: '退出登录',
      content: '确定要退出登录吗?',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        logout()
      }
    })
  }

  // 如果未登录，显示登录提示
  if (!isAuthenticated) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
        padding: '20px'
      }}>
        <Avatar size={80} style={{ marginBottom: '16px', background: '#d9d9d9' }}>
          <CarOutlined style={{ fontSize: '40px' }} />
        </Avatar>
        <Text type="secondary" style={{ fontSize: '16px', marginBottom: '24px' }}>
          请先登录查看个人信息
        </Text>
        <Button type="primary" size="large" onClick={() => navigate('/login')}>
          立即登录
        </Button>
      </div>
    )
  }

  const notifications = [
    { id: 1, title: '深圳市超级充电站上新通知', date: '11月24日' },
    { id: 2, title: '车主福利 | 社区疯狂星期五火热...', date: '11月21日' },
  ]

  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh', paddingBottom: '60px' }}>
      {/* 顶部操作栏 */}
      <div style={{
        background: 'linear-gradient(135deg, #e8f5e9 0%, #fff3e0 100%)',
        padding: '16px',
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '16px'
      }}>
        <QrcodeOutlined style={{ fontSize: '24px', color: '#333' }} />
        <AppstoreOutlined style={{ fontSize: '24px', color: '#333' }} />
        <SettingOutlined style={{ fontSize: '24px', color: '#333' }} />
      </div>

      {/* 用户信息卡片 */}
      <div style={{
        background: 'linear-gradient(135deg, #e8f5e9 0%, #fff3e0 100%)',
        padding: '0 16px 32px'
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
          <Avatar
            size={80}
            style={{
              background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
              border: '3px solid #fff',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}
          >
            <div style={{
              width: '100%',
              height: '100%',
              background: 'repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(0,0,0,0.1) 4px, rgba(0,0,0,0.1) 8px)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{
                width: '30px',
                height: '30px',
                background: 'rgba(0,0,0,0.3)',
                borderRadius: '50%'
              }} />
            </div>
          </Avatar>
          <div style={{ flex: 1 }}>
            <Title level={4} style={{ margin: 0, marginBottom: '4px' }}>
              {user?.nickname || '理想用户'}
            </Title>
            <Text type="secondary" style={{ fontSize: '13px' }}>
              添加个人描述,让别人更懂你~
            </Text>
          </div>
        </div>

        {/* 统计数据 */}
        <Row style={{ marginTop: '24px' }} gutter={16}>
          <Col span={6}>
            <div style={{ textAlign: 'center' }}>
              <Text strong style={{ fontSize: '20px', display: 'block' }}>
                0
              </Text>
              <Text type="secondary" style={{ fontSize: '12px' }}>
                关注
              </Text>
            </div>
          </Col>
          <Col span={6}>
            <div style={{ textAlign: 'center' }}>
              <Text strong style={{ fontSize: '20px', display: 'block' }}>
                0
              </Text>
              <Text type="secondary" style={{ fontSize: '12px' }}>
                粉丝
              </Text>
            </div>
          </Col>
          <Col span={6}>
            <div style={{ textAlign: 'center' }}>
              <Text strong style={{ fontSize: '20px', display: 'block' }}>
                0
              </Text>
              <Text type="secondary" style={{ fontSize: '12px' }}>
                发布
              </Text>
            </div>
          </Col>
          <Col span={6}>
            <div style={{ textAlign: 'center' }}>
              <Text strong style={{ fontSize: '20px', display: 'block' }}>
                0
              </Text>
              <Text type="secondary" style={{ fontSize: '12px' }}>
                收藏
              </Text>
            </div>
          </Col>
        </Row>
      </div>

      {/* 最新消息 */}
      <Card
        style={{ margin: '12px 16px', borderRadius: '12px' }}
        bodyStyle={{ padding: '12px 16px' }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '12px'
        }}>
          <Text strong>最新消息</Text>
          <Space>
            <Badge count={76} style={{ backgroundColor: '#ff4d4f' }} />
            <RightOutlined style={{ fontSize: '12px', color: '#999' }} />
          </Space>
        </div>

        {notifications.map(notification => (
          <div
            key={notification.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px 0',
              borderTop: '1px solid #f0f0f0'
            }}
          >
            <BellOutlined style={{ fontSize: '16px', color: '#999', marginRight: '12px' }} />
            <div style={{ flex: 1 }}>
              <Text style={{ fontSize: '14px' }}>{notification.title}</Text>
            </div>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              {notification.date}
            </Text>
          </div>
        ))}
      </Card>

      {/* AI眼镜发布会 Banner */}
      <Card
        style={{ margin: '12px 16px', borderRadius: '12px', overflow: 'hidden' }}
        bodyStyle={{ padding: 0 }}
      >
        <div style={{
          background: 'linear-gradient(135deg, #e0e0e0 0%, #bdbdbd 100%)',
          padding: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <Text strong style={{ fontSize: '18px', display: 'block', marginBottom: '8px' }}>
              理想AI眼镜 Livis 发布会
            </Text>
            <Text type="secondary" style={{ fontSize: '13px', display: 'block', marginBottom: '12px' }}>
              12月3日 19:30 揭晓答案
            </Text>
            <Button
              style={{
                borderRadius: '20px',
                paddingLeft: '24px',
                paddingRight: '24px'
              }}
            >
              预约直播
            </Button>
          </div>
          <div style={{
            width: 'clamp(100px, 25vw, 150px)',
            height: 'clamp(65px, 16vw, 100px)',
            background: 'rgba(255,255,255,0.3)',
            borderRadius: '8px',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <img
              src="/images/profile/ai-glasses.png"
              alt="AI眼镜"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>
        </div>
      </Card>

      {/* 功能菜单 */}
      <Card
        style={{ margin: '12px 16px', borderRadius: '12px' }}
        bodyStyle={{ padding: '16px' }}
      >
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px',
              background: '#fafafa',
              borderRadius: '8px',
              cursor: 'pointer'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <TrophyOutlined style={{ fontSize: '20px' }} />
                <div>
                  <Text style={{ fontSize: '14px', display: 'block' }}>我的积分</Text>
                  <Text strong style={{ fontSize: '18px' }}>0</Text>
                </div>
              </div>
              <RightOutlined style={{ fontSize: '12px', color: '#999' }} />
            </div>
          </Col>
          <Col span={12}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px',
              background: '#fafafa',
              borderRadius: '8px',
              cursor: 'pointer',
              position: 'relative'
            }}>
              <Badge dot style={{ position: 'absolute', top: '8px', right: '8px' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <AppstoreOutlined style={{ fontSize: '20px' }} />
                <Text style={{ fontSize: '14px' }}>徽章墙</Text>
              </div>
              <RightOutlined style={{ fontSize: '12px', color: '#999' }} />
            </div>
          </Col>
          <Col span={12}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px',
              background: '#fafafa',
              borderRadius: '8px',
              cursor: 'pointer'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <ShoppingOutlined style={{ fontSize: '20px' }} />
                <Text style={{ fontSize: '14px' }}>我的订单</Text>
              </div>
              <RightOutlined style={{ fontSize: '12px', color: '#999' }} />
            </div>
          </Col>
          <Col span={12}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px',
              background: '#fafafa',
              borderRadius: '8px',
              cursor: 'pointer'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <CarOutlined style={{ fontSize: '20px' }} />
                <Text style={{ fontSize: '14px' }}>购车信息</Text>
              </div>
              <RightOutlined style={{ fontSize: '12px', color: '#999' }} />
            </div>
          </Col>
        </Row>
      </Card>

      {/* 更多功能菜单 */}
      <Card
        style={{ margin: '12px 16px', borderRadius: '12px' }}
        bodyStyle={{ padding: '12px 16px' }}
      >
        <Row gutter={[24, 16]}>
          <Col span={6}>
            <div style={{ textAlign: 'center', cursor: 'pointer' }}>
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
                <Text style={{ fontSize: '24px' }}>💳</Text>
              </div>
              <Text style={{ fontSize: '12px' }}>卡包</Text>
            </div>
          </Col>
          <Col span={6}>
            <div style={{ textAlign: 'center', cursor: 'pointer' }}>
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
                <Text style={{ fontSize: '24px' }}>⭐</Text>
              </div>
              <Text style={{ fontSize: '12px' }}>我的收藏</Text>
            </div>
          </Col>
          <Col span={6}>
            <div style={{ textAlign: 'center', cursor: 'pointer' }}>
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
                <Text style={{ fontSize: '24px' }}>⏱️</Text>
              </div>
              <Text style={{ fontSize: '12px' }}>历史</Text>
            </div>
          </Col>
          <Col span={6}>
            <div style={{ textAlign: 'center', cursor: 'pointer' }}>
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
                <Text style={{ fontSize: '24px' }}>🚩</Text>
              </div>
              <Text style={{ fontSize: '12px' }}>问题反馈</Text>
            </div>
          </Col>
        </Row>
      </Card>

      {/* 退出登录按钮 */}
      <div style={{ margin: '12px 16px', marginBottom: '80px' }}>
        <Button
          danger
          block
          size="large"
          icon={<LogoutOutlined />}
          onClick={handleLogout}
          style={{
            borderRadius: '12px',
            height: '48px',
            fontSize: '16px'
          }}
        >
          退出登录
        </Button>
      </div>
    </div>
  )
}

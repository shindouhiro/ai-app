import { useState, useEffect } from 'react'
import { Card, Space, Typography, Button, Image, message, Spin, Badge, Tag } from 'antd'
import { SearchOutlined, PlusOutlined, CarOutlined, PlayCircleOutlined, RightOutlined } from '@ant-design/icons'
import { API_ENDPOINTS } from '../config/api'

const { Text, Title } = Typography

interface Content {
  id: string
  user_id: string
  title: string
  content: string
  images?: string[]
  likes: number
  comments_count: number
  type: string
  created_at?: string
}

export function HomePage() {
  const [activeTab, setActiveTab] = useState('community')
  const [subTab, setSubTab] = useState('推荐')
  const [carModel, setCarModel] = useState('L6')
  const [contents, setContents] = useState<Content[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (activeTab === 'community' || activeTab === 'official') {
      loadContents()
    }
  }, [activeTab])

  const loadContents = async () => {
    setLoading(true)
    try {
      const response = await fetch(API_ENDPOINTS.COMMUNITY_CONTENTS)
      const data = await response.json()
      setContents(data.contents)
    } catch (error) {
      message.error('加载内容失败')
    } finally {
      setLoading(false)
    }
  }

  // 顶部Tab导航
  const renderTopTabs = () => (
    <div style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: '#fff',
      borderBottom: '1px solid #f0f0f0'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '12px 16px',
        justifyContent: 'space-between'
      }}>
        <Space size={32}>
          <div
            onClick={() => setActiveTab('community')}
            style={{
              fontSize: '16px',
              fontWeight: activeTab === 'community' ? 600 : 400,
              color: activeTab === 'community' ? '#000' : '#666',
              cursor: 'pointer',
              borderBottom: activeTab === 'community' ? '2px solid #000' : 'none',
              paddingBottom: '4px'
            }}
          >
            社区
          </div>
          <div
            onClick={() => setActiveTab('official')}
            style={{
              fontSize: '16px',
              fontWeight: activeTab === 'official' ? 600 : 400,
              color: activeTab === 'official' ? '#000' : '#666',
              cursor: 'pointer',
              borderBottom: activeTab === 'official' ? '2px solid #000' : 'none',
              paddingBottom: '4px'
            }}
          >
            官方
          </div>
          <div
            onClick={() => setActiveTab('purchase')}
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '16px',
              fontWeight: activeTab === 'purchase' ? 600 : 400,
              color: activeTab === 'purchase' ? '#000' : '#666',
              cursor: 'pointer',
              borderBottom: activeTab === 'purchase' ? '2px solid #000' : 'none',
              paddingBottom: '4px'
            }}
          >
            <CarOutlined style={{ marginRight: '4px' }} />
            购车
          </div>
          <div
            onClick={() => setActiveTab('usage')}
            style={{
              fontSize: '16px',
              fontWeight: activeTab === 'usage' ? 600 : 400,
              color: activeTab === 'usage' ? '#000' : '#666',
              cursor: 'pointer',
              borderBottom: activeTab === 'usage' ? '2px solid #000' : 'none',
              paddingBottom: '4px'
            }}
          >
            用车
          </div>
        </Space>
        <Space size={16}>
          <SearchOutlined style={{ fontSize: '20px', cursor: 'pointer' }} />
          <PlusOutlined style={{ fontSize: '20px', cursor: 'pointer', background: '#000', color: '#fff', borderRadius: '50%', padding: '4px' }} />
        </Space>
      </div>

      {/* 二级Tab - 仅社区页面显示 */}
      {activeTab === 'community' && (
        <div style={{
          display: 'flex',
          overflowX: 'auto',
          padding: '8px 16px',
          gap: '24px',
          borderBottom: '1px solid #f0f0f0'
        }}>
          {['关注', '推荐', 'i6', 'i8', 'MEGA', 'L6', 'L7'].map(tab => (
            <div
              key={tab}
              onClick={() => setSubTab(tab)}
              style={{
                fontSize: '15px',
                fontWeight: subTab === tab ? 500 : 400,
                color: subTab === tab ? '#000' : '#666',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {tab}
            </div>
          ))}
        </div>
      )}
    </div>
  )

  // 社区Tab内容
  const renderCommunityTab = () => (
    <div style={{ padding: '12px' }}>
      {/* 大卡片 + 右侧小卡片布局 */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
        {/* 左侧大卡片 */}
        <Card
          cover={
            <img
              src="/images/community-banner.png"
              alt="发布会"
              style={{ height: '250px', objectFit: 'cover' }}
            />
          }
          style={{ flex: 2 }}
          bodyStyle={{ padding: '12px' }}
        >
          <Title level={5} style={{ margin: 0, marginBottom: '8px' }}>
            理想AI眼镜 Livis 发布会
          </Title>
          <Text type="secondary" style={{ fontSize: '13px', display: 'block', marginBottom: '8px' }}>
            "戴上"理想同学，怎么玩？
          </Text>
          <Text type="secondary" style={{ fontSize: '12px', display: 'block', marginBottom: '12px' }}>
            12月3日 19:30 揭晓答案
          </Text>
          <Button type="primary" size="small" style={{ background: '#000', borderColor: '#000' }}>
            去预约
          </Button>
        </Card>

        {/* 右侧小卡片列 */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Card
            style={{ background: 'linear-gradient(135deg, #6dd5ed 0%, #2193b0 100%)' }}
            bodyStyle={{ padding: '12px' }}
          >
            <Tag color="green" style={{ marginBottom: '4px' }}>车主专享</Tag>
            <Text strong style={{ color: '#fff', display: 'block', fontSize: '14px' }}>
              福利活动
            </Text>
          </Card>

          <Card
            cover={
              <img
                src="/images/usage-guide.png"
                alt="用车攻略"
                style={{ height: '80px', objectFit: 'cover' }}
              />
            }
            bodyStyle={{ padding: '8px' }}
          >
            <Tag color="green" style={{ fontSize: '10px' }}>用车攻略</Tag>
            <Text strong style={{ fontSize: '12px', display: 'block' }}>
              热门内容抢先看
            </Text>
          </Card>

          <Card
            cover={
              <div style={{ position: 'relative' }}>
                <img
src="/images/family-car.png"
                  alt="视频"
                  style={{ height: '80px', objectFit: 'cover' }}
                />
                <PlayCircleOutlined
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: '32px',
                    color: '#fff'
                  }}
                />
              </div>
            }
            bodyStyle={{ padding: '0' }}
          />
        </div>
      </div>

      {/* 九号出行广告卡片 */}
      <Card style={{ marginBottom: '12px' }}>
        <div style={{ textAlign: 'center' }}>
          <Space>
            <div style={{ fontSize: '12px' }}>🤖 ninebot九号</div>
            <div style={{ fontSize: '12px' }}>🚗 理想</div>
          </Space>
          <Title level={4} style={{ color: '#ff4d4f', margin: '8px 0' }}>
            九号出行
          </Title>
          <Text style={{ fontSize: '16px', fontWeight: 600 }}>
            正式入驻理想社区
          </Text>
          <div style={{ fontSize: '12px', color: '#666', margin: '8px 0' }}>
            — 路好走行不停一格 —
          </div>
          <img
            src="/images/scooter.png"
            alt="九号出行"
            style={{ width: '100%', marginTop: '12px' }}
          />
        </div>
      </Card>

      {/* 社区内容列表 */}
      {contents.slice(0, 2).map(item => (
        <Card key={item.id} style={{ marginBottom: '12px' }}>
          <Space direction="vertical" style={{ width: '100%' }} size="small">
            <Space>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: '#1890ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '12px'
                }}
              >
                Yan
              </div>
              <div>
                <Text strong style={{ fontSize: '14px' }}>Yan_Yan</Text>
                <Badge count="L8" style={{ marginLeft: '8px', fontSize: '10px' }} />
              </div>
            </Space>
            <Text style={{ fontSize: '14px' }}>{item.content}</Text>
            {item.images && item.images.length > 0 && (
              <Image
                src={item.images[0]}
                style={{ width: '100%', borderRadius: '8px' }}
                preview={false}
              />
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
              <Text type="secondary" style={{ fontSize: '12px' }}>
                ❤️ {item.likes}
              </Text>
            </div>
          </Space>
        </Card>
      ))}
    </div>
  )

  // 官方Tab内容
  const renderOfficialTab = () => (
    <div style={{ padding: 0 }}>
      {/* 顶部大Banner */}
      <Card
        cover={
          <div style={{ position: 'relative' }}>
            <img
              src="/images/community-banner.png"
              alt="发布会"
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                color: '#fff'
              }}
            >
              <Title level={4} style={{ color: '#fff', margin: 0 }}>
                理想AI眼镜 Livis 发布会
              </Title>
              <Text style={{ color: '#fff', fontSize: '13px' }}>
                "戴上"理想同学，怎么玩？
              </Text>
              <div style={{ fontSize: '12px', marginTop: '4px' }}>
                12月3日 19:30 揭晓答案
              </div>
            </div>
            <Button
              type="primary"
              style={{
                position: 'absolute',
                bottom: '16px',
                right: '16px',
                background: '#fff',
                color: '#000',
                border: 'none'
              }}
            >
              预约直播
            </Button>
          </div>
        }
        bodyStyle={{ padding: 0 }}
      />

      {/* 功能卡片 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '8px',
        padding: '12px'
      }}>
        {[
          { label: '购车', color: '#f0f0f0' },
          { label: '试驾', color: '#4a90e2' },
          { label: '充电', color: '#666' },
          { label: '配置', color: '#999' }
        ].map(item => (
          <Card
            key={item.label}
            style={{ background: item.color, textAlign: 'center' }}
            bodyStyle={{ padding: '24px 12px' }}
          >
            <div style={{ height: '60px', marginBottom: '8px' }}>
              <img
                src="/images/dashboard.png"
                alt={item.label}
                style={{ height: '100%', objectFit: 'cover', width: '60px' }}
              />
            </div>
            <Text strong style={{ color: item.label === '试驾' ? '#fff' : '#000' }}>
              {item.label}
            </Text>
          </Card>
        ))}
      </div>

      {/* 官方资讯 */}
      <div style={{ padding: '0 12px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: '16px 0'
        }}>
          <Title level={5} style={{ margin: 0 }}>官方资讯</Title>
          <Button type="text" icon={<RightOutlined />}>查看更多</Button>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
          {[1, 2].map(i => (
            <Card
              key={i}
              cover={
                <img
                  src="/images/snow-racing.png"
                  alt="资讯"
                  style={{ height: '120px', objectFit: 'cover' }}
                />
              }
              style={{ flex: 1 }}
              bodyStyle={{ padding: '12px' }}
            >
              <Text type="secondary" style={{ fontSize: '12px', display: 'block', marginBottom: '4px' }}>
                2025.11.27
              </Text>
              <Text strong style={{ fontSize: '14px' }}>
                {i === 1
                  ? '理想AI眼镜Livis即将发布，可以"戴"着走的理想同...'
                  : '四场国际雪联世界杯官方指定用车！这个冬天，理想...'}
              </Text>
            </Card>
          ))}
        </div>

        {/* 车主故事 */}
        <Title level={5} style={{ margin: '16px 0' }}>车主故事</Title>
      </div>
    </div>
  )

  // 购车Tab内容
  const renderPurchaseTab = () => (
    <div style={{ padding: '16px' }}>
      {/* 选择车型标题 */}
      <Title level={4} style={{ marginBottom: '16px' }}>选择车型</Title>

      {/* 车型选择按钮 */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '20px',
        overflowX: 'auto'
      }}>
        {['i8', 'MEGA', 'L6', 'L7', 'L8'].map(model => (
          <Button
            key={model}
            type={carModel === model ? 'primary' : 'default'}
            onClick={() => setCarModel(model)}
            style={{
              borderRadius: '20px',
              padding: '8px 24px',
              height: 'auto',
              background: carModel === model ? '#000' : '#f0f0f0',
              borderColor: carModel === model ? '#000' : '#f0f0f0',
              color: carModel === model ? '#fff' : '#666'
            }}
          >
            {model}
          </Button>
        ))}
      </div>

      {/* 车型展示卡片 */}
      <Card
        style={{
          borderRadius: '16px',
          overflow: 'hidden',
          background: 'linear-gradient(180deg, #f5f5f5 0%, #e0e0e0 100%)'
        }}
        bodyStyle={{ padding: '32px 24px' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <Title level={2} style={{ margin: 0, fontSize: '48px', fontWeight: 600 }}>
            理想{carModel}
          </Title>
          <Text style={{ fontSize: '16px', color: '#666' }}>
            家庭五座豪华SUV
          </Text>
        </div>

        <Button
          type="default"
          style={{
            margin: '0 auto 24px',
            display: 'block',
            borderRadius: '20px',
            padding: '8px 32px',
            height: 'auto'
          }}
        >
          了解详情 <RightOutlined />
        </Button>

        {/* 车辆图片 */}
        <img
          src="/images/purchase-car.png"
          alt={`理想${carModel}`}
          style={{
            width: '100%',
            height: 'auto',
            marginBottom: '24px'
          }}
        />

        {/* 价格 */}
        <Text
          style={{
            fontSize: '20px',
            fontWeight: 500,
            display: 'block',
            textAlign: 'center',
            marginBottom: '16px'
          }}
        >
          售价 <span style={{ fontSize: '32px', fontWeight: 600 }}>24.98</span> 万元起
        </Text>

        {/* 按钮组 */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button
            size="large"
            style={{
              flex: 1,
              borderRadius: '24px',
              height: '48px',
              fontSize: '16px',
              borderColor: '#000',
              color: '#000'
            }}
          >
            预约试驾
          </Button>
          <Button
            type="primary"
            size="large"
            style={{
              flex: 1,
              borderRadius: '24px',
              height: '48px',
              fontSize: '16px',
              background: '#000',
              borderColor: '#000'
            }}
          >
            立即定购
          </Button>
        </div>
      </Card>

      {/* 活动信息 */}
      <Text style={{ display: 'block', textAlign: 'center', margin: '16px 0', fontSize: '13px', color: '#666' }}>
        11月30日24:00前定购可享限时权益，最高价值
      </Text>
    </div>
  )

  // 用车Tab内容
  const renderUsageTab = () => (
    <div style={{ padding: '12px' }}>
      {/* 顶部横向滚动卡片 */}
      <div style={{
        display: 'flex',
        gap: '12px',
        overflowX: 'auto',
        marginBottom: '16px',
        paddingBottom: '8px'
      }}>
        <Card
          style={{
            minWidth: '260px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: '#fff'
          }}
          bodyStyle={{ padding: '16px' }}
        >
          <Tag color="gold" style={{ marginBottom: '8px' }}>有奖话题</Tag>
          <Title level={4} style={{ color: '#fff', margin: '8px 0' }}>
            #节能驾驶挑战
          </Title>
          <Text style={{ color: '#fff', fontSize: '12px' }}>
            活动时间：2025年11月21日-2025年11月27日
          </Text>
        </Card>

        <Card
          style={{
            minWidth: '260px',
            background: '#f5f5f5'
          }}
          bodyStyle={{ padding: '16px', textAlign: 'center' }}
        >
          <Title level={5} style={{ margin: '8px 0' }}>
            「答车主问」
          </Title>
          <Text style={{ fontSize: '14px', color: '#666' }}>
            全新栏目上线！
          </Text>
        </Card>
      </div>

      {/* 用车攻略 */}
      <Title level={5} style={{ margin: '16px 0' }}>用车攻略</Title>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '8px',
        marginBottom: '16px'
      }}>
        {[
          { label: '新手教程', tag: 'New', image: '/images/coastal-drive.png' },
          { label: '辅助驾驶', image: '/images/dashboard.png' },
          { label: '智能座舱', image: '/images/family-car.png' },
          { label: '用车服务', image: '/images/service-center.png' },
          { label: '用车技巧', image: '/images/mobile-control.png' },
          { label: '车用好物', image: '/images/car-comfort.png' }
        ].map((item, index) => (
          <Card
            key={index}
            cover={
              <img
                src={item.image}
                alt={item.label}
                style={{ height: '100px', objectFit: 'cover' }}
              />
            }
            bodyStyle={{ padding: '8px' }}
          >
            {item.tag && (
              <Tag color="green" style={{ fontSize: '10px', marginBottom: '4px' }}>
                {item.tag}
              </Tag>
            )}
            <Text strong style={{ fontSize: '13px' }}>
              {item.label}
            </Text>
          </Card>
        ))}
      </div>

      {/* 一分钟用车小课堂 */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '16px 0'
      }}>
        <Title level={5} style={{ margin: 0 }}>一分钟用车小课堂</Title>
        <Button type="text" icon={<RightOutlined />}>查看更多</Button>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <Spin size="large" />
      </div>
    )
  }

  return (
    <div style={{ background: '#fff', minHeight: '100vh', paddingBottom: '60px' }}>
      {renderTopTabs()}
      {activeTab === 'community' && renderCommunityTab()}
      {activeTab === 'official' && renderOfficialTab()}
      {activeTab === 'purchase' && renderPurchaseTab()}
      {activeTab === 'usage' && renderUsageTab()}
    </div>
  )
}

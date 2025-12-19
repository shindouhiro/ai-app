import { useState, useEffect } from 'react'
import { Card, Typography, Button, Space, Image, message, Carousel, Select, Badge } from 'antd'
import { ShoppingCartOutlined, SearchOutlined, DownOutlined } from '@ant-design/icons'
import { API_ENDPOINTS } from '../config/api'

const { Text } = Typography

interface Product {
  id: string
  name: string
  category: string
  price: number
  image: string
  description: string
  stock: number
}

// 各个tab的banner数据
const bannerData: Record<string, { title: string; subtitle: string; description: string; price: number; image: string }[]> = {
  home: [
    {
      title: '车内小桌板',
      subtitle: '便携式折叠设计',
      description: '适合车内办公用餐，稳固耐用',
      price: 299,
      image: '/images/mall/sample-home.jpg'
    },
    {
      title: '车载冰箱',
      subtitle: '智能温控',
      description: '大容量设计，随时享受冷饮',
      price: 1299,
      image: '/images/mall/home-banner-2.png'
    }
  ],
  driving: [
    {
      title: '玻璃水四季通用',
      subtitle: '理想专用配方',
      description: '四季通用，高效清洁，不留痕迹',
      price: 39,
      image: '/images/mall/sample-driving.jpg'
    },
    {
      title: '雨刷片',
      subtitle: '静音设计',
      description: '专车专用，安装简便',
      price: 89,
      image: '/images/mall/driving-banner-2.png'
    }
  ],
  smart: [
    {
      title: 'OPPO Watch X',
      subtitle: '智能手表',
      description: '支持车控功能，健康监测',
      price: 1299,
      image: '/images/mall/sample-smart.jpg'
    },
    {
      title: '理想智能钥匙',
      subtitle: '蓝牙连接',
      description: '便捷解锁，科技感十足',
      price: 199,
      image: '/images/mall/driving-banner-1.png'
    }
  ],
  outdoor: [
    {
      title: '滑雪手套',
      subtitle: '防水保暖',
      description: '专业级防护，舒适贴合',
      price: 199,
      image: '/images/mall/sample-outdoor.jpg'
    },
    {
      title: '户外露营帐篷',
      subtitle: '快速搭建',
      description: '防水防风，宽敞舒适',
      price: 899,
      image: '/images/mall/home-banner-1.png'
    }
  ],
  lifestyle: [
    {
      title: '毛毯套装',
      subtitle: '柔软舒适',
      description: '车用家用两相宜，保暖贴心',
      price: 159,
      image: '/images/mall/sample-lifestyle.jpg'
    },
    {
      title: '理想品牌T恤',
      subtitle: '纯棉材质',
      description: '舒适透气，品牌标识',
      price: 99,
      image: '/images/mall/driving-banner-1.png'
    }
  ],
  benefits: [
    {
      title: '会员专享礼包',
      subtitle: '限时优惠',
      description: '包含多种权益，尊享服务',
      price: 999,
      image: '/images/mall/home-banner-2.png'
    }
  ]
}

// 热卖推荐商品
const hotProducts = [
  {
    id: '1',
    name: '车载香氛',
    price: 99,
    image: '/images/mall/sample-lifestyle.jpg',
    rank: 1
  },
  {
    id: '2',
    name: '行车记录仪',
    price: 599,
    image: '/images/mall/sample-smart.jpg',
    rank: 2
  },
  {
    id: '3',
    name: '脚垫套装',
    price: 399,
    image: '/images/mall/sample-driving.jpg',
    rank: 3
  }
]

export function MallPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [activeTab, setActiveTab] = useState('home')
  const [carModel, setCarModel] = useState('理想ONE')

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.MALL_PRODUCTS)
      const data = await response.json()
      setProducts(data.products)
    } catch (error) {
      message.error('加载商品失败')
    }
  }

  const handleBuyNow = (productName: string) => {
    message.success(`正在购买: ${productName}`)
  }

  const tabs = [
    { key: 'home', label: '首页' },
    { key: 'driving', label: '用车' },
    { key: 'smart', label: '智能' },
    { key: 'outdoor', label: '户外' },
    { key: 'lifestyle', label: '周边' },
    { key: 'benefits', label: '权益' }
  ]

  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh', paddingBottom: '60px' }}>
      {/* 顶部车型选择和功能区 */}
      <div style={{
        background: '#fff',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #e8e8e8'
      }}>
        <Select
          value={carModel}
          onChange={setCarModel}
          style={{ width: 140 }}
          suffixIcon={<DownOutlined />}
          options={[
            { value: '理想ONE', label: '理想ONE' },
            { value: '理想L6', label: '理想L6' },
            { value: '理想L7', label: '理想L7' },
            { value: '理想L8', label: '理想L8' },
            { value: '理想L9', label: '理想L9' },
            { value: '理想MEGA', label: '理想MEGA' }
          ]}
        />
        <Space size="large">
          <SearchOutlined style={{ fontSize: '20px', color: '#666' }} />
          <Badge count={3} size="small">
            <ShoppingCartOutlined style={{ fontSize: '20px', color: '#666' }} />
          </Badge>
        </Space>
      </div>

      {/* Tab导航栏 */}
      <div style={{
        background: '#fff',
        display: 'flex',
        justifyContent: 'space-around',
        borderBottom: '1px solid #e8e8e8',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        {tabs.map(tab => (
          <div
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              padding: '12px 16px',
              cursor: 'pointer',
              color: activeTab === tab.key ? '#2F54EB' : '#666',
              borderBottom: activeTab === tab.key ? '2px solid #2F54EB' : 'none',
              fontWeight: activeTab === tab.key ? 'bold' : 'normal',
              transition: 'all 0.3s'
            }}
          >
            {tab.label}
          </div>
        ))}
      </div>

      {/* Banner轮播区 */}
      <div style={{ background: '#fff', marginBottom: '12px' }}>
        <Carousel autoplay>
          {bannerData[activeTab].map((banner, index) => (
            <div key={index}>
              <div style={{
                position: 'relative',
                height: '320px',
                background: `url(${banner.image}) center/cover`
              }}>
                {/* Banner内容 */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                  padding: '30px 16px 16px',
                  color: '#fff'
                }}>
                  <Text style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', display: 'block' }}>
                    {banner.title}
                  </Text>
                  <Text style={{ fontSize: '14px', color: '#fff', opacity: 0.9, display: 'block', marginTop: '4px' }}>
                    {banner.subtitle}
                  </Text>
                  <Text style={{ fontSize: '12px', color: '#fff', opacity: 0.8, display: 'block', marginTop: '8px' }}>
                    {banner.description}
                  </Text>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '12px'
                  }}>
                    <Text style={{ fontSize: '28px', fontWeight: 'bold', color: '#FFD700' }}>
                      ¥{banner.price}
                    </Text>
                    <Button
                      type="primary"
                      size="large"
                      style={{
                        background: '#2F54EB',
                        borderColor: '#2F54EB',
                        borderRadius: '20px',
                        paddingLeft: '32px',
                        paddingRight: '32px'
                      }}
                      onClick={() => handleBuyNow(banner.title)}
                    >
                      立即购买
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      {/* 热卖推荐区 */}
      <div style={{ padding: '16px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '12px',
          fontSize: '18px',
          fontWeight: 'bold'
        }}>
          <div style={{
            width: '4px',
            height: '18px',
            background: '#2F54EB',
            marginRight: '8px',
            borderRadius: '2px'
          }} />
          热卖推荐
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px'
        }}>
          {hotProducts.map(product => (
            <Card
              key={product.id}
              bodyStyle={{ padding: '8px' }}
style={{
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{ position: 'relative' }}>
                <Image
                  src={product.image}
                  preview={false}
                  style={{
                    width: '100%',
                    height: '100px',
                    objectFit: 'cover',
                    borderRadius: '6px'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  top: '8px',
                  left: '8px',
                  width: '24px',
                  height: '24px',
                  background: product.rank === 1 ? '#FF4D4F' : product.rank === 2 ? '#FF7A45' : '#FFA940',
                  color: '#fff',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}>
                  {product.rank}
                </div>
              </div>
              <div style={{ marginTop: '8px' }}>
                <Text
                  style={{
                    fontSize: '13px',
                    display: 'block',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {product.name}
                </Text>
                <Text
                  strong
                  style={{
                    fontSize: '16px',
                    color: '#FF4D4F',
                    display: 'block',
                    marginTop: '4px'
                  }}
                >
                  ¥{product.price}
                </Text>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 商品列表区（如果有实际商品数据） */}
      {products.length > 0 && (
        <div style={{ padding: '0 16px 16px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '12px',
            fontSize: '18px',
            fontWeight: 'bold'
          }}>
            <div style={{
              width: '4px',
              height: '18px',
              background: '#2F54EB',
              marginRight: '8px',
              borderRadius: '2px'
            }} />
            更多商品
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {products.map(product => (
              <Card
                key={product.id}
                bodyStyle={{ padding: '12px' }}
                style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
              >
                <Image
                  src={product.image}
                  preview={false}
                  style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '6px' }}
                />
                <div style={{ marginTop: '8px' }}>
                  <Text
                    strong
                    style={{
                      fontSize: '14px',
                      display: 'block',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {product.name}
                  </Text>
                  <Text
                    type="secondary"
                    style={{
                      fontSize: '12px',
                      display: 'block',
                      marginTop: '4px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {product.description}
                  </Text>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '8px'
                  }}>
                    <Text strong style={{ fontSize: '18px', color: '#FF4D4F' }}>
                      ¥{product.price}
                    </Text>
                    <Button
                      type="primary"
                      size="small"
                      style={{ borderRadius: '12px' }}
                      onClick={() => handleBuyNow(product.name)}
                    >
                      购买
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

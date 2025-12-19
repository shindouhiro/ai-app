import { useState } from 'react'
import { Form, Input, Button, Card, Typography, Tabs } from 'antd'
import { UserOutlined, LockOutlined, PhoneOutlined } from '@ant-design/icons'
import { useAuth } from '../contexts/AuthContext'

const { Title, Text } = Typography

export function LoginPage() {
  const { login, register, loading } = useAuth()
  const [activeTab, setActiveTab] = useState('login')

  const onLoginFinish = async (values: any) => {
    await login(values)
  }

  const onRegisterFinish = async (values: any) => {
    const { phone, password, nickname } = values
    await register({ phone, password, nickname })
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e8f5e9 0%, #fff3e0 100%)'
    }}>
      <Card style={{ width: 400, maxWidth: '90%', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 30 }}>
          理想汽车
        </Title>

        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          centered
          items={[
            {
              key: 'login',
              label: '登录',
              children: (
                <Form
                  name="login"
                  onFinish={onLoginFinish}
                  autoComplete="off"
                  initialValues={{ username: '13800138000', password: '123456' }}
                >
                  <Form.Item
                    name="username"
                    rules={[
                      { required: true, message: '请输入手机号' },
                      { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' }
                    ]}
                  >
                    <Input
                      prefix={<PhoneOutlined />}
                      placeholder="手机号"
                      size="large"
                    />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    rules={[
                      { required: true, message: '请输入密码' },
                      { min: 6, message: '密码至少6位' }
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined />}
                      placeholder="密码"
                      size="large"
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit" size="large" block loading={loading}>
                      登录
                    </Button>
                  </Form.Item>

                  <div style={{ textAlign: 'center' }}>
                    <Text type="secondary">
                      还没有账号？
                      <Button type="link" onClick={() => setActiveTab('register')} style={{ padding: 0, marginLeft: 4 }}>
                        立即注册
                      </Button>
                    </Text>
                  </div>
                </Form>
              )
            },
            {
              key: 'register',
              label: '注册',
              children: (
                <Form
                  name="register"
                  onFinish={onRegisterFinish}
                  autoComplete="off"
                >
                  <Form.Item
                    name="phone"
                    rules={[
                      { required: true, message: '请输入手机号' },
                      { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' }
                    ]}
                  >
                    <Input
                      prefix={<PhoneOutlined />}
                      placeholder="手机号"
                      size="large"
                    />
                  </Form.Item>

                  <Form.Item
                    name="nickname"
                    rules={[
                      { required: true, message: '请输入昵称' },
                      { min: 2, max: 20, message: '昵称长度2-20个字符' }
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined />}
                      placeholder="昵称"
                      size="large"
                    />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    rules={[
                      { required: true, message: '请输入密码' },
                      { min: 6, message: '密码至少6位' }
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined />}
                      placeholder="密码(至少6位)"
                      size="large"
                    />
                  </Form.Item>

                  <Form.Item
                    name="confirmPassword"
                    dependencies={['password']}
                    rules={[
                      { required: true, message: '请确认密码' },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve()
                          }
                          return Promise.reject(new Error('两次输入的密码不一致'))
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined />}
                      placeholder="确认密码"
                      size="large"
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit" size="large" block loading={loading}>
                      注册
                    </Button>
                  </Form.Item>

                  <div style={{ textAlign: 'center' }}>
                    <Text type="secondary">
                      已有账号？
                      <Button type="link" onClick={() => setActiveTab('login')} style={{ padding: 0, marginLeft: 4 }}>
                        立即登录
                      </Button>
                    </Text>
                  </div>
                </Form>
              )
            }
          ]}
        />
      </Card>
    </div>
  )
}

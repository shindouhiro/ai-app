# 理想汽车Web应用 - 前端

基于React + TypeScript的理想汽车Web应用前端，支持响应式设计。

## 技术栈

- React 18
- TypeScript 5
- Vite (构建工具)
- Redux Toolkit (状态管理)
- React Query (数据获取)
- Ant Design (UI组件库)
- React Router (路由)

## 功能特性

- 响应式设计（手机/平板/桌面）
- SSE实时推送
- 社区内容浏览与互动
- 远程车辆控制
- 充电服务与地图
- 商城购物
- 个人中心

## 快速开始

### 本地开发

1. 安装依赖：
```bash
npm install
```

2. 配置环境变量：
```bash
cp .env.example .env
# 编辑 .env 文件，配置后端API地址
```

3. 启动开发服务器：
```bash
npm run dev
```

4. 访问应用：
http://localhost:5173

### 生产构建

```bash
npm run build
```

构建产物位于 `dist/` 目录。

### Docker部署

1. 构建镜像：
```bash
docker build -t li-auto-frontend:latest .
```

2. 运行容器：
```bash
docker run -d -p 80:80 --name li-auto-frontend li-auto-frontend:latest
```

3. 访问应用：
http://localhost

## 项目结构

```
frontend/
├── src/
│   ├── main.tsx                # 应用入口
│   ├── App.tsx                 # 根组件
│   ├── pages/                  # 页面组件
│   │   ├── Home/               # 社区首页
│   │   ├── Vehicle/            # 车控
│   │   ├── Service/            # 服务
│   │   ├── Mall/               # 商城
│   │   └── Profile/            # 个人中心
│   ├── components/             # 可复用组件
│   │   ├── Layout/             # 布局组件
│   │   ├── Map/                # 地图组件
│   │   └── SSE/                # SSE组件
│   ├── store/                  # Redux状态管理
│   ├── services/               # API服务
│   ├── hooks/                  # 自定义Hooks
│   │   ├── useResponsive.ts   # 响应式Hook
│   │   └── useSSE.ts          # SSE Hook
│   ├── types/                  # TypeScript类型
│   └── styles/                 # 样式文件
├── public/                     # 静态资源
├── package.json                # 依赖配置
├── tsconfig.json               # TypeScript配置
├── vite.config.ts              # Vite配置
└── Dockerfile                  # Docker配置
```

## 响应式设计

应用支持三种屏幕尺寸：

- **手机端**: < 768px
- **平板端**: 768px - 1024px
- **桌面端**: > 1024px

使用 `useResponsive` Hook获取当前设备类型：

```typescript
import { useResponsive } from '@/hooks/useResponsive';

function MyComponent() {
  const deviceType = useResponsive();

  return (
    <div>
      当前设备: {deviceType}
    </div>
  );
}
```

## SSE实时推送

使用 `useSSE` Hook订阅服务器事件：

```typescript
import { useSSE } from '@/hooks/useSSE';

function VehicleStatus() {
  useSSE('vehicle-status', (data) => {
    console.log('车辆状态更新:', data);
  });

  return <div>车辆状态组件</div>;
}
```

## 环境变量

创建 `.env` 文件：

```
VITE_API_BASE_URL=http://localhost:8000
```

在K8S环境中，前端应使用后端服务的FQDN：

```
VITE_API_BASE_URL=http://li-auto-backend-service.devcloud.cloudtogo.local:8000
```

## 开发指南

### 添加新页面

1. 在 `src/pages/` 创建页面目录
2. 创建页面组件
3. 在 `src/routes/` 中注册路由
4. 在底部导航栏添加入口

### 状态管理

使用Redux Toolkit管理全局状态：

```typescript
// 创建slice
import { createSlice } from '@reduxjs/toolkit';

const mySlice = createSlice({
  name: 'myFeature',
  initialState: {},
  reducers: {
    // reducers
  }
});

export default mySlice.reducer;
```

### API调用

使用React Query进行数据获取：

```typescript
import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';

function MyComponent() {
  const { data, isLoading } = useQuery({
    queryKey: ['myData'],
    queryFn: () => api.get('/my-endpoint')
  });

  // ...
}
```

## 代码规范

运行ESLint检查：

```bash
npm run lint
```

## 注意事项

- 使用阿里云npm镜像加速依赖安装
- 生产环境需配置正确的后端API地址
- SSE连接需要处理断线重连
- 响应式设计需在不同屏幕尺寸下测试

## 许可证

Copyright © 2025 理想汽车

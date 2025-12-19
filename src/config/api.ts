/**
 * API配置
 *
 * 在K8S环境中，通过环境变量VITE_API_BASE_URL注入后端Service地址
 * Express服务器会在运行时将配置注入到window.__APP_CONFIG__
 * 在本地开发环境，使用localhost进行开发
 */

// 声明全局配置接口
declare global {
  interface Window {
    __APP_CONFIG__?: {
      apiBaseUrl: string;
    };
  }
}

// 从多个来源获取API地址，优先级：运行时配置 > 环境变量 > 默认值
const getApiBaseUrl = (): string => {
  // 1. 优先使用运行时注入的配置（生产环境）
  // 注意：空字符串是有效值，表示使用相对路径（通过Express代理）
  if (typeof window !== 'undefined' && window.__APP_CONFIG__) {
    return window.__APP_CONFIG__.apiBaseUrl;
  }

  // 2. 使用构建时环境变量（如果有）
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }

  // 3. 开发环境：使用localhost
  if (import.meta.env.DEV) {
    return 'http://localhost:8000';
  }

  // 4. 生产环境默认：使用相对路径（通过Express代理）
  return '';
};

// 标准化API_BASE_URL，去除尾部斜杠
const normalizeBaseUrl = (url: string): string => {
  return url.endsWith('/') ? url.slice(0, -1) : url;
};

export const API_BASE_URL = normalizeBaseUrl(getApiBaseUrl());

export const API_ENDPOINTS = {
  // 认证
  AUTH_LOGIN: `${API_BASE_URL}/api/v1/auth/login`,
  AUTH_REGISTER: `${API_BASE_URL}/api/v1/auth/register`,

  // 车辆
  VEHICLES: `${API_BASE_URL}/api/v1/vehicles`,

  // 充电
  CHARGING_STATIONS: `${API_BASE_URL}/api/v1/charging/stations`,
  CHARGING_ORDERS: `${API_BASE_URL}/api/v1/charging/orders`,

  // 社区
  COMMUNITY_CONTENTS: `${API_BASE_URL}/api/v1/community/contents`,

  // 商城
  MALL_PRODUCTS: `${API_BASE_URL}/api/v1/mall/products`,

  // 官方
  OFFICIAL_CONTENTS: `${API_BASE_URL}/api/v1/official/contents`,
};

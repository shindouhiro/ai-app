import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface NavigationState {
  currentTab: string
  unreadCounts: {
    [key: string]: number
  }
  pageScrollPositions: {
    [key: string]: number
  }
}

const initialState: NavigationState = {
  currentTab: '/',
  unreadCounts: {
    '/': 0,
    '/mall': 0,
    '/vehicle': 0,
    '/service': 0,
    '/profile': 0,
  },
  pageScrollPositions: {},
}

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setCurrentTab: (state, action: PayloadAction<string>) => {
      state.currentTab = action.payload
    },
    setUnreadCount: (state, action: PayloadAction<{ tab: string; count: number }>) => {
      state.unreadCounts[action.payload.tab] = action.payload.count
    },
    incrementUnreadCount: (state, action: PayloadAction<string>) => {
      state.unreadCounts[action.payload] = (state.unreadCounts[action.payload] || 0) + 1
    },
    clearUnreadCount: (state, action: PayloadAction<string>) => {
      state.unreadCounts[action.payload] = 0
    },
    saveScrollPosition: (state, action: PayloadAction<{ path: string; position: number }>) => {
      state.pageScrollPositions[action.payload.path] = action.payload.position
    },
    restoreScrollPosition: (state, action: PayloadAction<string>) => {
      const position = state.pageScrollPositions[action.payload]
      if (position !== undefined) {
        window.scrollTo(0, position)
      }
    },
  },
})

export const {
  setCurrentTab,
  setUnreadCount,
  incrementUnreadCount,
  clearUnreadCount,
  saveScrollPosition,
  restoreScrollPosition,
} = navigationSlice.actions

export default navigationSlice.reducer

'use client'

import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useMemo,
  useCallback,
} from 'react'

export type OpenWindow = {
  id: string
  contentKey: string
  title: string
  icon: string
  x: number
  y: number
  zIndex: number
  isMinimized: boolean
  isFocused: boolean
}

type WindowsState = {
  openWindows: OpenWindow[]
  zCounter: number
}

type WindowsAction =
  | {
      type: 'OPEN_WINDOW'
      payload: { contentKey: string; title: string; icon: string }
    }
  | { type: 'CLOSE_WINDOW'; payload: { id: string } }
  | { type: 'MINIMIZE_WINDOW'; payload: { id: string } }
  | { type: 'RESTORE_WINDOW'; payload: { id: string } }
  | { type: 'FOCUS_WINDOW'; payload: { id: string } }
  | { type: 'MOVE_WINDOW'; payload: { id: string; x: number; y: number } }

const WindowsContext = createContext<{
  openWindows: OpenWindow[]
  openWindow: (contentKey: string, title: string, icon: string) => void
  closeWindow: (id: string) => void
  minimizeWindow: (id: string) => void
  restoreWindow: (id: string) => void
  focusWindow: (id: string) => void
  moveWindow: (id: string, x: number, y: number) => void
} | null>(null)

const initialState: WindowsState = {
  openWindows: [],
  zCounter: 1,
}

function windowsReducer(
  state: WindowsState,
  action: WindowsAction
): WindowsState {
  switch (action.type) {
    case 'OPEN_WINDOW': {
      const id = `${action.payload.contentKey}-${Date.now()}`
      const newWindow: OpenWindow = {
        id,
        contentKey: action.payload.contentKey,
        title: action.payload.title,
        icon: action.payload.icon,
        x: 100 + state.openWindows.length * 20,
        y: 100 + state.openWindows.length * 20,
        zIndex: state.zCounter + 1,
        isMinimized: false,
        isFocused: true,
      }

      const unfocused = state.openWindows.map((w) => ({
        ...w,
        isFocused: false,
      }))

      return {
        openWindows: [...unfocused, newWindow],
        zCounter: state.zCounter + 1,
      }
    }

    case 'CLOSE_WINDOW':
      return {
        ...state,
        openWindows: state.openWindows.filter(
          (w) => w.id !== action.payload.id
        ),
      }

    case 'MINIMIZE_WINDOW':
      return {
        ...state,
        openWindows: state.openWindows.map((w) =>
          w.id === action.payload.id
            ? { ...w, isMinimized: true, isFocused: false }
            : w
        ),
      }

    case 'RESTORE_WINDOW':
      return {
        ...state,
        openWindows: state.openWindows.map((w) =>
          w.id === action.payload.id
            ? { ...w, isMinimized: false, isFocused: true }
            : w
        ),
      }

    case 'FOCUS_WINDOW': {
      const maxZ = state.zCounter + 1
      return {
        openWindows: state.openWindows.map((w) =>
          w.id === action.payload.id
            ? { ...w, zIndex: maxZ, isFocused: true }
            : { ...w, isFocused: false }
        ),
        zCounter: maxZ,
      }
    }

    case 'MOVE_WINDOW':
      return {
        ...state,
        openWindows: state.openWindows.map((w) =>
          w.id === action.payload.id
            ? { ...w, x: action.payload.x, y: action.payload.y }
            : w
        ),
      }

    default:
      return state
  }
}

export const WindowsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(windowsReducer, initialState)

  const openWindow = useCallback(
    (contentKey: string, title: string, icon: string) =>
      dispatch({ type: 'OPEN_WINDOW', payload: { contentKey, title, icon } }),
    []
  )
  const closeWindow = useCallback(
    (id: string) => dispatch({ type: 'CLOSE_WINDOW', payload: { id } }),
    []
  )
  const minimizeWindow = useCallback(
    (id: string) => dispatch({ type: 'MINIMIZE_WINDOW', payload: { id } }),
    []
  )
  const restoreWindow = useCallback(
    (id: string) => dispatch({ type: 'RESTORE_WINDOW', payload: { id } }),
    []
  )
  const focusWindow = useCallback(
    (id: string) => dispatch({ type: 'FOCUS_WINDOW', payload: { id } }),
    []
  )
  const moveWindow = useCallback(
    (id: string, x: number, y: number) =>
      dispatch({ type: 'MOVE_WINDOW', payload: { id, x, y } }),
    []
  )

  const value = useMemo(
    () => ({
      openWindows: state.openWindows,
      openWindow,
      closeWindow,
      minimizeWindow,
      restoreWindow,
      focusWindow,
      moveWindow,
    }),
    [
      state.openWindows,
      openWindow,
      closeWindow,
      minimizeWindow,
      restoreWindow,
      focusWindow,
      moveWindow,
    ]
  )

  return (
    <WindowsContext.Provider value={value}>{children}</WindowsContext.Provider>
  )
}

export const useWindows = () => {
  const context = useContext(WindowsContext)
  if (!context) {
    throw new Error('useWindows must be used inside WindowsProvider')
  }
  return context
}

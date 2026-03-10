'use client'

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'

const SetActionsContext = createContext<(actions: ReactNode) => void>(() => {})
const ActionsContext = createContext<ReactNode>(null);

export function HeaderActionsProvider({ children }: { children: ReactNode }) {
  const [actions, setActionsState] = useState<ReactNode>(null)
  const setActions = useCallback((a: ReactNode) => setActionsState(a), [])

  return (
    <SetActionsContext.Provider value={setActions}>
      <ActionsContext.Provider value={actions}>
        {children}
      </ActionsContext.Provider>
    </SetActionsContext.Provider>
  )
}

export function HeaderActionsSlot() {
  return <>{useContext(ActionsContext)}</>
}

export function HeaderActions({ children }: { children: ReactNode }) {
  const setActions = useContext(SetActionsContext)

  useEffect(() => {
    setActions(children)
    return () => setActions(null)
  }, [children, setActions])

  return null
}

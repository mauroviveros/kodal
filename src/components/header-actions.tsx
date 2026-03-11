'use client'
import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const SetActionsContext = createContext<(actions: React.ReactNode) => void>(() => {})
const ActionsContext = createContext<React.ReactNode>(null);

export const HeaderActionsProvider = ({ children }: { children: React.ReactNode }) => {
  const [actions, setActionsState] = useState<React.ReactNode>(null)
  const setActions = useCallback((a: React.ReactNode) => setActionsState(a), [])

  return (
    <SetActionsContext.Provider value={setActions}>
      <ActionsContext.Provider value={actions}>
        {children}
      </ActionsContext.Provider>
    </SetActionsContext.Provider>
  )
}

export const HeaderActionsSlot = () => {
  return <>{useContext(ActionsContext)}</>
}

export const HeaderActions = ({ children }: { children: React.ReactNode }) => {
  const setActions = useContext(SetActionsContext)

  useEffect(() => {
    setActions(children)
    return () => setActions(null)
  }, [children, setActions])

  return null
}

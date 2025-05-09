import React, { createContext, useContext, ReactNode } from 'react'

interface LevelProfileContextType {
    handleLevelProfileClick: () => void

}

export const LevelProfileContext = createContext<LevelProfileContextType | null>(null)

export const LevelProfileProvider: React.FC<{ handleLevelProfileClick: () => void, children: ReactNode }> = ({ handleLevelProfileClick, children }) => {

    return (
        <LevelProfileContext.Provider value={{ handleLevelProfileClick }}>
            {children}
        </LevelProfileContext.Provider>
    )
}

export const useLevelProfileContext = () => {
    const context = useContext(LevelProfileContext)
    if (!context) {
        throw new Error('useLevelProfileContext должен использоваться внутри LevelProfileProvider')
    }
    return context
}
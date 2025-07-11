"use client"

import { createContext, useState, useContext, useEffect } from "react"
import { AppType } from "@/types/App"
import { fetchApps } from "@/services/api-query"

interface ContextType {
    recentApps: AppType[]
    addApp: (app: AppType) => void
}

const RecentAppsContext = createContext<ContextType | undefined>(undefined)

export function RecentAppsProvider({ children }: { children: React.ReactNode }) {
    const [recentApps, setRecentApps] = useState<AppType[]>([])

    useEffect(() => {
        const ids = JSON.parse(localStorage.getItem("lastSelectedApps") || "[]")
        fetchApps().then(apps => {
            const map = Object.fromEntries(apps.map(a => [a.app_id, a]))
            const last = ids.map((id: number) => map[id]).filter(Boolean)
            setRecentApps(last)
        })
    }, [])

    const addApp = (app: AppType) => {
        const filtered = recentApps.filter(a => a.app_id !== app.app_id)
        const updated = [...filtered, app].slice(-3)
        setRecentApps(updated)
        localStorage.setItem("lastSelectedApps", JSON.stringify(updated.map(a => a.app_id)))
    }

    return (
        <RecentAppsContext.Provider value={{ recentApps, addApp }}>
            {children}
        </RecentAppsContext.Provider>
    )
}

export function useRecentApps() {
    const ctx = useContext(RecentAppsContext)
    if (!ctx) throw new Error("useRecentApps precisa ser usado dentro de RecentAppsProvider")
    return ctx
}

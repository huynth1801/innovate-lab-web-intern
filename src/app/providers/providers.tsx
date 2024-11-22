"use client"

import React, { useState, useEffect } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { WagmiProvider } from "wagmi"
import {
  RainbowKitProvider,
  darkTheme,
  lightTheme,
} from "@rainbow-me/rainbowkit"
import { config } from "../config/wagmi"
import { MoonIcon, SunIcon } from "lucide-react"

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  // Sử dụng localStorage để lưu theme
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches

    setIsDarkMode(savedTheme === "dark" || (!savedTheme && prefersDark))
  }, [])

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newTheme = !prev
      localStorage.setItem("theme", newTheme ? "dark" : "light")
      return newTheme
    })
  }

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={isDarkMode ? darkTheme() : lightTheme()}
          showRecentTransactions={true}
        >
          <div className={isDarkMode ? "dark" : ""}>
            <button
              onClick={toggleTheme}
              className="fixed bottom-4 right-4 flex items-center gap-2 p-3 rounded-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 z-50"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <SunIcon size={20} className="text-yellow-500" />
              ) : (
                <MoonIcon size={20} className="text-indigo-500" />
              )}
            </button>
            {children}
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

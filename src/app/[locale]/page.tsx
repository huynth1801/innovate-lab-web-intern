"use client"

import { useAccount } from "wagmi"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import "@rainbow-me/rainbowkit/styles.css"
import toast from "react-hot-toast"
import { useEffect } from "react"
import TransferForm from "../components/transfer-form"
import { useTranslations } from "next-intl"
import LanguageSwitcher from "@/components/language-switcher"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function Home() {
  const { isConnected } = useAccount()
  const t = useTranslations("Home")

  useEffect(() => {
    if (isConnected) {
      toast.success(t("connection_success"), { id: "connect-toast" })
    } else {
      toast.error(t("connection_fail"), { id: "connect-toast" })
    }
  }, [isConnected])

  return (
    <TooltipProvider>
      <main className="flex flex-col min-h-screen p-4 md:p-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <header className="fixed top-0 w-full backdrop-blur-2xl border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 z-10">
          <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
            {/* Left section */}
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              {t("wallet")}
            </h1>

            <div className="flex items-center gap-4">
              <Tooltip>
                <TooltipTrigger>
                  <LanguageSwitcher className="hidden md:flex" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t("language_switcher_tooltip")}</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <ConnectButton
                    label={t("connect_wallet")}
                    accountStatus={{
                      smallScreen: "avatar",
                      largeScreen: "full",
                    }}
                    showBalance={{
                      smallScreen: false,
                      largeScreen: true,
                    }}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {!isConnected
                      ? t("connect_wallet_tooltip")
                      : t("after_connected")}
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </header>

        <div className="flex-grow max-w-4xl mx-auto w-full pt-20">
          <section className="py-8 md:py-12 flex flex-col items-center text-center gap-6">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              {t("app_name")}
            </h1>
            <p className="text-lg md:text-xl max-w-2xl text-gray-600 dark:text-gray-300">
              {t("transfer_description")}
            </p>
          </section>

          <section className="flex flex-col items-center justify-center w-full my-8">
            <div className="w-full max-w-3xl p-6 md:p-12 dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 transition-colors duration-200">
              <TransferForm />
            </div>
          </section>
        </div>
      </main>
    </TooltipProvider>
  )
}

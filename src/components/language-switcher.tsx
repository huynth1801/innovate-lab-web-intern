import { useLocale } from "next-intl"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { US, VN } from "country-flag-icons/react/3x2"
import { Globe } from "lucide-react"
import { useRouter } from "next/navigation"

export interface Language {
  code: string
  name: string
  flag: JSX.Element
}

export interface LanguageSwitcherProps {
  className?: string
}

export default function LanguageSwitcher({
  className = "",
}: LanguageSwitcherProps): JSX.Element {
  const locale = useLocale()
  const router = useRouter()

  const languages: Language[] = [
    {
      code: "en",
      name: "English",
      flag: <US title="United States" className="h-4 w-4" />,
    },
    {
      code: "vi",
      name: "Tiếng Việt",
      flag: <VN title="Việt Nam" className="h-4 w-4" />,
    },
  ]

  const changeLanguage = async (newLocale: string) => {
    router.push(`${newLocale}`)
  }

  return (
    <div
      className={`flex items-center bg-white/30 dark:bg-gray-800/30 backdrop-blur-md rounded-full px-3 py-2 shadow-md hover:shadow-lg transition-shadow duration-300 ${className}`}
    >
      <Globe className="w-5 h-5 text-gray-500 dark:text-gray-300 mr-2" />
      <Select value={locale} onValueChange={changeLanguage}>
        <SelectTrigger className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-sm font-medium shadow-sm transition-colors">
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent className="rounded-lg shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          {languages.map((lang) => (
            <SelectItem
              key={lang.code}
              value={lang.code}
              className="flex items-center gap-2 px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-all"
            >
              <div className="flex items-center gap-2">
                <div className="flex-shrink-0">{lang.flag}</div>
                <span
                  className={`text-sm font-medium ${
                    locale === lang.code
                      ? "text-indigo-600 dark:text-indigo-400"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {lang.name}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

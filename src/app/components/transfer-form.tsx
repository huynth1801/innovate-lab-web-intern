"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import toast from "react-hot-toast"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"

const TransferForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [txStatus, setTxStatus] = useState<string>("")
  const [txHash, setTxHash] = useState<string | null>(null)
  const t = useTranslations("Home")

  // Define form validation schema using Zod
  const formSchema = z.object({
    address: z
      .string()
      .min(1, { message: "Address is required" })
      .regex(/^0x[a-fA-F0-9]{40}$/, {
        message: "Invalid Ethereum address format",
      }),
    amount: z
      .string()
      .min(1, { message: "Amount is required" })
      .refine((value) => !isNaN(Number(value)) && Number(value) > 0, {
        message: "Amount must be greater than 0",
      }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
      amount: "",
    },
  })

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    setTxStatus("Pending...")
    setTxHash(null)

    try {
      const response = await fetch("/api/claim", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok) {
        setTxHash(result.txHash)
        setTxStatus("Transaction submitted")

        if (result.success) {
          setTxStatus("Finalized")
          toast.success("Faucet claim successful!")
        } else {
          setTxStatus("Failed")
          toast.error("The transaction could not be completed.")
        }
      } else {
        setTxStatus("Failed")
        toast.error(`${result.error}`)
      }
    } catch (error) {
      setTxStatus("Failed")
      toast.error(`${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 p-4 dark:bg-gray-800 dark:text-white rounded-md max-w-md mx-auto"
      >
        <div className="grid gap-4">
          {/* Destination Address Field */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <label className="dark:text-white mb-2 block">
                  {t("destination_address")}
                </label>
                <FormControl>
                  <Input
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white rounded-md"
                    placeholder={t("placeholder_destination_address")}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <label className="dark:text-white mb-2 block">
                  {t("amount")}
                </label>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white rounded-md"
                    placeholder={t("placeholder_amount")}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
        </div>

        <Button
          size="lg"
          disabled={isLoading}
          type="submit"
          className="w-full dark:bg-white dark:text-black rounded-md"
        >
          {isLoading ? `${t("processing")}...` : `${t("transfer_button")}`}
        </Button>

        {/* Transaction Status */}
        {txStatus && (
          <div className="mt-4 text-center">
            <p
              className={`text-lg ${
                txStatus === "Finalized" ? "text-green-500" : "text-red-500"
              }`}
            >
              {txStatus}
            </p>
            {txHash && (
              <p>
                <a
                  href={`https://sepolia.etherscan.io/tx/${txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  View on Explorer
                </a>
              </p>
            )}
          </div>
        )}
      </form>
    </Form>
  )
}

export default TransferForm

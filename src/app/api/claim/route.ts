import { NextRequest } from "next/server"
import { ethers } from "ethers"
import redis from "@/lib/redis"

const COOLDOWN_PERIOD = 3 * 60

const provider = new ethers.providers.JsonRpcProvider({
  url: process.env.RPC_URL as string,
  skipFetchSetup: true,
})

const wallet = new ethers.Wallet(process.env.PRIVATE_KEY as string, provider)
const balance = await wallet.getBalance()
console.log("Balance:", ethers.utils.formatEther(balance), "ETH")

let lastNonce = -1

async function getNextNonce() {
  const currentNonce = await wallet.getTransactionCount("pending")
  lastNonce = Math.max(lastNonce, currentNonce - 1)
  return lastNonce + 1
}

export async function POST(request: NextRequest) {
  const { address, amount } = await request.json()

  // Validate Ethereum address
  if (!ethers.utils.isAddress(address)) {
    return new Response(JSON.stringify({ error: "Invalid Ethereum address" }), {
      status: 400,
    })
  }

  try {
    // Check cooldown period in Redis
    const lastClaimTime = await redis.get(`lastClaim:${address}`)
    const now = Math.floor(Date.now() / 1000)

    if (lastClaimTime) {
      const timeSinceLastClaim = now - parseInt(lastClaimTime, 10)
      if (timeSinceLastClaim < COOLDOWN_PERIOD) {
        const remainingTime = Math.ceil(
          (COOLDOWN_PERIOD - timeSinceLastClaim) / 60
        )
        return new Response(
          JSON.stringify({
            error: `Please wait ${remainingTime} minutes before claiming again`,
          }),
          { status: 429 }
        )
      }
    }

    const nonce = await getNextNonce()
    const tx = await wallet.sendTransaction({
      to: address,
      value: ethers.utils.parseEther(amount),
      nonce: nonce,
      gasPrice: await provider.getGasPrice(),
      gasLimit: 21000,
    })

    // Do not wait for transaction confirmation
    await tx.wait(1)

    // Update last claim time in Redis
    await redis.set(`lastClaim:${address}`, now, "EX", COOLDOWN_PERIOD)

    return new Response(JSON.stringify({ success: true, txHash: tx.hash }), {
      status: 200,
    })
  } catch (error) {
    console.error("Error processing claim:", error)

    if (error instanceof Error) {
      if (error.message.includes("already known")) {
        return new Response(
          JSON.stringify({
            error:
              "Transaction already submitted. Please wait and try again later.",
          }),
          { status: 409 }
        )
      }
      if (error.message.includes("replacement fee too low")) {
        return new Response(
          JSON.stringify({ error: "Network is busy. Please try again later." }),
          { status: 503 }
        )
      }
    }

    return new Response(
      JSON.stringify({ error: "An unexpected error occurred" }),
      { status: 500 }
    )
  }
}

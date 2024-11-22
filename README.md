# Crypto Wallet App with RainbowKit, ShadCN/UI, Redis, and QuickNode

This project is a **Next.js** application designed to provide a seamless crypto wallet experience. It uses **RainbowKit**, **ShadCN/UI**, **Redis**, and **QuickNode** for enhanced functionality, performance, and user experience.

---

## **Features**

- **Connect Wallet**: Effortlessly connect crypto wallets with RainbowKit and Wagmi.
- **Customizable UI**: ShadCN/UI ensures a beautiful, responsive design.
- **High Performance**: Redis for fast caching and state management.
- **Blockchain Integration**: QuickNode for reliable blockchain interaction.

---

## **Why These Technologies?**

### **RainbowKit**

- Provides a simple and elegant wallet connection interface.
- Integrates seamlessly with **Wagmi** for Ethereum-based apps.
- Supports popular wallets like MetaMask, Coinbase Wallet, and WalletConnect.

### **ShadCN/UI**

- Pre-styled, customizable components built for React and Tailwind CSS.
- Ensures accessibility and a consistent design experience.
- Perfect for responsive and modern UI development.

### **Redis**

- High-performance key-value store for caching and session management.
- Reduces latency for real-time updates and data retrieval.
- Ideal for managing transaction states.

### **QuickNode**

- Scalable and reliable blockchain infrastructure provider.
- Speeds up blockchain API interactions.
- Reduces complexity by eliminating the need for self-managed blockchain nodes.

---

## **Getting Started**

### **1. Prerequisites**

- Node.js (>= 18.x)
- npm, yarn, pnpm, or bun
- Redis server (optional if using a cloud Redis provider)

### **2. Clone the Repository**

```bash
git clone https://github.com/your-username/crypto-wallet-app.git
cd crypto-wallet-app
```

### **3. Install Dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### **4. Configure Environment Variables**

Create a `.env` file in the root directory:

```bash
PRIVATE_KEY=
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=
NEXT_PUBLIC_ENABLE_TESTNETS=true
RPC_URL=
REDIS_URL=
```

### **5. Start Development Server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open http://localhost:3000 to see the app.


[![Demo video](https://img.youtube.com/vi/_5tFXJQIzi4/0.jpg)]([https://www.youtube.com/watch?v=_5tFXJQIzi4](https://youtu.be/ixPyfnGaTlo))



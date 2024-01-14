import { useState } from "react"
import { WalletBalance } from '../types/switcheo-types.tsx'
import { mockBalance } from '../mockdata/mockBalance.tsx'

export const useWalletBalances = (): WalletBalance[] => {
  const [walletBalance, setWalletBalance] = useState<WalletBalance[]>(mockBalance)

  return walletBalance

}
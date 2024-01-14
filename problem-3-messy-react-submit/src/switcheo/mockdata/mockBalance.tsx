import { WalletBalance, Blockchain } from '../types/switcheo-types'

export const mockBalance: WalletBalance[] = [

  {
    currency: 'STATOM',
    amount: 984.2342323,
    blockchain: "Zilliqa"
  },
  {
    currency: 'OKT',
    amount: 584758.57875453375,
    blockchain: "Arbitrum"
  },
  {
    currency: 'IBCX',
    amount: 394822.4534987345,
    blockchain: "Ethereum"
  },
  {
    currency: 'ETH',
    amount: 234429.49205678,
    blockchain: "Neo"
  },
  {
    currency: 'BLUR',
    amount: 63423.34392844,
    blockchain: "Thunder" as Blockchain
  },
  {
    currency: 'STEVMOS',
    amount: 42383.08970974,
    blockchain: "DAI" as Blockchain
  },
  {
    currency: 'ATOM',
    amount: 102192.583710101112,
    blockchain: "Osmosis"
  },
]

export interface apiData {
  currency: Currency;
  date: Date;
  price: number;
}
export interface WalletBalance {
  currency: Currency;
  amount: number;
  blockchain: Blockchain;
}
export interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

export interface BoxProps { };

export interface Props extends BoxProps {

}

// export interface prices { [key: string]: number };
export interface Price {
  currency: Currency,
  date: Date,
  price: number
}

export interface WalletRowType {
  className?: string;
  key?: number;
  currency: string;
  blockchain: string;
  amount: number;
  usdValue: number;
  formattedAmount: string
}

export type Blockchain = 'Osmosis' | 'Ethereum' | 'Arbitrum' | 'Zilliqa' | 'Neo' | undefined;

export type Currency = "ampLUNA" | "ATOM" | "axlUSDC" | "BLUR" | "bNEO" | "BUSD" | "ETH" | "EVMOS" | "GMX" | "IBCX" | "IRIS" | "KUJI" | "LSI" | "LUNA" | "OKB" | "OKT" | "OSMO" | "RATOM" | "rSWTH" | "STATOM" | "STEVMOS" | "STLUNA" | "STOSMO" | "STRD" | "SWTH" | "USC" | "USD" | "USDC" | "WBTC" | "wstETH" | "YieldUSD" | "ZIL";


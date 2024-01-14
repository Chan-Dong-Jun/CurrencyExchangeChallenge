import React, { useEffect, useMemo, useState } from 'react';
import { constants } from '../constants/switcheo-constants.tsx';
import { useWalletBalances } from '../hooks/useWalletBalances.tsx';
import { Blockchain, FormattedWalletBalance, WalletBalance, Price, Props } from "../types/switcheo-types.tsx";
import { Datasource } from '../apis/Datasource.tsx';
import { WalletRow } from '../components/WalletRow.tsx';

export const WalletPage: React.FC<Props> = (props: Props): JSX.Element => {
  const { ...rest } = props;
  const balances: WalletBalance[] = useWalletBalances();
  const [prices, setPrices] = useState<Price[]>([]);

  useEffect(() => {
    const datasource = new Datasource(constants.url);  // use constants instead of env 
    datasource
      .getPrices()
      .then((prices) => {
        setPrices(prices);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getPriority = (blockchain: Blockchain): number => {
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  const sortedBalances: WalletBalance[] = useMemo(() => { // Formatted or not Formatted ??
    const balanceRes = balances.filter((balance: WalletBalance) => {
      const balancePriority = getPriority(balance.blockchain);
      if (balancePriority > -99) {
        if (balance.amount >= 0) {
          return true;

        }
      }
      else {
        return false;
      }
    })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        if (leftPriority >= rightPriority) {
          return -1;
        } else {
          return 1;
        }
      });

    return balanceRes
  }, [balances, prices]);

  const formattedBalances: FormattedWalletBalance[] = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed(2),  // how many decimal points ??
    };
  });

  const rows = formattedBalances.map(
    (balance: FormattedWalletBalance, index: number): JSX.Element => {

      const usdValue = prices.find(
        el => el.currency === balance.currency
      )?.price as number * balance.amount;

      return (
        <WalletRow
          className={balance.blockchain}
          key={index}
          currency={balance.currency}
          blockchain={balance.blockchain as string}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    }
  );

  return (
    <>
      <div style={{ padding: '3rem', border: '0.2rem solid slateblue' }}>
        <label style={{ display: 'inline-block', padding: '1rem  10rem 3rem', color: 'slateblue' }}>Welcome to Coin Exchange</label>
        <div {...rest}>
          {rows}
        </div>
      </div >
    </>
  )
};

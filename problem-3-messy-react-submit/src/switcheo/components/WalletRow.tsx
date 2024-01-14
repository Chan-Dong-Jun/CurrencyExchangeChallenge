import { WalletRowType } from '../types/switcheo-types';
import React from 'react';


export const WalletRow = ({ className, key, currency, blockchain, amount, usdValue, formattedAmount, }: WalletRowType): JSX.Element => {

  return (
    <React.Fragment key={key}>
      {usdValue &&
        <div className={className} >
          <div className='row row-currency'>{currency}</div>
          <div className='row row-blockchain'>{blockchain}</div>
          <div className='row row-amount'>{amount}</div>
          <div className='row row-usdValue'>{usdValue}</div>
          <div className='row row-formattedAmount'>{formattedAmount}</div>
        </div>
      }
    </React.Fragment>
  )
}
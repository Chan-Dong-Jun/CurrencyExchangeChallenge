import { constants } from '../constants/switcheo-constants.tsx';
import { Price } from "../types/switcheo-types.tsx";

//
// Problem using dotenv. Use constants instead
//
// import 'dotenv/config';
// dotenv.config({ path: '\.env.dev' });
// console.log(process.env.REACT_APP_pricesURL)

export class Datasource {

  url: string;

  constructor(url: string) {
    this.url = url;
  }

  getPrices = async (): Promise<Price[]> => {
    const res = await fetch(constants.url);
    const prices = await res.json();
    return prices;

  };

}

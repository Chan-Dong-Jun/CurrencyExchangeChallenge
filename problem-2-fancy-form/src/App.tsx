import { useState, useEffect, useRef } from 'react'
import React from 'react';
import './App.css'
import { currencyData } from "./coindata.js";
import arrowImg from './assets/images/arrow.png'
import validator, { isUUID } from 'validator';
import { v4 as uuidv4 } from 'uuid';
import Select from 'react-select';

type Direction = "leftToRight" | "rightToLeft";

const iconSource = (icon: string, ext: string = 'svg'): string => `http://localhost:5173/tokens/${icon}.${ext}`

const infoMsgs: { [key: string]: string } = {
  'maxDeci': '❗Maximum decimals = 2',
  'maxDeciPt': '❗You have typed a period (.) but your number is already a decimal.',
  'nonNumber': '❗Please enter numbers only'
}

const CurrencySearch = ({ className, setCoin }: { className?: string, setCoin: React.Dispatch<React.SetStateAction<string>> }): JSX.Element => {
  const options = currencyData.map(el => {
    return ({
      value: el.currency, label: el.currency
    })
  }).sort((a, b) => (
    a.label.toLowerCase() >= b.label.toLowerCase() ? 1 : -1
  ))

  return (
    <div
      style={{ height: '2rem' }}
    >
      <Select options={options} className='select' placeholder={currencyData[0].currency}
        onChange={(e) => setCoin(e?.value as string)}>
        {/* {currencyData.map((op) => <option key={op.currency}>
          {op.currency}
        </option>)} */}
      </Select>
    </div>
  );
}

const App = (): JSX.Element => {
  const [coin1, setCoin1] = useState<string>(currencyData[0].currency)
  const [coin2, setCoin2] = useState<string>(currencyData[0].currency)
  const [dispValue1, setDispValue1] = useState<string>('')
  const [dispValue2, setDispValue2] = useState<string>('')
  const [value1, setValue1] = useState<number>(0)
  const [value2, setValue2] = useState<number>(0)
  const [direction, setDirection] = useState<Direction>("leftToRight")
  const [infoMsg, setInfoMsg] = useState<string | null>(null)
  const leftRef = useRef(undefined);
  const rightRef = useRef(undefined);
  const X = useState<() => {}>()


  let conversion: number = currencyData.filter((currencyObject) => currencyObject.currency === coin1)[0].price / currencyData.filter((currencyObject) => currencyObject.currency === coin2)[0].price;

  useEffect(() => {
    if (direction === "leftToRight") {
      setValue2(Math.round(conversion * value1 * 100) / 100)
      setDispValue2(value2.toString())
      leftRef.current.focus();
    } else {
      setValue1(Math.round(value2 / conversion * 100) / 100)
      setDispValue1(value1.toString())
      rightRef.current.focus();
    }
  })

  const setValue = (direction: Direction): React.Dispatch<React.SetStateAction<number>> => {
    return (
      direction === 'leftToRight' ? setValue1 : setValue2
    )
  }

  const setDispValue = (direction: Direction): React.Dispatch<React.SetStateAction<string>> => {
    return (
      direction === 'leftToRight' ? setDispValue1 : setDispValue2
    )
  }

  const arrowChangeDirection = () => {
    setDirection((prev) => prev === 'leftToRight' ? 'rightToLeft' : 'leftToRight')
  }

  const allFunctions = (e: React.ChangeEvent<HTMLInputElement>, direction: Direction): void => {

    let inDispValue = e.target.value;
    let endDot: string = '';

    if ((inDispValue.split('.').length > 2)) {
      setInfoMsg(infoMsgs['maxDeciPt'])
    }
    else if ((inDispValue.split('.').length === 2 && inDispValue.split('.')[1].length > 2)) {
      setInfoMsg('You have entered: ' + inDispValue + ".   " + infoMsgs['maxDeci'])
      inDispValue = (Math.floor(Number(inDispValue) * 100) / 100).toString();
    }
    else if (!validator.isFloat(inDispValue) && inDispValue !== '') {
      setInfoMsg(infoMsgs['nonNumber'])
    }
    else {
      setInfoMsg(null)
    }

    endDot = inDispValue.slice(-1) === '.' ? '.' : ''

    if (Number(inDispValue) < 9999999 && Number(inDispValue) >= 0) {

      setDispValue(direction)(Number(inDispValue).toString() + endDot)
      setValue(direction)(Number(inDispValue))

      // setDispValue1(inDispValue)
      // setDispValue(direction)(inDispValue[0] === '0' ? inDispValue.slice(1) : inDispValue)
      // setDispValue(direction)(Number(inDispValue).toString())
      // setDispValue(direction === 'leftToRight' ? 'rightToLeft' : 'leftToRight')(value2.toString())

    }
    setDirection(direction)
  }



  // src = {`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${coin2}.svg`}

  // const styleIcon = {
  //   color: 'darkgrey',
  //   fontSize: '2rem',
  //   margin: 'auto',
  //   width: '400px',
  //   height: '400px'
  // }
  // const styleInputBox = { width: '300px', padding: '0rem 4rem' }
  return (
    <>
      <div className='body' style={{
        display: 'flex', flexDirection: 'column',
        height: 'auto', width: '150rem', margin: '0rem auto'
      }}>
        {/* Welcome to Coin Exchange */}
        <div  className="styleHeaderDiv">
          <label className="styleHeaderText">Welcome to Coin Exchange</label>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div className='column'>
            <img
              className='styleIcon'
              //style={styleIcon}
              src={iconSource(coin1)}
              alt={`Image of ${coin1}`}
            />
            <div>
              <CurrencySearch className="CurrencySearch" setCoin={setCoin1} />
              <input
                ref={leftRef}
                //style={styleInputBox}
                className='styleInputBox'
                type="text"
                value={dispValue1}
                onChange={(e) => allFunctions(e, 'leftToRight')}
                pattern='/[0-9]+/'    // '/^[0-9]+$/'
              />
            </div>
          </div>
          {/* Arrow Box */}
          <div
            className='input'
            style={{ width: '40rem', transform: direction === 'leftToRight' ? 'scaleX(1)' : 'scaleX(-1)', display: 'flex', justifyContent:"center" }}
          >
            <img
              onClick={() => setDirection(prev => prev === 'leftToRight' ? 'rightToLeft' : 'leftToRight')}
              //style={styleIcon}
              className='styleIcon'
              src="http://localhost:5173/images/arrow2.png"
              alt={direction === 'leftToRight' ? 'Left to Right' : 'Right to Left'}
            />
          </div>
          <div className='column'>
            <img
              //style={styleIcon}
              className='styleIcon'
              src={iconSource(coin2)}
              alt={`Image of ${coin2}`}
            />
            <CurrencySearch className="CurrencySearch" setCoin={setCoin2} />
            <input
              ref={rightRef}
              // style={styleInputBox}
              className='styleInputBox'
              type="text"
              value={dispValue2}
              onChange={(e) => allFunctions(e, 'rightToLeft')}
              pattern='/[0-9]+/'    // '/^[0-9]+$/'

            />
          </div>
        </div>
        {/* Message */}
        <div className="styleFooter" >
          <label >{!infoMsg
            ?
            <label>
              💡 Type in the left or right input box to start the conversion.
              You can also click on the arrow to change direction
            </label>
            :
            <label style={{ color: 'red' }}>
              {infoMsg}
            </label>
          }</label>
        </div>
      </div >
    </>
  )
}

export default App

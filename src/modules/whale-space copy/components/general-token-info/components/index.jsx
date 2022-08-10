import React, { Fragment, useEffect, useState, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { connect } from "react-redux";
import { numberWithCommas, upperText } from '../../../../../helpers';
import BigNumber from 'bignumber.js';


import "./style.scss";
import { WhaleSpaceActions } from "../../../redux/actions";

function GeneralTokenInfo(props) {
  const location = useLocation();
  const tokenAddress = location.pathname.split("/")[2];
  const { WhaleSpace } = props
  useEffect(() => {
    props.getTokenInfomation(tokenAddress)
  }, [])

  let tokenInfomation = {
  }
  if (WhaleSpace?.tokenInfomation) {   
    tokenInfomation = WhaleSpace.tokenInfomation
  }
  const handlePrice = (price) => {
    if (price < 1) {
      const i = Math.floor(Math.log(price) / Math.log(10));
      return BigNumber(price).toFixed(-i+2)
    }
    if (price > 1) {
      return BigNumber(price).toFixed(2)
    }
  }
  return (
    <Fragment>
      <div className="coin-container">
        <div className="coin-left">
          <h1 className="coin-name">
            <img
              className='logo'
              src={tokenInfomation['image']}
              alt="Logo"
            />
            <span>{tokenInfomation['name']}</span>
            <div className="coin-logo">{tokenInfomation['symbol'] ? tokenInfomation['symbol'].toUpperCase() : "" }</div>
          </h1>
          <ul className="list-desc">
            <li className="desc-item">Chain name: {tokenInfomation['chainName'] ? tokenInfomation['chainName'].toUpperCase() : "" }</li>
          </ul>
        </div>

        <div className="coin-right">
          <span className="coin-desc">Price {tokenInfomation['name']} ({tokenInfomation['symbol']})</span>
          <div className="coin-price">
            <h1> {handlePrice(tokenInfomation['price'])} USD</h1>
            {/* <div className="coin-up">&#x25B2; 0.81%</div> */}
          </div>

          <div className="market">
            <div className="market__item">
              <div className="coin-desc">Market cap</div>
              <div className="market__price">{numberWithCommas(BigNumber(tokenInfomation['marketCap']).toFixed(2))} USD</div>
              {/* <span>1.38%</span> */}
            </div>
            <div className="market__item">
              <div className="coin-desc">
                Fully Diluted Market Cap
              </div>
              <div className="market__price">{numberWithCommas(BigNumber(tokenInfomation['totalSupply']*tokenInfomation['price']).toFixed(2))} USD</div>
              {/* <span>1.38%</span> */}
            </div>
            <div className="market__item">
              <div className="coin-desc">
                {/* Khối lượng <span className="desc-item">24 giờ</span> */}
                Circulating Supply
              </div>
              <div className="market__price">{numberWithCommas(BigNumber(tokenInfomation['circulatingSupply']).toFixed(2))}</div>
              <div className="coin-desc">Total supply</div>
              <div className="market__price">{numberWithCommas(BigNumber(tokenInfomation['totalSupply']).toFixed(2))}</div>
            </div>
            <div className="market__item">
              <div className="coin-desc">Total wallets</div> 
              <div className="market__price">{numberWithCommas(BigNumber(tokenInfomation['totalWallets']).toFixed(0))} wallets</div>
            </div>
          </div>
        </div>
      </div>

    </Fragment>
  );
}

function mapState(state) {
  const { WhaleSpace } = state;
  return { WhaleSpace };
}
const actions = {
  getTokenInfomation: WhaleSpaceActions.getTokenInfomation
};
export default connect(mapState, actions)(GeneralTokenInfo);

import React, { Fragment, useEffect, useState, useRef, useCallback } from 'react';
import { connect } from "react-redux";


import "./style.scss";
import { WhaleSpaceActions } from "../../../redux/actions";

function tokenInfomationTokenInfo(props) {

  useEffect(() => {
    props.getTokenInfomation('0x38_0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c')
  }, [])

  let tokenInfomation = {
  }
  if (WhaleSpace?.tokenInfomation) {   
    tokenInfomation = WhaleSpace.tokenInfomation
  }
  console.log(tokenInfomation)
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
            <div className="coin-logo">{tokenInfomation['symbol']}</div>
          </h1>
          <ul className="list-desc">
            <li className="desc-item">Chain name: {tokenInfomation['chain_name']}</li>
          </ul>
        </div>

        <div className="coin-right">
          <span className="coin-desc">Price {tokenInfomation['name']} ({tokenInfomation['symbol']})</span>
          <div className="coin-price">
            <h1> {tokenInfomation['price']} USD</h1>
            {/* <div className="coin-up">&#x25B2; 0.81%</div> */}
          </div>

          <div className="market">
            <div className="market__item">
              <div className="coin-desc">Market cap</div>
              <div className="market__price">{tokenInfomation['market_cap']} USD</div>
              {/* <span>1.38%</span> */}
            </div>
            <div className="market__item">
              <div className="coin-desc">
                Fully Diluted Market Cap
              </div>
              <div className="market__price">{tokenInfomation['total_supply']*tokenInfomation['price']} USD</div>
              {/* <span>1.38%</span> */}
            </div>
            <div className="market__item">
              <div className="coin-desc">
                {/* Khối lượng <span className="desc-item">24 giờ</span> */}
                Circulating Supply
              </div>
              <div className="market__price">{tokenInfomation['circulating_supply']}</div>
              <span>75.00%</span>
              <div className="coin-desc">Total supply</div>
              <div className="market__price">{tokenInfomation['total_supply']}</div>
            </div>
            <div className="market__item">
              <div className="coin-desc">Total holders</div>
              <div className="market__price">{tokenInfomation['total_holders']} holders</div>
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
export default connect(mapState, actions)(tokenInfomationTokenInfo);

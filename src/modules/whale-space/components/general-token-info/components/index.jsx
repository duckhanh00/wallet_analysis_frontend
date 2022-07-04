import React, { Fragment, useEffect, useState, useRef, useCallback } from 'react';
import { connect } from "react-redux";


import "./style.scss";
import { WalletTypeActions } from "../../../redux/actions";

function GeneralTokenInfo(props) {
  const { WalletType } = props

  useEffect(() => {
    props.getTokenGeneral('trava', 'bsc')
  }, [])

  // const [tokenGeneral, setTokenGeneral] = useState([])
  // console.log(tokenGeneral)
  let general = {}
  if (WalletType?.tokenGeneral) {
    general = WalletType.tokenGeneral
  }
  return (
    <Fragment>
      <div className="coin-container">
        <div className="coin-left">
          <h1 className="coin-name">
            <img
              className='logo'
              src={general['image']}
              alt="Logo"
            />
            <span>{general['name']}</span>
            <div className="coin-logo">{general['symbol']}</div>
          </h1>
          <ul className="list-desc">
            <li className="desc-item">Chain name: {general['chain_name']}</li>
          </ul>
        </div>

        <div className="coin-right">
          <span className="coin-desc">Price {general['name']} ({general['symbol']})</span>
          <div className="coin-price">
            <h1> {general['price']} USD</h1>
            {/* <div className="coin-up">&#x25B2; 0.81%</div> */}
          </div>

          <div className="market">
            <div className="market__item">
              <div className="coin-desc">Market cap</div>
              <div className="market__price">{general['market_cap']} USD</div>
              {/* <span>1.38%</span> */}
            </div>
            <div className="market__item">
              <div className="coin-desc">
                Fully Diluted Market Cap
              </div>
              <div className="market__price">{general['total_supply']*general['price']} USD</div>
              {/* <span>1.38%</span> */}
            </div>
            <div className="market__item">
              <div className="coin-desc">
                {/* Khối lượng <span className="desc-item">24 giờ</span> */}
                Circulating Supply
              </div>
              <div className="market__price">{general['circulating_supply']}</div>
              <span>75.00%</span>
              <div className="coin-desc">Total supply</div>
              <div className="market__price">{general['total_supply']}</div>
            </div>
            <div className="market__item">
              <div className="coin-desc">Total holders</div>
              <div className="market__price">{general['total_holders']} holders</div>
            </div>
          </div>
        </div>
      </div>

    </Fragment>
  );
}

function mapState(state) {
  const { WalletType } = state;
  return { WalletType };
}
const actions = {
  getTokenGeneral: WalletTypeActions.getTokenGeneral
};
export default connect(mapState, actions)(GeneralTokenInfo);

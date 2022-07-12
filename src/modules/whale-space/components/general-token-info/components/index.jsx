import React, { Fragment, useEffect, useState, useRef, useCallback } from 'react';
import { connect } from "react-redux";


import "./style.scss";
import { WhaleSpaceActions } from "../../../redux/actions";

function GeneralTokenInfo(props) {
  const { WhaleSpace } = props
  console.log('general', WhaleSpace)
  useEffect(() => {
    props.getTokenGeneral('trava', 'bsc')
  }, [])

  // const [tokenGeneral, setTokenGeneral] = useState([])
  // console.log(tokenGeneral)
  let general = {
    "_id": "0x38_0x0391be54e72f7e001f6bbc331777710b4f2999ef",
    "chain_name": "bsc",
    "circulating_supply": 692852995.39645,
    "id_coingecko": "trava-finance",
    "symbol": "trava",
    "total_supply": 5000000000,
    "total_holders": 5789,
    "image": "https://assets.coingecko.com/coins/images/17553/large/TRAVA_OFFICIAL_LOGO.png?1628509820",
    "market_cap": 310274,
    "name": "Trava Finance",
    "price": 0.0004478
  }
  if (WhaleSpace?.tokenGeneral) {
    general = WhaleSpace.tokenGeneral
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
  const { WhaleSpace } = state;
  return { WhaleSpace };
}
const actions = {
  getTokenGeneral: WhaleSpaceActions.getTokenGeneral
};
export default connect(mapState, actions)(GeneralTokenInfo);

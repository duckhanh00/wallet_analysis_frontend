import React, { Fragment } from "react";
import { connect } from "react-redux";
import Chart from "react-apexcharts";
import {Line, Bar, Pie } from 'react-chartjs-2';

import "./style.scss";

function GeneralTokenInfo(props) {
  return (
    <Fragment>
      <div className="coin-container">
        <div className="coin-left">
          <h1 className="coin-name">
            <img
              src={require("../../../../../assets/images/bitcoin.png")}
              alt="Logo"
            />
            <span>Bitcoin</span>
            <div className="coin-logo">BTC</div>
          </h1>
          <ul className="list-desc">
            <li className="desc-item">Chain name: ETH</li>
          </ul>
        </div>

        <div className="coin-right">
          <span className="coin-desc">Price Bitcoin (BTC)</span>
          <div className="coin-price">
            <h1>40,000.122 USD</h1>
            <div className="coin-up">&#x25B2; 0.81%</div>
          </div>

          <div className="market">
            <div className="market__item">
              <div className="coin-desc">Market cap</div>
              <div className="market__price">1,000,070,604.451 USD</div>
              <span>1.38%</span>
            </div>
            <div className="market__item">
              <div className="coin-desc">
                Fully Diluted Market Cap
              </div>
              <div className="market__price">2,000,070,604.451 USD</div>
              <span>1.38%</span>
            </div>
            <div className="market__item">
              <div className="coin-desc">
                {/* Khối lượng <span className="desc-item">24 giờ</span> */}
                Circulating Supply
              </div>
              <div className="market__price">1,500,000,000.0</div>
              <span>75.00%</span>
              <div className="coin-desc">Total supply</div>
              <div className="market__price">2,000,000,000.0</div>
            </div>
            <div className="market__item">
              <div className="coin-desc">Total holders</div>
              <div className="market__price">214,232 holders</div>
            </div>
          </div>
        </div>
      </div>

    </Fragment>
  );
}

function mapState(state) {
  const { GeneralTokenInfo } = state;
  return { GeneralTokenInfo };
}
const actions = {};

export default connect(mapState, actions)(GeneralTokenInfo);

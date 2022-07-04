// import React, { Fragment, useEffect, useState } from "react";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import TopHoldersList from '../../top-holders-list/components/index.jsx'

import "./style.scss";

function MarketCapChart(props) {
  let options = {
    chart: {
        type: 'area',
        backgroundColor: "#17171a",
    },
    title: {
        text: 'Number of holder in about 10% circulating supply ',
        style: { color: "#a1a7bb", fontSize: "18px" }
    },
    credits: {
        enabled: false
      },
    subtitle: {
        text: 'Sort by total balance'
    },
    xAxis: {
        categories: [],
        title: {
            enabled: false
        }
    },
    yAxis: {
        // min: 0,
        title: {
          text: null,
        },
        style: {
          color: "#a1a7bb",
        },
        tickAmount: 7,
        gridLineColor: "#323546",
        labels: {
          style: {
            color: "#a1a7ac",
          },
        },
      },
    tooltip: {
        split: true
    },
    plotOptions: {
        area: {
            stacking: 'normal',
            lineColor: '#666666',
            lineWidth: 1,
            marker: {
                lineWidth: 1,
                lineColor: '#666666'
            }
        }
    },
    series: [{
        name: 'Number of holders',
        data: [2768, 260, 177, 1, 21, 61, 43]
    }]
};

  const t = [2768, 260, 177, 1, 21, 61, 43]
  const t1 = [2734, 315, 145, 36]
  const t2 = [3278, 41, 7, 3, 1, 1]
  const t3 = [3199, 28, 3]


  return (
    <Fragment>
      <div className="block-in-page">
        <div className="action__chart">
          <div className="action__1">
          </div>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
      </div>
    </Fragment>
  );
}

function mapState(state) {
  const { WalletType } = state;
  return { WalletType };
}
const actions = {};

export default connect(mapState, actions)(MarketCapChart);

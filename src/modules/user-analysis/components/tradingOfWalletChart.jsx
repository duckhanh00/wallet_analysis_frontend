import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {
    Grid,
    Card,
    Button,
    Box,
} from '@material-ui/core';

import { UserAnalysisActions } from '../redux/actions'

function TradingOfWalletChart(props) {
    const { userAnalysis } = props
    const [rangeTime, setRangeTime] = useState("30d")

    useEffect(() => {
        props.getTradingOfWallet({
            range_time: rangeTime,
        })
    }, [])

    useEffect(() => {
        props.getTradingOfWallet({
            range_time: rangeTime,
        })
    }, [rangeTime])

    const handleRangeTime = (_rangeTime) => {
        setRangeTime(_rangeTime)
    }

    let sellOnSales = {}
    let buyOnSales = {}
    let tradingVolumeLogs = {}

    if (userAnalysis?.tradingOfWallet) {
        sellOnSales = userAnalysis.tradingOfWallet.sellOnSale
        buyOnSales = userAnalysis.tradingOfWallet.buyOnSale
        tradingVolumeLogs = userAnalysis.tradingOfWallet.tradingVolumeLogs
    }

    let sellOnSaleDataCharts = []
    let buyOnSaleDataCharts = []
    let tradingVolumeLogDataCharts = []

    for (const timestamp in sellOnSales) {
        sellOnSaleDataCharts.push({
            x: parseInt(timestamp) * 1000,
            y: sellOnSales[timestamp]
        })
    }
    for (const timestamp in buyOnSales) {
        buyOnSaleDataCharts.push({
            x: parseInt(timestamp) * 1000,
            y: buyOnSales[timestamp]
        })
    }
    for (const timestamp in tradingVolumeLogs) {
        tradingVolumeLogDataCharts.push({
            x: parseInt(timestamp) * 1000,
            y: tradingVolumeLogs[timestamp]
        })
    }

    let options = {
        chart: {
            zoomType: 'x'
        },
        credits: {
            enabled: false
        },
        title: {
            text: '',
            align: "left"
        },

        yAxis: [{
            title: {
                text: 'Volume'
            }
        }],

        xAxis: {
            type: 'datetime'
        },


        series: [{
            name: 'Sell on Sale',
            type: "column",
            yAxis: 0,
            data: sellOnSaleDataCharts
        }, {
            name: 'Buy on Sale',
            type: "column",
            yAxis: 0,
            data: buyOnSaleDataCharts
        }, {
            name: 'Trading Volume',
            yAxis: 0,
            data: tradingVolumeLogDataCharts
        }],

        legend: {
            layout: 'horizontal',
            align: 'left',
            verticalAlign: 'top',
            padding: 0,
            itemMarginBottom: 20
        }
    }

    let rangeTimes = {
        "7d": '7d',
        "30d": '30d',
        "3m": '3m',
    }

    return (
        <Fragment>
            <Grid item xs={12}>
                <Card className="card-box mb-4" style={{ padding: '10px' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }} style={{ padding: "0px 1%" }}>
                        <h4>Trading Of Wallet</h4>
                        <div aria-label="button group">
                            <Button
                                color="primary"
                                variant={rangeTime == rangeTimes['7d'] ? "contained" : "text"}
                                onClick={() => handleRangeTime(rangeTimes['7d'])}
                            >
                                {rangeTimes['7d'].toUpperCase()}
                            </Button>
                            <Button
                                color="primary"
                                variant={rangeTime == rangeTimes['30d'] ? "contained" : "text"}
                                onClick={() => handleRangeTime(rangeTimes['30d'])}
                            >
                                {rangeTimes['30d'].toUpperCase()}
                            </Button>
                            <Button
                                color="primary"
                                variant={rangeTime == rangeTimes['3m'] ? "contained" : "text"}
                                onClick={() => handleRangeTime(rangeTimes['3m'])}
                            >
                                {rangeTimes['3m'].toUpperCase()}
                            </Button>
                        </div>
                    </Box>
                    <HighchartsReact highcharts={Highcharts} options={options} />
                </Card>
            </Grid>
        </Fragment>
    );
}

function mapState(state) {
    const { userAnalysis } = state;
    return { userAnalysis };
}
const actions = {
    getTradingOfWallet: UserAnalysisActions.getTradingOfWallet
};

export default connect(mapState, actions)(TradingOfWalletChart);

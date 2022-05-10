import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {
    Grid,
    ButtonGroup,
    Card,
    Button,
    Box,
    ListItem
} from '@material-ui/core';

import { OverviewDashboardActions } from '../redux/actions'

function NFTMarketCapAndTradingVolumeChart(props) {
    const { overviewDashboard } = props
    const [rangeTime, setRangeTime] = useState("24h")
    const [interval, setInterval] = useState("1h")

    useEffect(() => {
        props.getNftDashboardMarketCapVolume("trava_armoury", "bsc", {
            range_time: rangeTime,
            interval: interval
        })
    }, [])

    useEffect(() => {
        props.getNftDashboardMarketCapVolume("trava_armoury", "bsc", {
            range_time: rangeTime,
            interval: interval
        })
    }, [rangeTime, interval])

    const handleRangeTime = (_rangeTime) => {
        setRangeTime(_rangeTime)

        if (_rangeTime == "30d") {
            setInterval("24h")
        } else if (_rangeTime == "3m") {
            setInterval("7d")
        } else {
            setInterval("1h")
        }
    }

    let marketCapLogs = {}
    let tradingVolumeLogs = {}

    if (overviewDashboard?.marketCapAndVolume) {
        marketCapLogs = overviewDashboard.marketCapAndVolume.marketCapLogs
        tradingVolumeLogs = overviewDashboard.marketCapAndVolume.tradingVolumeLogs
    }

    let marketCapLogDataCharts = []
    let tradingVolumeLogDataCharts = []

    for (const timestamp in marketCapLogs) {
        marketCapLogDataCharts.push({
            x: parseInt(timestamp) * 1000,
            y: marketCapLogs[timestamp].marketCap
        })
    }
    for (const timestamp in tradingVolumeLogs) {
        tradingVolumeLogDataCharts.push({
            x: parseInt(timestamp) * 1000,
            y: tradingVolumeLogs[timestamp].volume
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
                text: 'Market Cap'
            }
        },
        {
            title: {
                text: "Trading Volume"
            },
            opposite: true
        }
        ],

        xAxis: {
            type: 'datetime'
        },

        plotOptions: {
            spline: {
                pointStart: 1940,
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },

        series: [{
            name: 'Market Cap',
            type: "column",
            yAxis: 0,
            data: marketCapLogDataCharts
        }, {
            name: 'Volume',
            yAxis: 1,
            type: "spline",
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
        "24h": '24h',
        "7d": '7d',
        "30d": '30d',
        "3m": '3m',
    }

    return (
        <Fragment>
            <Grid item xs={12}>
                <Card className="card-box mb-4" style={{ padding: '10px' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }} style={{ padding: "0px 1%" }}>
                        <h4>Market Cap {"&"} Volume</h4>
                        <div aria-label="button group">
                            <Button
                                color="primary"
                                variant={rangeTime == rangeTimes['24h'] ? "contained" : "text"}
                                onClick={() => handleRangeTime(rangeTimes['24h'])}
                            >
                                {rangeTimes['24h'].toUpperCase()}
                            </Button>
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
    const { overviewDashboard } = state;
    return { overviewDashboard };
}
const actions = {
    getNftDashboardMarketCapVolume: OverviewDashboardActions.getNftDashboardMarketCapVolume
};

export default connect(mapState, actions)(NFTMarketCapAndTradingVolumeChart);

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

function KnightStakingChart(props) {
    const { overviewDashboard } = props
    const [rangeTime, setRangeTime] = useState("24h")
    const [interval, setInterval] = useState("1h")

    useEffect(() => {
        props.getNftDashboardStaking("trava_knight", "bsc", {
            range_time: rangeTime,
            interval: interval
        })
    }, [])

    useEffect(() => {
        props.getNftDashboardStaking("trava_knight", "bsc", {
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

    let allVault = []
    let coppers = []
    let silvers = []
    let golds = []
    let diamonds = []
    let crystals = []

    let staking = overviewDashboard?.staking
    if (staking) {
        for (const timestamp in staking) {
            allVault.push({
                x: parseInt(timestamp) * 1000,
                y: staking[timestamp].all?.nftCount
            })
            coppers.push({
                x: parseInt(timestamp) * 1000,
                y: staking[timestamp].copper?.nftCount
            })
            silvers.push({
                x: parseInt(timestamp) * 1000,
                y: staking[timestamp].silver?.nftCount
            })
            golds.push({
                x: parseInt(timestamp) * 1000,
                y: staking[timestamp].gold?.nftCount
            })
            diamonds.push({
                x: parseInt(timestamp) * 1000,
                y: staking[timestamp].diamond?.nftCount
            })
            crystals.push({
                x: parseInt(timestamp) * 1000,
                y: staking[timestamp].crystal?.nftCount
            })
        }
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
                text: 'Price'
            }
        }],

        xAxis: {
            type: 'datetime'
        },
        plotOptions: {
            line: {
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
            name: 'Copper',
            yAxis: 0,
            data: coppers
        }, {
            name: 'Silver',
            yAxis: 0,
            data: silvers
        }, {
            name: 'Gold',
            yAxis: 0,
            data: golds
        }, {
            name: 'Diamond',
            yAxis: 0,
            data: diamonds
        }, {
            name: 'Crystal',
            yAxis: 0,
            data: crystals
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
                        <h4>Knight Staking</h4>
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
    getNftDashboardStaking: OverviewDashboardActions.getNftDashboardStaking
};

export default connect(mapState, actions)(KnightStakingChart);

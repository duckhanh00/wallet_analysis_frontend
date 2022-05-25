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
require("highcharts/modules/exporting")(Highcharts);
require("highcharts/highcharts-more")(Highcharts);

function BumbleChart(props) {
    const { overviewDashboard } = props

    useEffect(() => {
        props.getWalletType("trava", "bsc")
    }, [])

    let nodes = []
    if (overviewDashboard?.walletType) {
        nodes = overviewDashboard.walletType
    }
    
    let options = { 
        chart: {
            type: 'packedbubble',
            height: '60%'
        },
        title: {
            text: 'Wallet type (2022)'
        },
        tooltip: {
            useHTML: true,
            pointFormat: '<b>{point.name}</b> <div><b>Balance:</b> {point.value} USD</div> <b>Number of transactions:</b> {point.number_of_txs}'
        },
        plotOptions: {
            packedbubble: {
                minSize: '10%',
                maxSize: '100%',
                zMin: 0,
                zMax: 200000000,
                layoutAlgorithm: {
                    gravitationalConstant: 0.05,
                    splitSeries: true,
                    seriesInteraction: false,
                    dragBetweenSeries: true,
                    parentNodeLimit: true
                }
                // dataLabels: {
                //     enabled: false,
                //     format: '{point.name}',
                //     filter: {
                //         property: 'y',
                //         operator: '>',
                //         value: 10000
                //     },
                //     style: {
                //         color: 'black',
                //         textOutline: 'none',
                //         fontWeight: 'normal'
                //     }
                // }
            }
        },
        series: nodes
}

    return (
        <Fragment>
            <Grid item xs={12}>
                <Card className="card-box mb-4" style={{ padding: '10px' }}>
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
    getWalletType: OverviewDashboardActions.getWalletType
};

export default connect(mapState, actions)(BumbleChart);

import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {
    Card,
    Button,
    Box,
} from '@material-ui/core';

import { UserAnalysisActions } from '../redux/actions'

function KnightHoldingChart(props) {
    const { userAnalysis } = props
    const [typeChartData, setTypeChartData] = useState('NFTs')

    useEffect(() => {
        props.getHoldingKnightDistribution("bsc")
    }, [])

    const handleTypeChartData = (type) => {
        setTypeChartData(type)
    }

    let hodingKnightDistribution = userAnalysis?.hodingKnightDistribution
    let copper = 0, silver = 0, gold = 0, diamond = 0, crystal = 0, stake = 0
    let maxValue = 0

    if (hodingKnightDistribution?.copper) {
        if (typeChartData === "values") {
            copper = hodingKnightDistribution.copper.value
        } else {
            copper = hodingKnightDistribution.copper.count
        }
        maxValue = Math.max(maxValue, copper)
    }
    if (hodingKnightDistribution?.silver) {
        if (typeChartData === "values") {
            silver = hodingKnightDistribution.silver.value
        } else {
            silver = hodingKnightDistribution.silver.count
        }
        maxValue = Math.max(maxValue, silver)
    }
    if (hodingKnightDistribution?.gold) {
        if (typeChartData === "values") {
            gold = hodingKnightDistribution.gold.value
        } else {
            gold = hodingKnightDistribution.gold.count
        }
        maxValue = Math.max(maxValue, gold)
    }
    if (hodingKnightDistribution?.diamond) {
        if (typeChartData === "values") {
            diamond = hodingKnightDistribution.diamond.value
        } else {
            diamond = hodingKnightDistribution.diamond.count
        }
        maxValue = Math.max(maxValue, diamond)
    }
    if (hodingKnightDistribution?.crystal) {
        if (typeChartData === "values") {
            crystal = hodingKnightDistribution.crystal.value
        } else {
            crystal = hodingKnightDistribution.crystal.count
        }
        maxValue = Math.max(maxValue, crystal)
    }
    if (hodingKnightDistribution?.stake) {
        if (typeChartData === "values") {
            stake = hodingKnightDistribution.stake.value
        } else {
            stake = hodingKnightDistribution.stake.count
        }
        maxValue = Math.max(maxValue, stake)
    }

    let options = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        credits: {
            enabled: false
        },
        title: {
            text: '',
            align: "left"
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.y} ({point.percentage:.1f}%)</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.y}'
                }
            }
        },
        series: [{
            name: typeChartData === 'values' ? 'Value' : 'NFTs',
            colorByPoint: true,
            data: [{
                name: 'Copper',
                y: copper,
                sliced: maxValue == copper,
            }, {
                name: 'Silver',
                y: silver,
                sliced: maxValue == silver,
            }, {
                name: 'Gold',
                y: gold,
                sliced: maxValue == gold,
            }, {
                name: 'Diamond',
                y: diamond,
                sliced: maxValue == diamond,
            }, {
                name: 'Crystal',
                y: crystal,
                sliced: maxValue == crystal,
            },{
                name: 'Stake',
                y: stake,
                sliced: maxValue == stake,
            }]
        }]
    }

    return (
        <Fragment>
            <Card className="card-box mb-4" style={{ padding: '10px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }} style={{ padding: "0px 1%" }}>
                    <h4>Holding Knight</h4>
                    {/* <div aria-label="button group">
                        <Button
                            color="primary"
                            variant={typeChartData == 'values' ? "contained" : "text"}
                            onClick={() => handleTypeChartData('values')}
                        >
                            Values
                        </Button>
                        <Button
                            color="primary"
                            variant={typeChartData == 'NFTs' ? "contained" : "text"}
                            onClick={() => handleTypeChartData('NFTs')}
                        >
                            NFTs
                        </Button>
                    </div> */}
                </Box>
                {hodingKnightDistribution 
                    ? <HighchartsReact highcharts={Highcharts} options={options} />
                    : <div style={{ padding: "0px 1%" }}>Loading data ...</div> 
                }
                
            </Card>
        </Fragment>
    );
}

function mapState(state) {
    const { userAnalysis } = state;
    return { userAnalysis };
}
const actions = {
    getHoldingKnightDistribution: UserAnalysisActions.getHoldingKnightDistribution
};

export default connect(mapState, actions)(KnightHoldingChart);

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

function ArmouryHoldingChart(props) {
    const { userAnalysis } = props
    const [typeChartData, setTypeChartData] = useState('NFTs')

    useEffect(() => {
        props.getHoldingArmouryDistribution("bsc")
    }, [])

    const handleTypeChartData = (type) => {
        setTypeChartData(type)
    }

    let hodingArmouryDistribution = userAnalysis?.hodingArmouryDistribution
    let copper = 0, silver = 0, gold = 0, diamond = 0, crystal = 0, sale = 0
    let maxValue = 0

    if (hodingArmouryDistribution?.copper) {
        if (typeChartData === "values") {
            copper = hodingArmouryDistribution.copper.value
        } else {
            copper = hodingArmouryDistribution.copper.count
        }
        maxValue = Math.max(maxValue, copper)
    }
    if (hodingArmouryDistribution?.silver) {
        if (typeChartData === "values") {
            silver = hodingArmouryDistribution.silver.value
        } else {
            silver = hodingArmouryDistribution.silver.count
        }
        maxValue = Math.max(maxValue, silver)
    }
    if (hodingArmouryDistribution?.gold) {
        if (typeChartData === "values") {
            gold = hodingArmouryDistribution.gold.value
        } else {
            gold = hodingArmouryDistribution.gold.count
        }
        maxValue = Math.max(maxValue, gold)
    }
    if (hodingArmouryDistribution?.diamond) {
        if (typeChartData === "values") {
            diamond = hodingArmouryDistribution.diamond.value
        } else {
            diamond = hodingArmouryDistribution.diamond.count
        }
        maxValue = Math.max(maxValue, diamond)
    }
    if (hodingArmouryDistribution?.crystal) {
        if (typeChartData === "values") {
            crystal = hodingArmouryDistribution.crystal.value
        } else {
            crystal = hodingArmouryDistribution.crystal.count
        }
        maxValue = Math.max(maxValue, crystal)
    }
    if (hodingArmouryDistribution?.sale) {
        if (typeChartData === "values") {
            sale = hodingArmouryDistribution.sale.value
        } else {
            sale = hodingArmouryDistribution.sale.count
        }
        maxValue = Math.max(maxValue, sale)
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
                name: 'Sale',
                y: sale,
                sliced: maxValue == sale,
            }]
        }]
    }

    return (
        <Fragment>
            <Card className="card-box mb-4" style={{ padding: '10px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }} style={{ padding: "0px 1%" }}>
                    <h4>Holding Armoury</h4>
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
                {hodingArmouryDistribution 
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
    getHoldingArmouryDistribution: UserAnalysisActions.getHoldingArmouryDistribution
};

export default connect(mapState, actions)(ArmouryHoldingChart);

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

import data_7_days from './tokenAllocationData/data_7_days.json'
import data_30_days from './tokenAllocationData/data_30_days.json'
import data_90_days from './tokenAllocationData/data_90_days.json'


function TokenAllocationChart(props) {
    const [rangeTime, setRangeTime] = useState('7d')
    const [data, setData] = useState([])
    useEffect(() => {
        if(rangeTime == '7d') {
            setData(data_7_days) 
        }
        else if (rangeTime == '1m') {
            setData(data_30_days)
        }
        else {
            setData(data_90_days)
        }
    }, [rangeTime]);

    const handleRangeTime = (_rangeTime) => {
        setRangeTime(_rangeTime)
    }

    const [typeChart, setTypeChart] = useState("column")
    const handleType = (type) => {
        if (type == "column") {
            setTypeChart(type)
        }
        else {
            setTypeChart("line")
        }
    }
    let options = {
        chart: {
            type: typeChart
        },
        title: {
            text: 'Token ownership allocation'
        },
        xAxis: {
            categories: data["label"]
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Percent ownership'
            }
        },
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> <br/>',
            shared: true
        },
        plotOptions: {
            column: {
                stacking: 'percent'
            }
        },
        series: data["series"]
    }

    let rangeTimes = {
        "7d": '7d',
        "1m": '1m',
        "3m": '3m',
    }

    return (
        <Fragment>
            <Grid item xs={12}>
                <Card className="card-box mb-4" style={{ padding: '10px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }} style={{ padding: "0px 1%" }}>
                            <Button
                                color="primary"
                                variant={typeChart == "column" ? "contained" : "text"}
                                onClick={() => handleType("column")}
                            >
                                column
                            </Button>
                            <Button
                                color="primary"
                                variant={typeChart == "line" ? "contained" : "text"}
                                onClick={() => handleType("line")}
                            >
                                line
                            </Button>
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
                                variant={rangeTime == rangeTimes['1m'] ? "contained" : "text"}
                                onClick={() => handleRangeTime(rangeTimes['1m'])}
                            >
                                 {rangeTimes['1m'].toUpperCase()}
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
    const { WalletType } = state;
    return { WalletType };
}
const actions = {
    // getCloseRelationEdges: RelationGraphActions.getCloseRelationEdges,
    // getCloseRelationNodes: RelationGraphActions.getCloseRelationNodes
};

export default connect(mapState, actions)(TokenAllocationChart);
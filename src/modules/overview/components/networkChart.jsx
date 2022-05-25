import React, { Fragment, useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import Highcharts from "highcharts/highstock";
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
import { CodeSharp } from '@material-ui/icons';
require("highcharts/modules/networkgraph")(Highcharts);
require("highcharts/modules/exporting")(Highcharts);
require("highcharts/modules/export-data")(Highcharts);
require("highcharts/highcharts-more")(Highcharts);
require('highcharts/modules/map')(Highcharts)

function NetworkChart(props) {
    const { overviewDashboard } = props
    useEffect(() => {
        props.getCloseRelationEdges('trava', 'bsc')
        props.getCloseRelationNodes('trava', 'bsc')
    }, [])

    let edges = []
    if (overviewDashboard?.closeRelationEdges) {
        edges = overviewDashboard.closeRelationEdges
    }

    let data_nodes = {}
    if (overviewDashboard?.closeRelationNodes) {
        data_nodes = overviewDashboard.closeRelationNodes
    }
    if (data_nodes){
    Highcharts.addEvent(
        Highcharts.Series,
        'afterSetOptions',
        function (e) {
            var colors = Highcharts.getOptions().colors,
                i = 1,
                nodes = {};
    
            if (
                this instanceof Highcharts.seriesTypes.networkgraph &&
                e.options.id === 'lang-tree'
            ) {
                e.options.data.forEach(function (link) {
                    i++;
                    if (i > 5){
                        i=1
                    }
                    if (data_nodes[link[0]] && data_nodes[link[1]]){
                    nodes[link[0]] = {
                        id: link[0],
                        marker: {
                            radius: data_nodes[link[0]]['wallet_balance']*0.000001
                        },
                        color: colors[0]
                    }
                    nodes[link[1]] = {
                        id: link[0],
                        marker: {
                            radius: data_nodes[link[1]]['wallet_balance']*0.000001
                        },
                        color: colors[1]
                    }
                }
                });
    
                e.options.nodes = Object.keys(nodes).map(function (id) {
                    return nodes[id];
                });
            }
        }
    );
    }
    
    let options = {
        chart: {
            events: {
				load: function(){
					this.myTooltip = new Highcharts.Tooltip(this, this.options.tooltip);                    
				 }
			 },
            type: 'networkgraph',
            height: '600px'
        },
        mapNavigation: {
            enabled: true,
            buttonOptions: {
              alignTo: "spacingBox"
            }
          },
        title: {
            text: 'Close Relation Wallet'
        },
        // subtitle: {
        //     text: 'A Force-Directed Network Graph in Highcharts'
        // },
        // tooltip: {
        //     useHTML: true,
        //     pointFormat: 'hello'
        // },
        plotOptions: {
            networkgraph: {
                layoutAlgorithm: {
                    enableSimulation: true,
                    gravitationalConstant: 1, 
                    friction: -0.9
                }
            }
        },
        series: [{
            accessibility: {
                enabled: false
            },
            dataLabels: {
                enabled: false,
                linkFormat: 'hello',
                pointFormat: "hello"            
            },
            id: 'lang-tree',
            data: edges,
            events: {
                click: function(e) {
                  console.log(e.point.id, 'wallet percent', data_nodes[e.point.id]['wallet_percent'], 'wallet rank', data_nodes[e.point.id]['wallet_rank'], 'rank balance', data_nodes[e.point.id]['cluster_balance'], 'cluster rank', data_nodes[e.point.id]['cluster_rank']);
              }
            }
        }]
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
    getCloseRelationEdges: OverviewDashboardActions.getCloseRelationEdges,
    getCloseRelationNodes: OverviewDashboardActions.getCloseRelationNodes
};

export default connect(mapState, actions)(NetworkChart);

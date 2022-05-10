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
require("highcharts/modules/networkgraph")(Highcharts);
require("highcharts/modules/exporting")(Highcharts);
require("highcharts/modules/export-data")(Highcharts);

function NetworkChart(props) {
    const { overviewDashboard } = props
    const [rangeTime, setRangeTime] = useState("24h")
    const [interval, setInterval] = useState("1h")

    useEffect(() => {
        props.getNftDashboardHolder("trava_armoury", "bsc", {
            range_time: rangeTime,
            interval: interval
        })
    }, [])

    useEffect(() => {
        props.getNftDashboardHolder("trava_armoury", "bsc", {
            range_time: rangeTime,
            interval: interval
        })
    }, [rangeTime, interval])

    const handleRangeTime = (_rangeTime) => {
        setRangeTime(_rangeTime)

        if (_rangeTime == "24h") {
            setInterval("1h")
        } else {
            setInterval("24h")
        }
    }

    let holderDataCharts = []
    let holders = overviewDashboard?.holder
    if (holders) {
        for (const timestamp in holders) {
            holderDataCharts.push({
                x: parseInt(timestamp) * 1000,
                y: holders[timestamp]
            })
        }
    }

    let options = {
        chart: {
            type: "networkgraph",
            height: "100%"
          },
          title: {
            text: "The Route Map"
          },
          credits: {
            enabled: false
          },
          plotOptions: {
            networkgraph: {
              keys: ["from", "to"],
              layoutAlgorithm: {
                enableSimulation: true,
                friction: -0.9
              }
            }
          },
        series: [{
            events: {},
            marker: {
              radius: 20
            },
            dataLabels: {
              enabled: true,
              linkFormat: "",
              allowOverlap: true
            },
            id: "lang-tree",
            data: [
                ['Proto Indo-European', 'Balto-Slavic']
                // ['Proto Indo-European', 'Germanic'],
                // ['Proto Indo-European', 'Celtic'],
                // ['Proto Indo-European', 'Italic'],
                // ['Proto Indo-European', 'Hellenic'],
                // ['Proto Indo-European', 'Anatolian'],
                // ['Proto Indo-European', 'Indo-Iranian'],
                // ['Proto Indo-European', 'Tocharian'],
                // ['Indo-Iranian', 'Dardic'],
                // ['Indo-Iranian', 'Indic'],
                // ['Indo-Iranian', 'Iranian'],
                // ['Iranian', 'Old Persian'],
                // ['Old Persian', 'Middle Persian'],
                // ['Indic', 'Sanskrit'],
                // ['Italic', 'Osco-Umbrian'],
                // ['Italic', 'Latino-Faliscan'],
                // ['Latino-Faliscan', 'Latin'],
                // ['Celtic', 'Brythonic'],
                // ['Celtic', 'Goidelic'],
                // ['Germanic', 'North Germanic'],
                // ['Germanic', 'West Germanic'],
                // ['Germanic', 'East Germanic'],
                // ['North Germanic', 'Old Norse'],
                // ['North Germanic', 'Old Swedish'],
                // ['North Germanic', 'Old Danish'],
                // ['West Germanic', 'Old English'],
                // ['West Germanic', 'Old Frisian'],
                // ['West Germanic', 'Old Dutch'],
                // ['West Germanic', 'Old Low German'],
                // ['West Germanic', 'Old High German'],
                // ['Old Norse', 'Old Icelandic'],
                // ['Old Norse', 'Old Norwegian'],
                // ['Old Norwegian', 'Middle Norwegian'],
                // ['Old Swedish', 'Middle Swedish'],
                // ['Old Danish', 'Middle Danish'],
                // ['Old English', 'Middle English'],
                // ['Old Dutch', 'Middle Dutch'],
                // ['Old Low German', 'Middle Low German'],
                // ['Old High German', 'Middle High German'],
                // ['Balto-Slavic', 'Baltic'],
                // ['Balto-Slavic', 'Slavic'],
                // ['Slavic', 'East Slavic'],
                // ['Slavic', 'West Slavic'],
                // ['Slavic', 'South Slavic'],
                // // Leaves:
                // ['Proto Indo-European', 'Phrygian'],
                // ['Proto Indo-European', 'Armenian'],
                // ['Proto Indo-European', 'Albanian'],
                // ['Proto Indo-European', 'Thracian'],
                // ['Tocharian', 'Tocharian A'],
                // ['Tocharian', 'Tocharian B'],
                // ['Anatolian', 'Hittite'],
                // ['Anatolian', 'Palaic'],
                // ['Anatolian', 'Luwic'],
                // ['Anatolian', 'Lydian'],
                // ['Iranian', 'Balochi'],
                // ['Iranian', 'Kurdish'],
                // ['Iranian', 'Pashto'],
                // ['Iranian', 'Sogdian'],
                // ['Old Persian', 'Pahlavi'],
                // ['Middle Persian', 'Persian'],
                // ['Hellenic', 'Greek'],
                // ['Dardic', 'Dard'],
                // ['Sanskrit', 'Sindhi'],
                // ['Sanskrit', 'Romani'],
                // ['Sanskrit', 'Urdu'],
                // ['Sanskrit', 'Hindi'],
                // ['Sanskrit', 'Bihari'],
                // ['Sanskrit', 'Assamese'],
                // ['Sanskrit', 'Bengali'],
                // ['Sanskrit', 'Marathi'],
                // ['Sanskrit', 'Gujarati'],
                // ['Sanskrit', 'Punjabi'],
                // ['Sanskrit', 'Sinhalese'],
                // ['Osco-Umbrian', 'Umbrian'],
                // ['Osco-Umbrian', 'Oscan'],
                // ['Latino-Faliscan', 'Faliscan'],
                // ['Latin', 'Portugese'],
                // ['Latin', 'Spanish'],
                // ['Latin', 'French'],
                // ['Latin', 'Romanian'],
                // ['Latin', 'Italian'],
                // ['Latin', 'Catalan'],
                // ['Latin', 'Franco-Provençal'],
                // ['Latin', 'Rhaeto-Romance'],
                // ['Brythonic', 'Welsh'],
                // ['Brythonic', 'Breton'],
                // ['Brythonic', 'Cornish'],
                // ['Brythonic', 'Cuymbric'],
                // ['Goidelic', 'Modern Irish'],
                // ['Goidelic', 'Scottish Gaelic'],
                // ['Goidelic', 'Manx'],
                // ['East Germanic', 'Gothic'],
                // ['Middle Low German', 'Low German'],
                // ['Middle High German', '(High) German'],
                // ['Middle High German', 'Yiddish'],
                // ['Middle English', 'English'],
                // ['Middle Dutch', 'Hollandic'],
                // ['Middle Dutch', 'Flemish'],
                // ['Middle Dutch', 'Dutch'],
                // ['Middle Dutch', 'Limburgish'],
                // ['Middle Dutch', 'Brabantian'],
                // ['Middle Dutch', 'Rhinelandic'],
                // ['Old Frisian', 'Frisian'],
                // ['Middle Danish', 'Danish'],
                // ['Middle Swedish', 'Swedish'],
                // ['Middle Norwegian', 'Norwegian'],
                // ['Old Norse', 'Faroese'],
                // ['Old Icelandic', 'Icelandic'],
                // ['Baltic', 'Old Prussian'],
                // ['Baltic', 'Lithuanian'],
                // ['Baltic', 'Latvian'],
                // ['West Slavic', 'Polish'],
                // ['West Slavic', 'Slovak'],
                // ['West Slavic', 'Czech'],
                // ['West Slavic', 'Wendish'],
                // ['East Slavic', 'Bulgarian'],
                // ['East Slavic', 'Old Church Slavonic'],
                // ['East Slavic', 'Macedonian'],
                // ['East Slavic', 'Serbo-Croatian'],
                // ['East Slavic', 'Slovene'],
                // ['South Slavic', 'Russian'],
                // ['South Slavic', 'Ukrainian'],
                // ['South Slavic', 'Belarusian'],
                // ['South Slavic', 'Rusyn']
            ]
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
                    <HighchartsReact ref={useRef()} highcharts={Highcharts} options={options} />
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
    getNftDashboardHolder: OverviewDashboardActions.getNftDashboardHolder
};

export default connect(mapState, actions)(NetworkChart);

import React, { Fragment, useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import CirclePackChart from "circlepack-chart";
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

import * as d3 from "d3";
import {
    Grid,
    ButtonGroup,
    Card,
    Button,
    Box,
    ListItem
} from '@material-ui/core';
import './walletClassificationStyle.scss'

import demoData from './walletClassificationData/demoData.json'

function WalletClassificationChart(props) {
    const [rangeTime, setRangeTime] = useState('7d')
    const [data, setData] = useState([])
    const fgRef = useRef();
    // useEffect(() => {
    //     const circlepack = new CirclePackChart();
    //     console.log("circlepack", circlepack)
    //     fgRef.current = circlepack
    // }, []);

    // useEffect(() => {
    //     const bloomPass = new UnrealBloomPass();
    //     bloomPass.strength = 1;
    //     bloomPass.radius = 1;
    //     bloomPass.threshold = 0.1;
    //     fgRef.current.postProcessingComposer().addPass(bloomPass);
    // }, []);

    useEffect(() => {
        const myChart = CirclePackChart();

        const colorNormalWallet = d3.scalePow(d3.schemeBuGn[9])
            .domain([1, 5])

        const colorTradingWallet = d3.scalePow(d3.schemeBuPu[9])
            .domain([1, 50])

        const colorLargeWallet = d3.scalePow(d3.schemeGnBu[9])
            .domain([1, 45])

        const colorSpecialWallet = d3.scalePow(d3.schemeOrRd[9])
            .domain([1, 45])

        fgRef.current = myChart
            .data(demoData)
            .color(d => {
                if (d.parent == "Trading Wallet") { return colorTradingWallet(d.value) }
                else if (d.parent == "Normal Wallet") { return colorNormalWallet(d.value) }
                else if (d.parent == "Large Wallet") { return colorLargeWallet(d.value) }
                else if (d.parent == "Special Wallet") { return colorSpecialWallet(d.value) }
            }
            )
            .width(900)
            .height(700)
            .padding(10)
            .showLabels(false)
            .onClick(node => { console.log(node, myChart.zoomToNode(node))})
            .minCircleRadius(1)
            .excludeRoot(true)
            .tooltipContent((d, node) => `Size: <i>${node.value}</i>`)
            (document.getElementById('chart'));

        console.log("myChart", myChart)
    }, [demoData, fgRef.current]);


    const [node_id, setSearchTerm] = useState("");
    const handleChange = e => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        const k = fgRef.current.data()
        console.log(k['children'])
        let ee
        const o = k['children'].map(i => {
            i['children'].map(e => {
                if(e['name'] == '1001' && e['parent'] == 'Large Wallet') {
                    console.log(e)
                    ee = e 
                    return e
                }
            })
        })
        console.log(ee)
        fgRef.current.zoomToNode(ee)

    }

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

    let rangeTimes = {
        "7d": '7d',
        "1m": '1m',
        "3m": '3m',
    }


    return (
        <Fragment>
            <Grid item xs={12}>
                <div className='wallet-classification'>
                    <div id="chart"></div>
                </div>
                <div className="search__form">
                    <input
                        type="text"
                        placeholder="Search"
                        value={node_id}
                        onChange={handleChange} className="search__input" required />
                    <button onClick={handleSearch} className="search__btn-submit"></button>
                </div>
            </Grid>
        </Fragment>
        //     <div>
        //    <div id="chart"></div>
        //     </div>
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

export default connect(mapState, actions)(WalletClassificationChart);
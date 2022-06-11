import React, { Fragment, useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import CirclePackChart from "circlepack-chart";
import './style.scss'

import demoData from '../../walletClassificationData/demoData.json'

function WalletClassificationChart(props) {
    const [rangeTime, setRangeTime] = useState('7d')
    const [data, setData] = useState([])
    const fgRef = useRef();

    useEffect(() => {
        const myChart = CirclePackChart();

        const colorNormalWallet = "#00cccc"

        const colorTradingWallet = '#1491a5'

        const colorLargeWallet = '#3366ff'

        const colorSpecialWallet = '#6f42c1'

        fgRef.current = myChart
            .data(demoData)
            .onHover((type, wallet) => {
                if (wallet) {
                    return myChart.color(wallet, () => {
                        return "yellow"
                    })
                }
            })
            .color((wallet, fn) => {
                if (wallet.parent == "Trading Wallet") { return '#1491a5' }
                else if (wallet.parent == "Normal Wallet") { return "#00cccc" }
                else if (wallet.parent == "Large Wallet") { return '#3366ff' }
                else if (wallet.parent == "Special Wallet") { return '#6f42c1' }
            }
            )
            .onClick(wallet => {
                if (wallet) {
                    myChart.zoomToNode(wallet)
                }
                else {
                    myChart.zoomReset()
                }
            })
            .width(1000)
            .height(780)
            .padding(10)
            .showLabels(false)
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
                if (e['name'] == '1001' && e['parent'] == 'Large Wallet') {
                    console.log(e)
                    ee = e
                    return e
                }
            })
        })
        console.log(ee)
        fgRef.current.zoomToNode(ee)

    }

    const optionsTokenPercentWalletType = {
        chart: {
            backgroundColor: '#222531',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            height: 300,
            width: 300
        },
        title: {
            text: ''
        },
        tooltipContent: {
            text: ''
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            pie: {
                // allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    connectorColor: 'silver'
                }
            }
        },
        series: [{
            name: 'Percent',
            data: [
                { name: 'Normal wallet', y: 61.41, color: '#00cccc' },
                { name: 'Trading wallet', y: 11.84, color: '#1491a5' },
                { name: 'Large wallet', y: 10.85, color: '#3366ff' },
                { name: 'Special wallet', y: 4.67, color: '#6f42c1' }
            ]
        }]
    }

    const t = ['special-wallet', 'large-wallet', 'trading-wallet', 'normal-wallet']

    const optionsTokenPercentWallet = {
        chart: {
            backgroundColor: '#222531',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            height: 300,
            width: 300
        },
        title: {
            text: ''
        },
        tooltipContent: {
            text: ''
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            pie: {
                // allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    connectorColor: 'silver'
                },
                showInLegend: true,
                color: 'white',

            }
        },
        legend: {
            itemStyle: {
                color: '#7987a1'
            },
            itemHoverStyle: {
                color: "#ffffff"
            }        
        },
        series: [{
            name: 'Percent',
            data: [
                { name: 'BNB', y: 61.41, color: '#00cccc' },
                { name: 'ETH', y: 11.84, color: '#1491a5' },
                { name: 'FTM', y: 10.85, color: '#3366ff' },
                { name: 'TRAVA', y: 4.67, color: '#6f42c1' },
                { name: 'OTHER', y: 4.67, color: '#7987a1' }
            ]
        }]
    }

    const token_demo = [{'key':'Total assets (USD)',  'value':'7,123,123,124,234.00'}, {'key':'Token balance (USD)', 'value':'2,123,124.00'},{'key':'Token to circulating supply percent', 'value': '12.34%'}, {'key':'Token to total assets percent', 'value':'12.21%'}]

    return (
        <Fragment>
            <div className="action-wrapper">
                <div className='wallet-classification'>
                    <div id="chart"></div>
                </div>

                <div className="info">
                    <div className="search__form search-wallet-type">
                        <input
                            type="text"
                            placeholder="Search"
                            value={node_id}
                            onChange={handleChange} className="search__input" required />
                        <button onClick={handleSearch} className="search__btn-submit"></button>
                    </div>
                    <h5 className="token-percent-wallet-title">Token percent in wallet type</h5>

                    <div className="row">

                        <div className='col'>
                            <div className="token-percent-wallet-type">
                                <HighchartsReact highcharts={Highcharts} options={optionsTokenPercentWalletType} />
                            </div>
                        </div>

                        <div className='col'>
                            <div className="list-wallet-type">
                                {t.map(item => {
                                    console.log(item)
                                    return (
                                        <div className="line-wallet-type">
                                            <div className='line-wallet-title'>
                                                <span>Normal wallet</span>
                                                <span>
                                                    <strong>1,320,000,000,000.00</strong>
                                                    <span>&nbsp;(25%)</span>
                                                </span>
                                            </div>
                                            <div className="progress">
                                                <div className={`progress-bar ${item} wd-25p`} role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                    </div>
                    
                    <h5 className="token-percent-wallet-title">Top token in wallet</h5>

                    <div className="row">
                        
                        <div className='col'>
                            <div className="token-percent-wallet-type">
                                <HighchartsReact highcharts={Highcharts} options={optionsTokenPercentWallet} />
                            </div>
                        </div>

                        <div className="col">
                            <h6 className="wallet-address">Address: 0xbb4CdB9CBd36B01b...095c&nbsp;&nbsp;&nbsp;&nbsp;[][]</h6>
                            <div className="list-wallet-type">
                                {token_demo.map((item) => {
                                    return (
                                        <div className='line-wallet-title'>
                                        <span>{`${item.key}`}</span>
                                        <span>
                                            <strong>{`${item.value}`}</strong>
                                        </span>
                                    </div>
                                    )
                                })}
                                
                            </div>
                        </div>

                    </div>

                </div>

            </div>




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

export default connect(mapState, actions)(WalletClassificationChart);
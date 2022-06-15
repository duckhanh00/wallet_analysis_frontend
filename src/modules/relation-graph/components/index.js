
import React, { Fragment, useEffect, useState, useRef, useCallback } from 'react';
import ReactDOM from "react-dom";
import { connect } from 'react-redux';
import { ForceGraph3D } from "react-force-graph";
import * as d3 from "d3";
import { Dropdown } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import './style.scss'
import { RelationGraphActions } from '../redux/actions'
import data from './block.json'
import { filter } from 'd3';


function RelationGraph(props) {
    const { RelationGraph } = props
    useEffect(() => {
        props.getCloseRelationEdges('trava', 'bsc')
        props.getCloseRelationNodes('trava', 'bsc')
    }, [])

    let data_edges = []
    if (RelationGraph?.closeRelationEdges) {
        data_edges = RelationGraph.closeRelationEdges
    }

    let data_nodes = {}
    if (RelationGraph?.closeRelationNodes) {
        data_nodes = RelationGraph.closeRelationNodes
    }

    const fgRef = useRef();
    useEffect(() => {
        // forceRef.current.d3Force("collide", d3.forceCollide(13));
        fgRef.current.d3Force("charge").strength(-10);
        fgRef.current.d3Force("link").distance(50);
        // fgRef.current.d3Force("charge").distanceMax(200);
    }, []);

    useEffect(() => {
        const bloomPass = new UnrealBloomPass();
        bloomPass.strength = 1;
        bloomPass.radius = 1;
        bloomPass.threshold = 0.1;
        fgRef.current.postProcessingComposer().addPass(bloomPass);
    }, []);

    // real 
    // const [nodes, setNodes] = useState([])
    // useEffect(() => {
    //     setNodes(data_nodes);
    // }, [data_nodes]);

    // const [links, setLinks] = useState([])
    // useEffect(() => {
    //     setLinks(data_edges)
    // }, [data_edges]);


    // fake
    const [nodes, setNodes] = useState([])
    useEffect(() => {
        setNodes(data['nodes']);
    }, [data]);

    const [links, setLinks] = useState([])
    useEffect(() => {
        setLinks(data['links']);
    }, [data]);

    const [graphData, setGraphData] = useState()
    useEffect(() => {
        let data = { "nodes": nodes, "links": links }
        setGraphData(data)
    }, [nodes, links])

    const [node_id, setSearchTerm] = useState("");
    const handleChange = e => {
        setSearchTerm(e.target.value);
    };

    const handleClickNode = (node) => {
        d3.selectAll("#node-info-container").remove();
        // Aim at node from outside it
        const distance = 200;
        const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);
        fgRef.current.cameraPosition(
            { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
            node, // lookAt ({ x, y, z })
            3000 // ms transition duration
        );

        d3.select(".scene-container")
            .append("div")
            .attr("id", "node-info-container")
            .style("color", "white")
            .style("font-size", "24px")
            .style("position", "fixed")
            .style("top", "20%")
            .style("left", "150px")
            .style("transform", "translate(-50%, -50%)")
            .style("padding-top", "1rem")
            .style("padding-left", "1rem")
            .style("padding-bottom", "1rem")
            .style("border-radius", "10px")
            .style("background-color", "#031B4E")
            .style("line-height", "0.85")
            .style("width", "260px");

        d3.select("#node-info-container")
            .append("h3")
            .attr("id", "node-info-title")
            .style("color", "white")
            .style("margin-bottom", "1.5rem")
            .text(`Wallet`)

        d3.select("#node-info-container")
            .append("p")
            .attr("id", "node-info-name")
            .style("color", "#3388cc")
            .style("font-size", "15px")
            .text(`Address: ${node.id}`)

        d3.select("#node-info-container")
            .append("p")
            .attr("id", "node-info-name")
            .style("color", "white")
            .style("font-size", "15px")
            .text(`Wallet rank: #${node.wallet_rank+1}`)

        d3.select("#node-info-container")
            .append("p")
            .attr("id", "node-info-name")
            .style("color", "white")
            .style("font-size", "15px")
            .text(`Wallet balance: ${node.wallet_balance} TRAVA`)

        d3.select("#node-info-container")
            .append("p")
            .attr("id", "node-info-name")
            .style("color", "white")
            .style("font-size", "15px")
            .text(`Cluster rank: #${node.cluster_rank+1}`)

        d3.select("#node-info-container")
            .append("p")
            .attr("id", "node-info")
            .style("color", "white")
            .style("font-size", "15px")
            .text(`Cluster balance: ${node.cluster_balance} TRAVA`)
    }

    const handleSearch = () => {
        const result = nodes.filter(item =>
            item['id'].includes(node_id)
        );
        handleClickNode(result[0])
    }

    const [node_info, setNodeInfo] = useState("");
    const handleNodeInfo = (e) => {
        setNodeInfo(e.target.value)
    }

    const handleAddNode = () => {
        const _node = { "id": "tst", "user": node_info, "val": 20 }
        nodes.push(_node)
        setNodes([...nodes])
    }

    const handleIncreaseSize = () => {
        const updated_node = nodes
        updated_node.map((item) => {
            item["val"] = item["val"]*2  
        })

        setNodes([...updated_node])
    }

    const handleDecreaseSize = () => {
        const updated_node = nodes
        updated_node.map((item) => {
            item["val"] = item["val"]*0.5  
        })

        setNodes([...updated_node])
    }

    const [random, setRandom] = useState(1)
    const handleRandomColor = (item) => {
        if (0){
            console.log("!random")
            return "" 
        }
        else return item["nodeColor"]
    }


    return (
        <Fragment>
            <div className="relation-graph-container">
                <div>
                    <button className='button-giam' onClick={handleDecreaseSize}>Giam</button>
                    <button className='button-tang' onClick={handleIncreaseSize}>Tang</button>
                </div>
                <Dropdown className="relation-graph-menu">
                    <Dropdown.Toggle className="btn btn-outline-indigo btn-rounded button-wallet-list">
                        Wallet List
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <div className="wallet-list-title">
                            <h5>Wallet Address</h5>
                        </div>

                        <div className="dropdown-item">
                            <div className="preview-zone">
                                <div className="search search--icon">
                                    <div className="search__form">
                                        <input
                                            type="text"
                                            placeholder="Search"
                                            value={node_id}
                                            onChange={handleChange} className="search__input" required />
                                        <button onClick={handleSearch} className="search__btn-submit"></button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="dropdown-item">
                            <input
                                type="text"
                                placeholder="Address"
                                value={node_info}
                                onChange={handleNodeInfo}
                                className="dropdown-item"
                            />
                            <button onClick={handleAddNode}>
                                Add node
                            </button>
                        </div>

                        <button value={"1"} onClick={handleSearch} className="dropdown-item">
                            <i>1</i>
                        </button>
                        {/* {
                            
                            nodes.map(item => (
                            <button value={item["id"]} onClick={handleSearch} className="dropdown-item">
                                <i>{item["id"]}</i>
                            </button>
                        ))} */}

                        <Link to="/general-pages/signin" className="dropdown-item">
                            <i className="typcn typcn-power-outline"></i> Sign Out
                        </Link>
                    </Dropdown.Menu>

                </Dropdown>


                <ForceGraph3D
                    ref={fgRef}
                    graphData={{"nodes": nodes, "links": links}}
                    nodeLabel={node => `${node.id}: #${node.wallet_rank+1}`}
                    nodeAutoColorBy="cluster_rank"
                    // linkDirectionalParticles={1}
                    nodeThreeObjectExtend={true}
                    // nodeColor= {handleRandomColor(node)}
                    // nodeColor= {handleRandomColor(node)}
                    nodeVisibility={true}
                    nodeResolution={64}
                    // cooldownTicks={10} 
                    // nodeThreeObject={node => {
                    //     if (node.val % 6 == 0) {
                    //         node.val = 10
                    //         return node
                    //     } else {
                    //         return false
                    //     }
                    // }}
                    onNodeClick={handleClickNode}
                    backgroundColor="#07071b"
                />

            </div>
        </Fragment>

    );
}

function mapState(state) {
    const { RelationGraph } = state;
    return { RelationGraph };
}
const actions = {
    getCloseRelationEdges: RelationGraphActions.getCloseRelationEdges,
    getCloseRelationNodes: RelationGraphActions.getCloseRelationNodes
};

export default connect(mapState, actions)(RelationGraph);
import React, { Fragment, useEffect, useState, useRef, useCallback } from 'react';
import ReactDOM from "react-dom";
import { connect } from 'react-redux';
import { ForceGraph3D } from "react-force-graph";
import * as d3 from "d3";

import data from './block.json'
import { link } from 'd3';

function NetworkGraph(props) {
    const fgRef = useRef();
    useEffect(() => {
        // forceRef.current.d3Force("collide", d3.forceCollide(13));
        fgRef.current.d3Force("charge").strength(-10);
        fgRef.current.d3Force("link").distance(50);
        // fgRef.current.d3Force("charge").distanceMax(200);
    }, []);

    const [nodes, setNodes] = useState([])
    useEffect(() => {
        setNodes(data['nodes']);
    }, [data]);

    const [links, setLinks] = useState([])
    useEffect(() => {
        setLinks(data['links'])
    }, [data])

    const [graphData, setGraphData] = useState(data)
    useEffect(() => {
        let data = { "nodes": nodes, "links": links }
        setGraphData(data)
    }, [nodes, links])

    const [node_id, setSearchTerm] = useState("");
    const handleChange = e => {
        setSearchTerm(e.target.value);
    };

    const handleClickNode = (node) => {
        console.log(fgRef.current)
        d3.selectAll("#node-info-container").remove();
        // Aim at node from outside it
        const distance = 200;
        const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);
        console.log(d3.selectAll("#node-info-container"))
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
            .style("top", "10%")
            .style("left", "10%")
            .style("transform", "translate(-50%, -50%)")
            .style("padding", "10px")
            .style("border-radius", "10px")
            .style("background-color", "rgba(0,0,0,0.4)");

        d3.select("#node-info-container")
            .append("h3")
            .attr("id", "node-info-title")
            .style("color", "white")
            .style("text-align", "center")
            .text(`ID: ${node.id}`)

        d3.select("#node-info-container")
            .append("h3")
            .attr("id", "node-info-name")
            .style("color", "white")
            .style("text-align", "center")
            .text(`USER: ${node.user}`)

        d3.select("#node-info-container")
            .append("p")
            .attr("id", "node-info")
            .style("color", "white")
            .style("font-size", "20px")
            .style("text-align", "center")
            .style("position", "relative")
            .text(`DESCRIPTION: ${node.description}`);

        console.log(d3.selectAll("#node-info-container"))
    }

    const handleSearch = () => {
        const result = nodes.filter(item =>
            item['id'].includes(node_id)
        );
        handleClickNode(result)
    }

    const [node_info, setNodeInfo] = useState("");
    const handleNodeInfo = (e) => {
        setNodeInfo(e.target.value)
    }


    const handleAddNode = () => {
        const _node = { "id": "tst", "user": node_info, "val": 20 }
        nodes.push(_node)
        console.log(graphData)
        console.log(fgRef.current)
        console.log(fgRef.current.d3Force([]))
        setNodes([...nodes])
        // initForce(nodes, links)
    }



    return (
        <Fragment>
            <input
                type="text"
                placeholder="Search"
                value={node_id}
                onChange={handleChange}
            />
            <button onClick={handleSearch}>
                Search
            </button>

            <input
                type="text"
                placeholder="Search"
                value={node_info}
                onChange={handleNodeInfo}
            />
            <button onClick={handleAddNode}>
                Add node
            </button>


            <div>
                <ForceGraph3D
                    ref={fgRef}
                    graphData={graphData}
                    nodeLabel={node => `${node.user}: ${node.description}`}
                    nodeAutoColorBy="user"
                    linkDirectionalParticles={1}
                    nodeThreeObjectExtend={true}
                    nodeThreeObject={node => {
                        if (node.val % 6 == 0) {
                            node.val = 10
                            return node
                        } else {
                            return false
                        }
                    }}
                    onNodeClick={handleClickNode}
                />
            </div>
        </Fragment>

    );
}

function mapState(state) {
    const { } = state;
    return {};
}
const actions = {
};

export default connect(mapState, actions)(NetworkGraph);
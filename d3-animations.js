// set the dimensions and margins of the graph
const margin = {top: 50, right: 25, bottom: 45, left: 50},
      width = 700 - margin.left - margin.right,
      height = 420 - margin.top - margin.bottom;

// // append the svg object to the body of the page
// const svg = d3.select("#avicii_viz")
//     .append("svg")
//         .attr("width", width + margin.left + margin.right)
//         .attr("height", height + margin.top + margin.bottom)
//         .append("g")
//             .attr("transform", `translate(${margin.left},${margin.top})`);

// // set colours for plot
// const color_mapping = {
//     red: '#A6055D',
//     grey: '#777',
//     green: '#00C184'
// }

// // Add X axis
// const x = d3.scaleLinear()
//     .domain([0, 13])
//     .range([ 0, width ]);
              
// svg.append("g")
//     .attr("transform", `translate(0, ${height})`)
//     .attr("class", "Xaxis axis")
//     .style("opacity", 0)
//     .call(d3.axisBottom(x));

// // Add Y axis
// const y = d3.scaleLinear()
//     .domain([0, 2])
//     .range([ height, 0]);

// svg.append("g")
//     .attr("class", "Yaxis axis")
//     .style("opacity", 0)
//     .call(d3.axisLeft(y));

// // Add a scale for bubble size
// const z = d3.scaleLinear()
//     .domain([0, 1])
//     .range([ 1, 4]);
              
// var tooltip = d3.select("#avicii_viz")
//     .append("div")
//     .style("opacity", 0)
//     .attr("class", "tooltip")

// change tooltip text based on position in story
// function returnTooltipText(step, d){
    
//     switch (step){
//         case 'title':
//             return d.index + ": " + d.title
//             break;
//         case 'title score':
//             return d.index + ": " + d.title +
//                 " - sentiment score: " + d.score 
//             break;
//         case 'title score magnitude':
//             return d.index + ": " + d.title +
//                 " - sentiment score: " + d.score +
//                 " - magnitude: " + d.magnitude
//             break;
//     }             
    
// }
              
// // create 2 functions to show and hide the tooltip
// var showTooltip = function(d) {
//     tooltip
//         .transition()
//         .duration(200)
//     tooltip
//         .style("opacity", 1)
//         .html(returnTooltipText(toolTipState, d))
// }

// var hideTooltip = function(d) {
//     tooltip
//         .transition()
//         .duration(200)
//         .style("opacity", 0)
// }

// // add bubble chart
// const bubbleChart = svg.append('g')
//     .attr("class", "chart")
//     .selectAll("dot")
//     .data(data)
//         .join("circle")
//             .attr("class", "bubbles")
//             .attr("cx", d => x(d.index))
//             .attr("cy", d => y(1))
//             .attr("r", 10)
//             .style("fill", "#F2E8DC")
//             .attr("stroke", "white")
//         .on("mouseover", showTooltip )
//         .on("mouseleave", hideTooltip )      
              
// let bubbleRadius = 'pop'
// var xAxis = d3.axisBottom().scale(x);
// var yAxis = d3.axisLeft().scale(y);
    
// // various functions to update chart elements

// function dotColorGrey(){
//     bubbleChart
//         .data(data)
//         .transition()
//             .duration(1000)
//                 .attr("r", 10)  
//                 .style("fill", "#F2E8DC")
// }

// function dotColorSentiment(){
//     bubbleChart               
//         .data(data)
//         .transition()
//             .duration(1000)
//                 .attr("r", 10)  
//                 .style("fill", function(d){ 
//                 if (d.score > 0){
//                     return color_mapping.green
//                 } else if (d.score < 0){
//                     return color_mapping.red
//                 } else {
//                     return color_mapping.grey
//                 }
//     })
// }

// function dotResize(){
//     x.domain([0,13]);
    
//     svg.selectAll(".Xaxis")
//         .transition()
//         .duration(1000)
//             .call(xAxis);
                          
//     y.domain([0,2]);
    
//     svg.selectAll(".Yaxis")
//         .transition()
//         .duration(1000)
//             .call(yAxis);
                          
//     bubbleChart
//         .data(data)
//         .transition()
//         .duration(1000)
//             .attr("cx", d => x(d.index))
//             .attr("cy", d => y(1))
//             .attr("r", d => (d.magnitude*2.7));
    
// }

// function dotPositionScore(){
//     x.domain([-.8,.8]);
    
//     svg.selectAll(".Xaxis")
//         .transition()
//         .duration(1000)
//             .style("opacity", 1)
//             .call(xAxis);
                          
    
//     y.domain([0,2]);
    
//     svg.selectAll(".Yaxis")
//         .transition()
//         .duration(1000)
//             .call(yAxis);
                          
//     bubbleChart
//         .data(data)
//         .transition()
//         .duration(1000)
//             .attr("cx", d => x(d.score))
//             .attr("cy", d => y(1))
// }

// function dotPositionMagnitude(){
//     y.domain([1,d3.max(data, function(d) { return d.magnitude + 1 }) ]);
    
//     svg.selectAll(".Yaxis")
//         .transition()
//         .duration(1000)
//             .style("opacity", 1)
//             .call(yAxis);

//     bubbleChart
//         .data(data)
//         .transition()
//         .duration(1000)
//             .style("fill", function(d){ 
//                 if (d.score > 0){
//                     return color_mapping.green
//                 } else if (d.score < 0){
//                     return color_mapping.red
//                 } else {
//                     return color_mapping.grey
//                 }
//             })
//             .attr("r", d => (d.magnitude*2))
//             .attr("cy", d => y(d.magnitude))
// }

// function dotSimplify(){
//     bubbleChart
//         .data(data)
//         .transition()
//         .duration(1000)
//             .style("fill", "black")
//             .attr("r", 5)

// }

// function toggleAxesOpacity(toggleX, toggleY, opacity){
//     if(toggleX){
//         svg.selectAll(".Xaxis")
//             .transition()
//             .duration(1000)
//                 .style("opacity", opacity)
//     }
    
//     if(toggleY){
//         svg.selectAll(".Yaxis")
//             .transition()
//             .duration(1000)
//                 .style("opacity", opacity)
//     }
// }

// function drawStraightPath(){
//     if (typeof line === 'undefined'){
//         var path = d3.path();
                          
//         for (var item = 0; item < data.length; item++){
//             let x_value = data[item].score
//             let y_value = data[item].magnitude
//             if (item === 0){
//                 path.moveTo(x(x_value), y(y_value));
//             } else {
//                 path.lineTo(x(x_value), y(y_value));
//             }
//         }
        
//         window.line = d3.select(".chart")
//             .append("path")
//             .attr("class", "straight")
//             .attr("d", path)

//         window.totalLength = line.node().getTotalLength()
//     }

//     line
//       .attr("stroke", "#F2E8DC")
//       .attr("fill", "none")
//       .attr("stroke-dasharray", totalLength + " " + totalLength)
//       .attr("stroke-dashoffset", totalLength)
//       .transition()
//         .duration(3000)
//         .attr("stroke-dashoffset", 0)
// }

// function hideStraightPath(){
//     line
//         .transition()
//         .duration(3000)
//             .attr("stroke-dasharray", totalLength + " " + totalLength)
//             .attr("stroke-dashoffset", totalLength)
    
// }

// function toggleElementOpacity(element, opacity){
//     element
//         .transition()
//         .duration(1000)
//             .style("opacity", opacity)
// }

// function drawBezierPath(){
 

//     if (typeof lineBezier === 'undefined'){
//         var pathBezier = d3.path();

//         for (var item = 0; item < bezierData.length; item++){
//             let currenItem = bezierData[item];

//             if(item === 0){
//                 pathBezier.moveTo(x(currenItem[0]), y(currenItem[1]));
//             }


//             pathBezier.bezierCurveTo(
//                 x(currenItem[2]), 
//                 y(currenItem[3]),
//                 x(currenItem[4]), 
//                 y(currenItem[5]),
//                 x(currenItem[6]), 
//                 y(currenItem[7]),
//           );

//         }  
        
//         window.lineBezier = d3.select(".chart")
//             .append("path")
//                 .attr("class", "bezier")
//                 .attr("stroke-width", "2px")
//                 .attr("d", pathBezier)

//         window.totalLengthBezier = lineBezier.node().getTotalLength()
//     }

//     lineBezier
//         .attr("stroke", "#F2E8DC")
//         .attr("fill", "none")
//         .attr("stroke-dasharray", totalLengthBezier + " " + totalLengthBezier)
//         .attr("stroke-dashoffset", totalLengthBezier)
//         .transition()
//         .duration(3000)
//             .attr("stroke-dashoffset", 0);
// }

// function hideBezierPath(){
//     lineBezier
//         .attr("fill", "none")
//         .transition()
//         .duration(3000)
//             .attr("stroke-dasharray", totalLengthBezier + " " + totalLengthBezier)
//             .attr("stroke-dashoffset", totalLengthBezier)
    
// }

function plot0(){
    console.log("plot0");

    d3.select("#SVGid")
    .remove();

    // append the svg object to the body of the page
    var svg = d3.select("#avicii_viz")
    .append("svg")
    .attr("id", "SVGid")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    // plot
    d3.csv("publications.csv").then(function(data){

        data.forEach(d => {
            d.Year = parseInt(d.Year);
            d.Publications = parseInt(d.Publications);
        });

        console.log(data)
        // Add X axis
        var x = d3.scaleBand()
        .domain(data.map(a=>a.Year))
        .range([ 0, width ])
        .padding(.9);
        // .tickFormat(d3.format("d"));
        svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .attr("stroke", "white")
        .call(d3.axisBottom(x))
        .select(".domain")
        .attr("stroke", "white");
        // Add Y axis
        var y = d3.scaleLinear()
        .domain( [0, 2510])
        .range([ height, 0 ]);
        svg.append("g")
        .attr("stroke", "white")
        .call(d3.axisLeft(y))
        .select(".domain")
        .attr("stroke", "white");
        // Add the line
        svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#69b3a2")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
            .x(function(d) { return x(d.Year) })
            .y(function(d) { return y(d.Publications) })
            )
        // Add the points
        svg
        .append("g")
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
            .attr("cx", function(d) { return x(d.Year) } )
            .attr("cy", function(d) { return y(d.Publications) } )
            .attr("r", 5)
            .attr("fill", "#69b3a2")
        
    });
    
}


function plot1(){
    console.log("plot1");

    d3.select("#SVGid")
    .remove();
    
    //preprocess data
    d3.csv("HM_all_stores.csv").then(function(data){

        data.forEach(d => {
            d.longitude = parseFloat(d.longitude);
            d.latitude = parseFloat(d.latitude);
        });

        US = data.filter(d=>d.country == "USA");

        console.log(US)

    // set the dimensions and margins of the graph
    var margin = {top: 60, right: 230, bottom: 50, left: 50},
    width = 660 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#avicii_viz")
    .append("svg")
    .attr("id", "SVGid")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    // Map and projection
    const path = d3.geoPath();
    const projection = d3.geoAlbers()
    .scale(750)
    .center([15,30]);


    d3.json("us-states.json")
    .then(function(topo){

    // Draw the map
    svg.append("g")
    .selectAll("path")
    .data(topo.features)
    .join("path")
        // draw each country
        .attr("d", d3.geoPath()
        .projection(projection)
        )
        .style("stroke", "white")

    svg.selectAll(".pin")
    .data(US)
    .enter().append("circle", ".pin")
    .attr("r", 3.5)
    .attr("transform", function(d) {
        return "translate(" + projection([
        d.longitude,
        d.latitude
        ]) + ")";
    })
    .attr("fill", "white")
    .attr("stroke", "black");


    // create zoom effect
    let zoom = d3.zoom()
    .scaleExtent([0.1, 3])
    .on('zoom', function(event) {
        svg.selectAll("g")
        .attr('transform', event.transform);
        svg.selectAll("circle")
        .attr('transform', event.transform);
    });

    svg.call(zoom)

    // Add title:
    svg.append("text")
    .attr("text-anchor", "middle")
    .attr("x", width/2+50)
    .attr("y", -45 )
    .text("H&M Stores in the US")
    .attr("stroke", "white");

    })
        
    });

    
}

function plot2(){
    console.log("plot2");

    d3.select("#SVGid")
    .remove();

    // set the dimensions and margins of the graph
    var margin = {top: 0, right: 0, bottom: 0, left: 0},
    width = 660 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#avicii_viz")
    .append("svg")
    .attr("id", "SVGid")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
    
    d3.json("citations.json").then(function(data){
        console.log(data);

        // Initialize the links

        var link = svg
        .selectAll("line")
        .data(data.links)
        .enter()
        .append("line")
            .style("stroke", "#aaa")
            .attr("stroke-width", 1)

        // Initialize the nodes
        var node = svg.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(data.nodes)
        .enter()
        .append("circle")
            .attr("r", 15)
            .style("fill", "#69b3a2")
        
        let label = svg.append("g")
        .attr("class", "labels")
        .selectAll("text")
        .data(data.nodes)
        .join("text")
        .attr("class", "label")
        .text(d => d.id);


        var simulation = d3.forceSimulation(data.nodes)                 // Force algorithm is applied to data.nodes
        .force("link", d3.forceLink()                               // This force provides links between nodes
                .id(function(d) { return d.id; })                     // This provide  the id of a node
                .links(data.links)                                    // and this the list of links
        )
        .force("charge", d3.forceManyBody().strength(-200))         // This adds repulsion between nodes. Play with the -400 for the repulsion strength
        .force("center", d3.forceCenter(width / 2, height / 2))     // This force attracts nodes to the center of the svg area
        .force("x", d3.forceX(width/2))
        .force("y", d3.forceY(height/2))
        .on("end", ticked);
    
        // This function is run at each iteration of the force algorithm, updating the nodes position.
        function ticked() {
        link
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });
    
        node
            .attr("cx", function (d) { return d.x+3; })
            .attr("cy", function(d) { return d.y-3; });

            label.attr("x", function (d) {
                return d.x;
            })
                .attr("y", function (d) {
                    console.log(d);
                    return d.y;
                })
                .style("font-size", "8px");
        }

        // create zoom effect
        let zoom = d3.zoom()
        .scaleExtent([0.1, 3])
        .on('zoom', function(event) {
            svg.selectAll("g")
            .attr('transform', event.transform);
            svg.selectAll("line")
            .attr('transform', event.transform);
        });

        svg.call(zoom)

        // Add title:
        svg.append("text")
        .attr("text-anchor", "middle")
        .attr("x", width/2)
        .attr("y", 10 )
        .text("Flow of Goods from Different States");

    });

    
}


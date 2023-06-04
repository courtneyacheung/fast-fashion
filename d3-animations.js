const margin = {top: 50, right: 25, bottom: 45, left: 80},
      width = 660 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

function plot0(){
    console.log("plot0");

    d3.select("#SVGid")
    .remove();

    // const margin = {top: 50, right: 25, bottom: 45, left: 80},
    //   width = 660 - margin.left - margin.right,
    //   height = 400 - margin.top - margin.bottom;

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

        // tooltip
        var tooltip = d3.select("#avicii_viz")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        // .attr("width", 100)
        // .attr("height", 10)
        // .style("background-color", "white")
        // .style("border", "solid")
        // .style("border-width", "1px")
        // .style("border-radius", "5px")
        // .style("padding", "10px")

        // Three function that change the tooltip when user hover / move / leave a cell
        var mouseover = function(event, d) {
            console.log("blah");
            console.log(d.Publications);
            console.log(event.pageX);

            tooltip
            .html(d.Publications)
            .style("opacity", 1)
            .style("position", "absolute")
            .style("color", "white")
        }
        var mousemove = function(event, d) {
        console.log(d);
            tooltip
            .style("left", event.pageX - 800 + 'px') // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
            .style("top", event.pageY - 1380 + 'px')
        }
        var mouseleave = function(event, d) {
            tooltip
            .style("opacity", 0)
        }

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
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave)
            .transition()
            // .duration(1000)
            .delay((function(d, i) {
                return i * 100+2000;
            }))
            .attr("fill", "#69b3a2")

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


        // Add X axis label:
        svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", width/2)
        .attr("y", height+40 )
        .text("Year")
        .attr("stroke", "white");

        // Add Y axis label:
        svg.append("text")
        .attr("x", -height/2)
        .attr("y", -50 )
        .attr("text-anchor", "middle")
        .text("# of Publications")
        .attr("transform", "rotate(-90)")
        .attr("stroke", "white");

        // Add title:
        svg.append("text")
        .attr("text-anchor", "middle")
        .attr("x", width/2)
        .attr("y", -20 )
        .text("Google Scholar Publications Increasingly Contain 'Fast Fashion' and 'Social Media'")
        .attr("stroke", "white");
        
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

    // // set the dimensions and margins of the graph
    // var margin = {top: 60, right: 230, bottom: 50, left: 50},
    // width = 660 - margin.left - margin.right,
    // height = 400 - margin.top - margin.bottom;

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
    .enter()
    .append("circle", ".pin")
    .attr("r", 0)
    .attr("transform", function(d) {
        return "translate(" + projection([
        d.longitude,
        d.latitude
        ]) + ")";
    })
    .transition()
    .duration(1000)
    .delay((function(d, i) {
        return i * 10;
      }))
    .attr("r", 3.5)
    .attr("fill", "white")
    .attr("stroke", "black");

    // Add title:
    svg.append("text")
    .attr("text-anchor", "middle")
    .attr("x", width/2+120)
    .attr("y", -15 )
    .text("H&M Stores in the US, 2022")
    .attr("stroke", "white");

    })
        
    });

    
}

function plot2(){
    console.log("plot2");

    d3.select("#SVGid")
    .remove();

    // // set the dimensions and margins of the graph
    // var margin = {top: 0, right: 0, bottom: 0, left: 0},
    // width = 660 - margin.left - margin.right,
    // height = 400 - margin.top - margin.bottom;

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

        // tooltip
        var tooltip = d3.select("#avicii_viz")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        // .attr("width", 100)
        // .attr("height", 10)
        // .style("background-color", "white")
        // .style("border", "solid")
        // .style("border-width", "1px")
        // .style("border-radius", "5px")
        // .style("padding", "10px")

        // Three function that change the tooltip when user hover / move / leave a cell
        var mouseover = function(event, d) {
            console.log("blah");
            console.log(`<a href="${d.paper}">link</a>`);

            tooltip
            .html(`<a href="${d.paper}">link</a>`)
            .style("opacity", 1)
            .style("position", "absolute")
            .style("color", "white")
        }
        var mousemove = function(event, d) {
        console.log(d);
            tooltip
            .style("left", event.pageX -800+ 'px') // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
            .style("top", event.pageY -1380 + 'px')
        }
        var mouseleave = function(d) {
            tooltip
            .style("opacity", 0)
        }


        // Initialize the nodes
        var node = svg.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(data.nodes)
        .enter()
        .append("circle")
            .attr("r", 15)
            .style("fill", "#69b3a2")
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)
        
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
        .attr("y", -25 )
        .text("Literature by Citation")
        .attr("stroke", "white");


        

    });

    
}

function research(){
    d3.select("#SVGid")
    .remove();

    // // set the dimensions and margins of the graph
    // var margin = {top: 0, right: 0, bottom: 0, left: 0},
    // width = 660 - margin.left - margin.right,
    // height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#avicii_viz")
    .append("svg")
    .attr("id", "SVGid")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    svg.append("text")
    .attr("text-anchor", "left")
    .attr("x", width/2-50)
    .attr("y", height/2 )
    .text("Link to survey")
    .attr("stroke", "white");

    svg.append("text")
    .attr("text-anchor", "left")
    .attr("x", width/2-50)
    .attr("y", height/2 +20 )
    .text("Link to Responses")
    .attr("stroke", "white");

    svg.append("text")
    .attr("text-anchor", "left")
    .attr("x", width/2-50)
    .attr("y", height/2 +40)
    .text("Link to Research Paper")
    .attr("stroke", "white");

}

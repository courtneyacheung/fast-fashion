const margin = {top: 50, right: 65, bottom: 45, left: 80},
      width = 660 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

function plot0(){
    console.log("plot0");

    d3.selectAll(".current")
    .remove();

    // append the svg object to the body of the page
    var svg = d3.select("#avicii_viz")
    .append("svg")
    .attr("class", "current")
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
        svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .attr("stroke", "white")
        .call(d3.axisBottom(x))
        svg
        .select(".domain")
        .attr("stroke", "white")
        svg
        .selectAll(".tick text")
        .style("text-anchor", "end")
        .style("font-size", "6.5px")
        .attr("transform", "translate(-5.5,0)rotate(-65)");
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
        .style("background-color", "black")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("padding", "10px")

        // Three function that change the tooltip when user hover / move / leave a cell
        var mouseover = function(event, d) {
            console.log("mouseover");
            console.log(d.Publications);
            console.log(event);

            tooltip
            .html(d.Publications) 
            .style("opacity", 1)
            .style("position", "absolute")
            .style("color", "white")
            .style("left", event.layerX + 'px') // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
            .style("top", event.layerY - 50 + 'px')
            .style("pointer-events", "none")
        }
        // var mousemove = function(event, d) {
        // console.log(d);
        //     tooltip
        //     .style("left", event.pageX - 800 + 'px') // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
        //     .style("top", event.pageY - 1380 + 'px')
        // }
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
            // .on("mousemove", mousemove)
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
        .style("pointer-events", "none")


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

        var description = d3.select("#avicii_viz")
        .append("div")
        .attr("class", "current")
        .style("background-color", "black")
        .style("padding", "10px");

        description
        .html("Description: connected scatterplot from year 2000 to 2022 showing an increase in Google Scholar publications containing the words 'social media' and 'fast fashion' starting at 0 publications and ending at 2,400 publications.") 
        .style("opacity", 1)
        .style("position", "absolute")
        .style("color", "white")
        .style("font-size", "13px")
        
        
    });
    
}


function plot1(){
    console.log("plot1");

    d3.selectAll(".current")
    .remove();

    // append the svg object to the body of the page
    var svg = d3.select("#avicii_viz")
    .append("svg")
    .attr("class", "current")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
    
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

    svg.append("g")
    .selectAll(".pin")
    .data(US)
    .enter()
    .append("circle")
    .attr("class", "pin")
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

    // create zoom effect
    let zoom = d3.zoom()
    .scaleExtent([0.1, 3])
    .on('zoom', function(event) {
        svg.selectAll("g")
        .attr('transform', event.transform);
    });

    svg.call(zoom)
        
    });

    var description = d3.select("#avicii_viz")
        .append("div")
        .attr("class", "current")
        .style("background-color", "black")
        .style("padding", "10px");

        description
        .html("Description: map of the United States showing more than 500 H&M stores dispersed across the country in the year 2022") 
        .style("opacity", 1)
        .style("position", "absolute")
        .style("color", "white")
        .style("font-size", "13px")

    
}

function plot2(){
    console.log("plot2");

    d3.selectAll(".current")
    .remove();

    // // set the dimensions and margins of the graph
    // var margin = {top: 0, right: 0, bottom: 0, left: 0},
    // width = 660 - margin.left - margin.right,
    // height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#avicii_viz")
    .append("svg")
    .attr("class", "current")
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

        var mouseover2 = function(event, d) {
            console.log("mouseover2")
            tooltip
            .style("opacity", 1)
        }

        var mouseleave2 = function(d) {
            console.log("mouseleave2")
            tooltip
            .style("opacity", 0)
            .style("pointer-events", "none")
        }

        // tooltip
        var tooltip = d3.select("#avicii_viz")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        // .attr("width", 100)
        // .attr("height", 10)
        .style("background-color", "black")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("padding", "10px")
        .on("mouseover", mouseover2)
        .on("mouseleave", mouseleave2)

        // Three function that change the tooltip when user hover / move / leave a cell
        var mouseover = function(event, d) {
            console.log("blah");
            console.log(`<a href="${d.paper}">link</a>`);

            tooltip
            .html(`<a href="${d.paper}">Read Paper</a>
            <br>Publication Year: ${d.year}
            <br>Topics: ${d["topic(s)"]}
            <br>Methods: ${d["method(s)"]}`)
            .style("opacity", 1)
            .style("position", "absolute")
            .style("color", "white")
            .style("left", event.layerX - 10  + 'px') // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
            .style("top", event.layerY - 10  + 'px')
            .style("pointer-events", "auto")

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
        // .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)
        
        let label = svg.append("g")
        .attr("class", "labels")
        .selectAll("text")
        .data(data.nodes)
        .join("text")
        .attr("class", "label")
        .text(d => d.id)
        .style("pointer-events", "none");


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

        // Add title:
        svg.append("text")
        .attr("text-anchor", "middle")
        .attr("x", width/2)
        .attr("y", -25 )
        .text("Literature by Citation")
        .attr("stroke", "white");

    });

    var description = d3.select("#avicii_viz")
        .append("div")
        .attr("class", "current")
        .style("background-color", "black")
        .style("padding", "10px");

        description
        .html("Description: node-link diagram showing how literature is related by citation; citations link references 10 and 16, 18 and 7, 15 and 11, 3, 4, 6, and 14.") 
        .style("opacity", 1)
        .style("position", "absolute")
        .style("color", "white")
        .style("font-size", "13px")

    
}

function research(){
    d3.selectAll(".current")
    .remove();

    // // set the dimensions and margins of the graph
    // var margin = {top: 0, right: 0, bottom: 0, left: 0},
    // width = 660 - margin.left - margin.right,
    // height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var researchLinks = d3.select("#avicii_viz")
    .append("div")
    .attr("class", "current")
    .style("opacity", 0)
    .style("background-color", "black")
    .style("padding", "10px");

    researchLinks
    .html("<a href='https://docs.google.com/spreadsheets/d/1U5RUHrk8ISfRrXQFaZ82RxLUq0yp79HGY6YpkiNQP5E/edit?usp=sharing'>Questionnaire and Responses</a><br>Analysis<br>Github") 
    .style("opacity", 1)
    .style("position", "absolute")
    .style("color", "white")

}

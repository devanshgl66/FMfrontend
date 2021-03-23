import React,{Component} from 'react';
import * as d3 from 'd3';

var height=600;
var width=600;
var padding=90;
var tooltip=d3.select('body')
                        .append("div")
                        .classed("tooltip",true);

var arr=null;


class BarChart extends Component 
{
    componentDidMount()
    {

        // preparing pre-requisites for x and y axis
        var scalex=d3.scaleTime()
                    .domain([new Date(2020,5,1),new Date(2020,8,12)])
                    .range([padding,width-padding])
        var scaley=d3.scaleLinear()
                .domain([0,35000000])
                .range([height-padding,padding])
        
        var xaxis=d3.axisBottom(scalex)
                    .ticks(5);
        var yaxis=d3.axisLeft(scaley)
        
        
        d3.select(this.refs.canvas)
                        .append("svg")
                        .attr("width", width)
                        .attr("height", height)
                        .style("border", "1px solid black")


        // plotting x and y axis on the graph
        d3.select("svg")
        .append("g")
        .attr("transform","translate(0,"+(height-padding)+")")
        .call(xaxis);
        d3.select("svg")
        .append("g")
        .attr("transform","translate("+padding+",0)")
        .call(yaxis);
                    

        // plotting the x-info and the y-info
        d3.select("svg")
        .append("text")
        .attr("x",width/2)
        .attr("y",height-padding)
        .attr("dy","3.5em")
        .style("text-anchor","middle")
        .text("-------------Month-------------->")

        d3.select("svg")
        .append("text")
        .attr("y",padding)
        .attr("x",-height/2)
        .attr("dy","-4.5em")
        .attr("transform","rotate(-90)")
        .style("text-anchor","middle")
        .text("------------Corona Figures------------>")

        this.drawgraph(scalex,scaley);
    }

    drawgraph(scalex,scaley)
    {
        d3.select("svg")
                .selectAll("rect")
                .data(arr)
                .enter()
                .append("circle")
                .on('mousemove',changeradius1)
                .on('touchstart',changeradius1)
                .on('mouseout',changeradius2)
                .on('touchend',changeradius2)
                .transition()
                .duration(1500)
                .attr("cx",d => {
                    month=parseInt(d.Date.substring(0,1))-1
                    date=parseInt(d.Date.substring(2,4).replace("/",""))
                    //console.log(d.Date.substring(0,1)+" "+d.Date.substring(2,3)+" "+month+" "+date);
                    return scalex(new Date(2020,month,date));
                })
                .attr("cy",d =>scaley(d[object]))
                .attr("r",5)
                .attr("fill",color)
                .attr("stroke","#000")
                .attr("stroke-width","1.9") 
    }

    changeradius1(d,i)
    {
        var x,y;
        x=d3.event.x;
        y=d3.event.y;
        d3.select(this).attr("r",12)
        showtooltip(d,i,d3.event);

    }

    changeradius2()
    {
        var x,y;
        x=d3.event.x;
        y=d3.event.y;
        d3.select(this).attr("r",5)
        tooltip.style("opacity",0)
    }

    showtooltip(d,i,node)
    {
            tooltip.style("opacity",1)
            .style("left",node.x - tooltip.node().offsetWidth/2 -5 +"px")
            .style("top",node.y+25+"px")
            .html(
                `
                <p>Date: ${arr[i].Date}</p>
                <p>Total Cases: ${arr[i].TotalCases}</p>
                <p>Total Deaths: ${arr[i].TotalDeaths}</p>
                <p>Total Recovery: ${arr[i].TotalCases}</p>
                `)
    }
    render(){return<div ref="canvas"></div>}
}

export default BarChart;


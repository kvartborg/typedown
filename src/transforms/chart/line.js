import * as d3 from 'd3'
import D3Node from 'd3-node'

export default (data = [], width = 760, height = 400) => {
  const d3n = new D3Node()

  const window = {
    innerWidth: width,
    innerHeight: height
  }

  var margin = {top: 50, right: 50, bottom: 50, left: 50},
    width = window.innerWidth - margin.left - margin.right
    height = window.innerHeight - margin.top - margin.bottom

  // 5. X scale will use the index of our data
  var xScale = d3.scaleLinear()
      .domain([
        data.reduce((current, [x]) => Math.min(current, x), 10000),
        data.reduce((current, [x]) => Math.max(current, x), 0)
      ]) // input
      .range([0, width]) // output

  // 6. Y scale will use the randomly generate number
  var yScale = d3.scaleLinear()
      .domain([
        data.reduce((current, [_, y]) => Math.min(current, y), 10000),
        data.reduce((current, [_, y]) => Math.max(current, y), 0)
      ])
      .range([height, 0]) // output

  // 7. d3's line generator
  var line = d3.line()
      .x(function ([x]) { return xScale(x) }) // set the x values for the line generator
      .y(function ([_, y]) { return yScale(y) }) // set the y values for the line generator
      .curve(d3.curveMonotoneX) // apply smoothing to the line

  // 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number
  var dataset = data

  // 1. Add the SVG to the page and employ #2
  var svg = d3n.createSVG(width, height)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
    .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  // 3. Call the x axis in a group tag
  svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(xScale)) // Create an axis component with d3.axisBottom

  // 4. Call the y axis in a group tag
  svg.append('g')
      .attr('class', 'y axis')
      .call(d3.axisLeft(yScale)) // Create an axis component with d3.axisLeft

  // 9. Append the path, bind the data, and call the line generator
  svg.append('path')
      .datum(dataset) // 10. Binds data to the line
      .attr('class', 'line') // Assign a class for styling
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('stroke-width', '3')
      .attr('d', line) // 11. Calls the line generator

  // 12. Appends a circle for each datapoint
  svg.selectAll('.dot')
    .data(dataset)
    .enter().append('circle') // Uses the enter().append() method
      .attr('class', 'dot') // Assign a class for styling
      .attr('cx', function ([x]) { return xScale(x) })
      .attr('cy', function ([_, y]) { return yScale(y) })
      .attr('r', 3)

  return d3n.svgString()
}

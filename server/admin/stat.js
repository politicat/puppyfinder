let data;

var width = 420,
    barHeight = 20;

var x = d3.scale.linear()
    .range([0, width]);

var chart = d3.select(".chart")
    .attr("width", width);

d3.json("/statjson", function(error, data) {
  if (error) return console.error(error);
  console.log('data: ', data);

  x.domain([0, d3.max(data, function(d) { return d.count; })]);

  chart.attr("height", barHeight * data.length);

  var bar = chart.selectAll("g")
      .data(data)
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

  bar.append("rect")
      .attr("width", function(d) { return x(d.count); })
      .attr("height", barHeight - 1);

  bar.append("text")
      .attr("x", function(d) { return x(d.count) - 3; })
      .attr("y", barHeight / 2)
      .attr("dy", ".35em")
      .text(function(d) { return d.count; });

  bar.append("text")
      .attr("x", function(d) { return 10 + d.puppy.length * 3; })
      .attr("y", barHeight / 2)
      .attr("dy", ".35em")
      .text(function(d) { return d.puppy; });
});

function type(d) {
  d.count = +d.count; // coerce to number
  return d;
}

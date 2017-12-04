
//books_call_number.html
//data should look like this
//LC class,number
//A,
//B,42


BOOKS_CALL_NUMBER_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQiwwiofHBpKc1RZhwkpF1u6tmPh7EpZPdFFAoJBd1mJzpxYA53U1a-7pPBIy42HrEcqFYb5jKcINHW/pub?gid=0&single=true&output=csv"

var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    radius = Math.min(width, height) / 2,
    g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var color = d3.scaleOrdinal(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d.number; });

var path = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var label = d3.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);

d3.csv(BOOKS_CALL_NUMBER_URL, function(d) {
  d.number = +d.number;
  return d;
}, function(error, data) {
  if (error) throw error;

  var arc = g.selectAll(".arc")
    .data(pie(data))
    .enter().append("g")
      .attr("class", "arc");

  arc.append("path")
      .attr("d", path)
      .attr("fill", function(d) { return color(d.data.lc_class); });

  arc.append("text")
      .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
      .attr("dy", "0.35em")
      .text(function(d) { return d.data.lc_class; });
	  
   arc.append("title")
	  .text(function(d) { return d.data.lc_class + " : " + d.data.number + " Titles"; });
});

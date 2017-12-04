
//desk_today.html

//data should look like this
//questiontype	count
//Reference	5
//Technical	1
//Directional	30
//Referral	4

DESK_TODAY_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQYn5XNiBjF83Dz3kr6oCgcjGYj-0fXG4oVSogotg1O6YQ7UdATW7ugcUWCER0Hxyok4h1aomSfif9q/pub?gid=1842727352&single=true&output=csv";

var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    radius = Math.min(width, height) / 2,
    g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var color = d3.scaleOrdinal(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d.count; });

var path = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var label = d3.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);

d3.csv(DESK_TODAY_URL, function(d) {
  console.log(d);
  d.count = +d.count;
  return d;
}, function(error, data) {
  if (error) throw error;

  var arc = g.selectAll(".arc")
    .data(pie(data))
    .enter().append("g")
      .attr("class", "arc");

  arc.append("path")
      .attr("d", path)
      .attr("fill", function(d) { return color(d.data.questiontype); });

  arc.append("text")
      .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
      .attr("dy", "0.35em")
      .text(function(d) { return d.data.questiontype+"\n"+d.data.count; });
});

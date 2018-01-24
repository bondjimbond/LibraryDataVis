
//Journals by Open Access or Not

JOURNALS = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQOFja5uKAUxOPVGApHvZHwGf0KTuYE45XPZf0Z8yqu56mDv0boohsfLSHJKJ1C03-p8FMtC_cxuMNS/pub?gid=1561069633&single=true&output=csv";

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

d3.csv(JOURNALS, function(d) {
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
      .attr("fill", function(d) { return color(d.data.oa); });

  arc.append("text")
      .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
      .attr("dy", "1.5em")
      .text(function(d) { return d.data.oa+"\n"+d.data.count; });
});

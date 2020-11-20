// Retrieving data from json file and creates plots with Plotly

d3.selectAll("#sample-metadata").select("h6").remove();
d3.json("samples.json").then(function (data) {
    console.log(data);


})
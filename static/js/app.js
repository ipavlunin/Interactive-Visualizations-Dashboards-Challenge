// Retrieving data from json file and creates plots with Plotly

d3.selectAll("#sample-metadata").select("h6").remove();
d3.json("samples.json").then(function (data) {
    console.log(data);

    // Creating Variables
    var names = data.names
    console.log(names)
    var metadata = data.metadata
    console.log(metadata)
    var samples = data.samples
    console.log(samples)
    var samplevalues = samples.map(data => data.sample_values)
    console.log(samplevalues)
    var otuids = samples.map(data => data.otu_ids)
    console.log(otuids)
    var otulabels = samples.map(data => data.otu_labels)
    console.log(otulabels)

})
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

    // Demographic Info for 1st test subject ID
    var sampleData = d3.select("#sample-metadata");
    for (const [key, value] of Object.entries(metadata[0])) {
        var p = sampleData.append("p")
            .attr("id", "metadata")
            .text(`${key}: ${value}`);
    }

    // Bubble Plot for 1st test subject ID
    var trace1 = {
        x: samples[0].otu_ids,
        y: samples[0].sample_values,
        text: samples[0].otu_labels,
        mode: 'markers',
        marker: {
            size: samples[0].sample_values,
            color: samples[0].otu_ids
        }
    };

    var data = [trace1];

    var layout = {
        xaxis: {
            title: "OTU IDs",
        },
        yaxis: {
            autorange: 'reversed',
            type: "category"
        },
        showlegend: false
    };

    Plotly.newPlot('bubble', data, layout);

})
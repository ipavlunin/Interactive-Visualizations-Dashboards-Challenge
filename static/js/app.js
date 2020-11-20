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

    // Gauge Plot for 1st test subject ID
    var data = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: metadata[0].wfreq,
            title: { text: "Scrubs per Week" },
            type: "indicator",
            mode: "gauge+number",
            text: ["0-1", "1-2", "2-3", "3-4", "4-5", "5-6", "6-7", "7-8", "8-9"],
            textinfo: "text",
            textposition: "inside",
            delta: { reference: 4 },
            gauge: {
                axis: { range: [0, 9] },
                steps: [
                    { range: [0, 1], color: "EBF0D2" },
                    { range: [1, 2], color: "E0EE9D" },
                    { range: [2, 3], color: "CCFF99" },
                    { range: [3, 4], color: "B2FF66" },
                    { range: [4, 5], color: "99FF33" },
                    { range: [5, 6], color: "80FF00" },
                    { range: [6, 7], color: "66CC00" },
                    { range: [7, 8], color: "4C9900" },
                    { range: [8, 9], color: "336600" },
                ],
            }
        }
    ];

    var layout = { width: 500, height: 350 };
    Plotly.newPlot('gauge', data, layout);

    // Bar Plot for first 10 samples of selected test subject ID
    var samplelist10 = samples[0].sample_values.slice(0, 10);
    samplerev10 = samplelist10.reverse();
    var idlist10 = samples[0].otu_ids.slice(0, 10);
    idlist10 = idlist10.map(d => `OTS ${d.toString()}`);
    idrev10 = idlist10.reverse();
    var labellist10 = samples[0].otu_labels.slice(0, 10);
    labelrev10 = labellist10.reverse();

    var data = [{
        type: 'bar',
        x: samplerev10,
        y: idrev10,
        text: labelrev10,
        orientation: 'h'
    }]

    Plotly.newPlot("bar", data);

    // Test subject ID selector
    var selector = d3.selectAll("#selDataset");
    for (var i = 0; i < names.length; i++) {
        selector.append("option")
            .attr("value", names[i])
            .text(names[i]);
    }

    // Function for test subject ID change
    selector.on("change", optionChanged)
    function optionChanged() {

        // Demographic Info Update
        var option = selector.node().value;
        var remOld = d3.selectAll("#metadata").remove();
        for (var i = 0; i < metadata.length; i++) {
            if (parseInt(option) === metadata[i].id) {
                for (const [key, value] of Object.entries(metadata[i])) {
                    var p = sampleData.append("p")
                        .attr("id", "metadata")
                        .text(`${key}: ${value}`);
                }

                // Bubble Plot for selected test subject ID
                var trace1 = {
                    x: samples[i].otu_ids,
                    y: samples[i].sample_values,
                    text: samples[i].otu_labels,
                    mode: 'markers',
                    marker: {
                        size: samples[i].sample_values,
                        color: samples[i].otu_ids
                    }
                };

                var data = [trace1];

                var layout = {
                    showlegend: false
                };

                Plotly.newPlot('bubble', data, layout);

                // Bar Plot for the first 10 samples of selected test subject ID
                var samples_list = samples[i].sample_values.slice(0, 10);
                samples_rev = samples_list.reverse();
                var ids_list = samples[i].otu_ids.slice(0, 10);
                ids_list = ids_list.map(d => `OTS ${d.toString()}`);
                ids_rev = ids_list.reverse();
                var labels_list = samples[i].otu_labels.slice(0, 10);
                labels_rev = labels_list.reverse();

                var data = [{
                    type: 'bar',
                    x: samples_rev,
                    y: ids_rev,
                    text: labels_rev,
                    orientation: 'h'
                }]

                Plotly.newPlot("bar", data);

                // Gauge Plot for selected test subject ID
                var data = [
                    {
                        domain: { x: [0, 1], y: [0, 1] },
                        value: metadata[i].wfreq,
                        title: { text: "Scrubs per Week" },
                        type: "indicator",
                        mode: "gauge+number",
                        text: ["0-1", "1-2", "2-3", "3-4", "4-5", "5-6", "6-7", "7-8", "8-9"],
                        textinfo: "text",
                        textposition: "inside",
                        delta: { reference: 4 },
                        gauge: {
                            axis: { range: [0, 9] },
                            steps: [
                                { range: [0, 1], color: "EBF0D2" },
                                { range: [1, 2], color: "E0EE9D" },
                                { range: [2, 3], color: "CCFF99" },
                                { range: [3, 4], color: "B2FF66" },
                                { range: [4, 5], color: "99FF33" },
                                { range: [5, 6], color: "80FF00" },
                                { range: [6, 7], color: "66CC00" },
                                { range: [7, 8], color: "4C9900" },
                                { range: [8, 9], color: "336600" },
                            ],
                        }
                    }
                ];
                var layout = { width: 500, height: 350 };
                Plotly.newPlot('gauge', data, layout);
            }
        }
    }
})
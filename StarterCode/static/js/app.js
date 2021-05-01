// plots
function plots(id){
  d3.json("samples.json").then(function(data) {
    // Bar
    // filtering by id
    let dataSample = data.samples.filter(s => s.id.toString() === id)[0];
    
    let values = dataSample.sample_values.slice(0, 10).reverse();
    let labels = dataSample.otu_ids.slice(0, 10).reverse().map(label => `OTU ${label}`);
    let barText = dataSample.otu_labels.slice(0, 10).reverse();
  
    let trace = {
      x: values,
      y: labels,
      text: barText,
      type: "bar",
      orientation: 'h'
      };
      
    let barTrace = [trace];
  
    Plotly.newPlot("bar", barTrace);

    // Bubbles
    let trace2 = {
      x: dataSample.otu_ids,
      y: dataSample.sample_values,
      marker: {
          size: dataSample.sample_values,
          color: dataSample.otu_ids
      },
      text: dataSample.otu_labels,
      mode: "markers"
      };
    
    let bubbleLayout = {
      xaxis:{title: "OTU ID"},
      height: 550,
      width: 1100
      };
    
    let bubbleTrace = [trace2];

    Plotly.newPlot("bubble", bubbleTrace, bubbleLayout);
  
    });
}

// Demographic Info.
function demographics(id){
  d3.json("samples.json").then((data)=> {    
    // filtering by id
    let dataMeta = data.metadata.filter(s => s.id.toString() === id)[0];
    // select panel body
    let panel = d3.select("#sample-metadata");
    // empty panel
    panel.html("");
    // populate panel
    Object.entries(dataMeta).forEach(([key, value])=>{
      panel.append("p").text(`${key}: ${value}`);
  });
  });
}

// Init with first sample & populate Dropdown 
function init() {
  d3.json("samples.json").then((data)=> {
    data.names.forEach((name) => {
        d3.select("#selDataset")
        .append("option")
        .text(name)
        .property("value");
    });
      // starting with first sample
    plots(data.names[0]);
    demographics(data.names[0]);
  });
};
init();

// optionChanged function
function optionChanged(id){
  plots(id);
  demographics(id);
};
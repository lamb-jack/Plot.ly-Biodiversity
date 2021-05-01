// plots
function Plots(id){
  d3.json("samples.json").then(function(data) {
    // Bar
    let values = data.samples[0].sample_values.slice(0, 10).reverse();
    let labels = (data.samples[0].otu_ids).slice(0, 10).reverse().map(label => `OTU ${label}`);
    let barText = (data.samples[0].otu_labels).slice(0, 10).reverse();
      
    console.log(values);
    console.log(labels);
    console.log(barText);
  
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
      x: data.samples[0].otu_ids,
      y: data.samples[0].sample_values,
      marker: {
          size: data.samples[0].sample_values,
          color: data.samples[0].otu_ids
      },
      text: data.samples[0].otu_labels,
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

Plots();

// Demographic Info.
function demographics(){
  d3.json("samples.json").then((data)=> {

    let panel = d3.select("#sample-metadata");
    panel.html("");

    Object.entries(data.metadata[0]).forEach((key)=>{
      panel.append("p").text(key[0] + ":" + key[1]);
  });
  });
}

demographics();
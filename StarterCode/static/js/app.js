// plots
function Plots(id){
  d3.json("../../data/samples.json").then(function(data) {
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
      mode: "markers",
      text: data.samples[0].otu_ids,
      marker: {
          size: data.samples[0].sample_values,
          color: data.samples[0].otu_ids
      }
      };
    
    let layout_b = {
      xaxis:{title: "OTU ID"},
      height: 600,
      width: 1200
      };
    
    let bubbleTrace = [trace2];

    Plotly.newPlot("bubble", bubbleTrace, layout_b); 


  
    });
}

Plots(); 

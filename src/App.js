import { useEffect, useState } from 'react';
import './App.css';

import * as echarts from 'echarts';
import jsonData from './data/Wine-Data.json'



function App() {

  // Reading OR Getting data from file and assinging to json state 
  // eslint-disable-next-line
  const [json, setJson] = useState(jsonData)

  // Creating a empty object to store the all the graph data 
  const [graphData, setGraphData] = useState({})
  

  useEffect(() => {
    // First creating a each key using JSON data and assinging it to empty array
    json.map(d => Object.keys(d).map(n => setGraphData(prev => ({...prev, [n]: []}))));

    // Storing a data into empty array using key
    // eslint-disable-next-line
    json.map((d) => {
      Object.entries(d).map(n => setGraphData(prev => ({...prev, [n[0]]: [...prev[n[0]],n[1]]})))
    });
  },[json])

  useEffect(() => {
    // Initializing EChart on element
    var barChartDiv = echarts.init(document.getElementById('barchart'));
    var scatterChartDiv = echarts.init(document.getElementById('scatterchart'));

    //Adding Event for make it Responsive
    window.addEventListener('resize', () => {
      barChartDiv.resize();
      scatterChartDiv.resize();
    })
    
    //Bar chart start
    barChartDiv.setOption({
      title: {
        text: "Bar Chart Example",
      },
      legend: {
        data: ["Malic Acid"],
      },
      tooltip: {},
      dataZoom: [
        {
          id: "dataZoomX",
          type: "slider",
          xAxisIndex: [0],
          filterMode: "filter",
          start: 0,
          end: 10,
        },
        {
          type: 'inside'
        }
      ],
      xAxis: {
        name: "Alcohol",
        nameLocation: "middle",
        nameGap: 19,
        type: "category",
        data: graphData['Alcohol'] // Displaying data on x-axis
      },
      yAxis: {
        name: "Malic Acid",
        nameGap: 30,
        nameLocation: "middle",
      },
      series: [
        {
          name: "Malic Acid",
          type: "bar",
          data: graphData['Malic Acid'] // Displaying data on y-axis
        },
      ],
      media: [  // EChart Media query for Adjust graph on Multiple Devices
        {
          query: {
            maxWidth: 950,
          },
          option: {
            dataZoom: [
              {
                start: 0,
                end: 10,
              },
            ],
          },
        },
        {
          query: {
            maxWidth: 550,
          },
          option: {
            legend: {
              right: 10,
              top: 0,
            },
            yAxis: {
              nameGap: 15
            },
            dataZoom: [
              {
                start: 0,
                end: 4,
              },
            ],
          },
        },
      ],
    });
    //Bar chart end

    // Scatter plot start
    scatterChartDiv.setOption({
      title: {
        text: 'Scatter Plot Example'
      },
      tooltip:{},
      color:['#fd5800'],
      legend:{
        data: ['Hue']
      },
      xAxis: {
        name: 'Color intensity',
        nameLocation: 'middle',
        nameGap: 19,
        type: 'category',
        data: graphData['Color intensity'] // Displaying data on x-axis
      },
      yAxis:{
        name: 'Hue',
        nameLocation: 'middle',
        nameGap: 25
      },
      series:{
        name: 'Hue',
        type: 'scatter',
        data: graphData['Hue'] // Displaying data on y-axis
      },
      dataZoom:[
        {
          id: 'dataZoomX',
          type: 'slider',
          xAxisIndex: [0],
        },
        {
          type: 'inside'
        }
      ],
      media: [  // EChart Media query for Adjust graph on Multiple Devices
        {
          query: {
            maxWidth: 950,
          },
          option: {
            dataZoom: [
              {
                start: 0,
                end: 10,
              },
            ],
          },
        },
        {
          query: {
            maxWidth: 550,
          },
          option: {
            legend: {
              right: 10,
              top: 0,
            },
            yAxis: {
              nameGap: 15
            },
            dataZoom: [
              {
                start: 0,
                end: 20,
              },
            ],
          },
        },
      ],
    })
    //Scatter plot end

    return () => window.removeEventListener('resize', null);
  },[graphData])

  return (
    <div className="App">
      <div id="barchart"></div>
      <div id="scatterchart" style={{marginTop: 50}}></div>
    </div>
  );
}

export default App;

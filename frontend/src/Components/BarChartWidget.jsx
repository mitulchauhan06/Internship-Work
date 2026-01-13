import React from 'react'
import {Bar , BarChart , XAxis , YAxis , Tooltip , ResponsiveContainer} from 'recharts';    
//here we use rechart library to visulize the data in react
// BarChart: Main container for the bar chart.

// Bar: Represents a single bar on the chart.

// XAxis and YAxis: Define the horizontal (X) and vertical (Y) axes.

// Tooltip: Shows data on hover.

// ResponsiveContainer: Makes the chart responsive (adjusts with screen size).

const COLORS = ["#34D399", "#FBBF24", "#EF4444"]; // green, yellow, red

const BarChartWidget = ({priorityCount}) => {
const data= [
{ name: "Low", value: priorityCount.low },
    { name: "Medium", value: priorityCount.medium },
    { name: "High", value: priorityCount.high },
  ];


  return (
    <div className='bg-white p-6 rounded-xl shadow'>
      <h2 className='text-xl font-semibold mb-4'>Task Priority Distribution</h2>
      <ResponsiveContainer width="100%" height={300}> 
        <BarChart data={data}>
            <XAxis dataKey="name"/>
            <YAxis />
            <Tooltip/>
            <Bar dataKey={"value"} fill="#8884d8" radius={[5,5,0,0,]}/>
        </BarChart>

      </ResponsiveContainer>
    </div>
  );
};

export default BarChartWidget

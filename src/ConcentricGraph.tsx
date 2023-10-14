import React from 'react';
import { Bar } from 'react-chartjs-2';

const data = {
  labels: ['Male', 'Female'],
  datasets: [
    {
      data: [50, 30], // Replace these values with your data
      backgroundColor: ['blue', 'pink'], // Customizable colors
    },
  ],
};

const options = {
  maintainAspectRatio: false,
};

const ConcentricGraph: React.FC = () => {
  return (
    <div className="w-64 h-64">
      <Bar data={data} options={options} />
    </div>
  );
};

export default ConcentricGraph;

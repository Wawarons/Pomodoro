import React from 'react';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

Chart.register(ArcElement, Tooltip, Legend);
Chart.defaults.color = "#fff";
Chart.defaults.font.size = 14;

export const data = {
    labels: ['Study', 'Latin', 'Coding', 'Math'],
    datasets: [
        {
            plugin: {

                legend: {
                    fontColor: 'red'
                },
            },
            label: 'Time spend',
            data: [12, 19, 3, 5],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
            responsive: true,
        },
    ],
};



const ReportCircle = () => {
    return <Doughnut data={data} />;
}

export default ReportCircle;

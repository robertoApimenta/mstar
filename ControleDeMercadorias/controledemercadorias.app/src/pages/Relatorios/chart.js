import React, {useEffect} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart.js Bar Chart',
        },
    },
};

function ColumnChart({ data }) {
    const labels = data.map((item) => item.productName);
    const quantities = data.map((item) => item.quantity);

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: quantities,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };
    

    return (
        <div>
            <h2>Gráfico de Colunas</h2>
            <Bar options={options} data={chartData} />;
        </div>
    );
}

export default ColumnChart;

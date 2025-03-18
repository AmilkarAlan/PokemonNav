import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);


const PokemonStatChart = ({ stat, color }) => {
    const data = {
        datasets: [{
            data: [stat, 200-stat], // Valores de la estadística y el resto
            backgroundColor: ['#ffcb05', '#f0f0f0'], // Colores
        }]
    };

    const options = {
        cutout: '80%', // Grosor del anillo
        rotation: -90, // Comenzar desde la parte superior
    };
    return (

        <div className='relative w-16 h-16'>
            <Doughnut data={data} options={options} />
            <div className='w-full h-full absolute inset-0 flex items-center justify-center'>
                <p className='text-md font-bold'>{stat}</p>
            </div>
        </div>
    )
};

export default PokemonStatChart;
import { useTheme } from 'styled-components';
import { Line } from 'react-chartjs-2';

import { Card } from './styles';

const options = {
  elements: {
    point: {
      radius: 0,
      hitRadius: 5,
      hoverRadius: 5,
    },
  },
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
      },
    ],
    yAxes: [
      {
        display: false,
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
  maintainAspectRatio: false,
};

const MyChart: React.FC<{
  days: {
    [key: string]: any;
  };
}> = ({ days }) => {
  const theme = useTheme();

  const data = {
    labels: Object.keys(days),
    datasets: [
      {
        label: `This week`,
        data: Object.values(days).map((day) => day.value),
        borderColor: `transparent`,
        pointBackgroundColor: theme.foreground,
        pointBorderColor: theme.foreground,
        lineTension: 0.4,
      },
    ],
  };

  return (
    <Card>
      <Line data={data} options={options} />
      <div className="axis">
        {Object.keys(days).map((day, index) => (
          <div className="tick" key={`tick-${index}`}>
            <span className="value value--this">{days[day].label}</span>
            {day}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default MyChart;

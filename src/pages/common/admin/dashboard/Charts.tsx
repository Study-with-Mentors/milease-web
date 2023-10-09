import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
} from "chart.js";
import styled from "./Dashboard.module.scss";
import { BarChartOutlined, LineChartOutlined, LoadingOutlined, UserAddOutlined } from "@ant-design/icons";
import Color from "../../../../constants/Color";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement
);

const optionsBar = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      display: false
    },
  },
};

const optionPie = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "right" as const,
    },
  },
}

const labelsBar = ["May 2023", "Jun 2023", "Jul 2023", "Aug 2023", "Sep 2023", "Oct 2023"];

const dataBar = {
  responsive: true,
  labels: labelsBar,
  datasets: [
    {
      data: [1, 2, 4, 7, 6, 8],
      borderColor: Color.main_red_color,
      backgroundColor: Color.main_red_color,
    },
  ],
};

const Charts = () => {

  const dataPie = {
    labels: ["Sociology", "Philosophy", "Math", "	Computer science", "Physics"],
    datasets: [
      {
        data: [1, 2, 2, 1, 4],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "#EAA4FF",
        ],
      },
    ],
  };

  return (
    <div className={styled["stats"]}>
      <div className={styled["chart-left"]}>
        <div className={styled["title"]}><LineChartOutlined style={{ paddingRight: '10px' }} /> Revenue Analysis</div>
        <div style={{ width: '85%', height: '85%', padding: 20 }}>
          <Line redraw data={dataBar} options={optionsBar} />
        </div>
      </div>

      <div className={styled["chart-right"]}>
        <div className={styled["title"]}><BarChartOutlined style={{ paddingRight: '10px' }} /> User Analysis</div>
        <div style={{ width: '85%', height: '85%', padding: 20 }}>
          <Bar redraw data={dataBar} options={optionsBar} />
        </div>
      </div>
    </div>
  );
};

export default Charts;

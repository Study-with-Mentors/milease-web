import { Bar, Line } from "react-chartjs-2";
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
import { BarChartOutlined, LineChartOutlined } from "@ant-design/icons";
import Color from "../../../../constants/Color";
import { useState } from "react";

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



const Charts = () => {

  const [labelBar, setLabelBar] = useState(["May 2023", "Jun 2023", "Jul 2023", "Aug 2023", "Sep 2023", "Oct 2023"])
  const [data, setData] = useState([1, 3, 5, 4, 7, 3])
  const [currentFilter, setCurrentFilter] = useState('month')

  const dataBar = {
    responsive: true,
    labels: labelBar,
    datasets: [
      {
        data: data,
        borderColor: Color.main_red_color,
        backgroundColor: Color.main_red_color,
      },
    ],
  };

  const fillMonth = () => {
    setCurrentFilter('month')
    setLabelBar(["May 2023", "Jun 2023", "Jul 2023", "Aug 2023", "Sep 2023", "Oct 2023"])
    setData([1, 3, 5, 4, 7, 3])
  }

  const fillWeek = () => {
    setCurrentFilter('week')
    setLabelBar(["01/10 - 07/10", "08/10 - 14/10", "15/10 - 21/10", "22/10 - 28/10", "29/10 - 31/10",])
    setData([2, 5, 3, 6, 2])
  }

  return (
    <div className={styled["stats"]}>
      <div className={styled["chart-left"]}>
        <div className={styled["top-title"]}>
          <div className={styled["title"]}><LineChartOutlined style={{ paddingRight: '10px' }} /> Revenue Analysis</div>
          <div className={styled["buttons-container"]}>
            <div className={styled["title"]}>Filter by</div>
            <button className={styled["button"]} disabled={currentFilter === "month"} onClick={fillMonth}>
              Month
            </button>
            <button className={styled["button"]} disabled={currentFilter === "week"} onClick={fillWeek}>
              Week
            </button>
          </div>
        </div>
        <div style={{ width: '85%', height: '85%', padding: 20 }}>
          <Line redraw data={dataBar} options={optionsBar} />
        </div>
      </div>

      <div className={styled["chart-right"]}>
        <div className={styled["top-title"]}>
          <div className={styled["title"]}><LineChartOutlined style={{ paddingRight: '10px' }} /> User Analysis</div>
          <div className={styled["buttons-container"]}>
            <div className={styled["title"]}>Filter by</div>
            <button className={styled["button"]} disabled={currentFilter === "month"} onClick={fillMonth}>
              Month
            </button>
            <button className={styled["button"]} disabled={currentFilter === "week"} onClick={fillWeek}>
              Week
            </button>
          </div>
        </div>
        <div style={{ width: '85%', height: '85%', padding: 20 }}>
          <Bar redraw data={dataBar} options={optionsBar} />
        </div>
      </div>
    </div>
  );
};

export default Charts;

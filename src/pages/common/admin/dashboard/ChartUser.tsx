import { Bar } from "react-chartjs-2";
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
import { BarChartOutlined } from "@ant-design/icons";
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
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  plugins: {
    legend: {
      position: "bottom" as const,
    },
  },
};



const ChartUser = () => {

  //User
  const [labelBar, setLabelBar] = useState(["May 2023", "Jun 2023", "Jul 2023", "Aug 2023", "Sep 2023", "Oct 2023"])
  const [data, setData] = useState([0, 1, 3, 3, 4, 7])
  const [dataPremium, setDataPremium] = useState([0, 0, 0, 1, 1, 2])
  const [currentFilter, setCurrentFilter] = useState('month')

  const dataBar = {
    responsive: true,
    labels: labelBar,
    datasets: [
      {
        label: "Users",
        data: data,
        borderColor: Color.main_red_color,
        backgroundColor: Color.main_red_color,
      },
      {
        label: "Premium Users",
        data: dataPremium,
        borderColor: Color.dark_blue_color,
        backgroundColor: Color.dark_blue_color,
      },
    ],
  };

  const fillMonth = () => {
    setCurrentFilter('month')
    setLabelBar(["May 2023", "Jun 2023", "Jul 2023", "Aug 2023", "Sep 2023", "Oct 2023"])
    setData([0, 1, 3, 3, 4, 7])
    setDataPremium([0, 0, 0, 1, 1, 2])
  }

  const fillWeek = () => {
    setCurrentFilter('week')
    setLabelBar(["01/10 - 07/10", "08/10 - 14/10", "15/10 - 21/10", "22/10 - 28/10", "29/10 - 31/10",])
    setData([4, 4, 4, 7, 7])
    setDataPremium([1, 1, 1, 2, 2])

  }

  return (
    <div className={styled["chart-right"]}>
      <div className={styled["top-title"]}>
        <div className={styled["title"]}><BarChartOutlined style={{ paddingRight: '10px' }} /> User Analysis</div>
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
  );
};

export default ChartUser;

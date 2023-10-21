import { Line } from "react-chartjs-2";
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
import { LineChartOutlined } from "@ant-design/icons";
import Color from "../../../../constants/Color";
import { useEffect, useState } from "react";
import { DatePicker } from "antd";

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

const { RangePicker } = DatePicker;

const optionsBar = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      display: false
    },
  },
};

const ChartRevenue = () => {

  //Revenue
  const [labelBar, setLabelBar] = useState(["May 2023", "Jun 2023", "Jul 2023", "Aug 2023", "Sep 2023", "Oct 2023"])
  const [data, setData] = useState([0, 0, 15000, 15000, 15000, 30000])
  const [dataChange, setDataChange] = useState([0, 0, 15000, 15000, 15000, 30000])
  const [filter, setFilter] = useState('month')
  const [mode, setMode] = useState('total')

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

  useEffect(() => {

  }, [])

  const fillMonth = () => {
    setFilter('month')
    setLabelBar(["May 2023", "Jun 2023", "Jul 2023", "Aug 2023", "Sep 2023", "Oct 2023"])
    setData([0, 0, 15000, 15000, 15000, 30000])
  }

  const fillWeek = () => {
    setFilter('week')
    setLabelBar(["01/10 - 07/10", "08/10 - 14/10", "15/10 - 21/10", "22/10 - 28/10", "29/10 - 31/10",])
    setData([15000, 15000, 15000, 30000, 30000])
  }

  const modeTotal = () => {
    setMode('total')
  }

  const modeChange = () => {
    setMode('change')
  }

  return (
    <div className={styled["chart-left"]}>
      <div className={styled["top-title"]}>
        <div className={styled["title-chart"]}><LineChartOutlined style={{ paddingRight: '10px' }} /> Revenue Analysis &#40;VND&#41;</div>
        <div className={styled["buttons-container"]}>
          <div className={styled["title-chart"]}>Mode</div>
          <button className={styled["button"]} disabled={mode === "total"} onClick={modeTotal}>
            Total
          </button>
          <button className={styled["button"]} disabled={mode === "change"} onClick={modeChange}>
            Change
          </button>
        </div>
      </div>
      <div className={styled["des-title"]}>
        <RangePicker />
        <div className={styled["buttons-container"]}>
          <div className={styled["title-chart"]}>Filter by</div>
          <button className={styled["button"]} disabled={filter === "month"} onClick={fillMonth}>
            Month
          </button>
          <button className={styled["button"]} disabled={filter === "week"} onClick={fillWeek}>
            Week
          </button>
        </div>
      </div>
      <div style={{ width: '85%', height: '85%', padding: 20 }}>
        <Line redraw data={dataBar} options={optionsBar} />
      </div>
    </div>
  );
};

export default ChartRevenue;

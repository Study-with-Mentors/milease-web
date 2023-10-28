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
import { BarChartOutlined, LoadingOutlined } from "@ant-design/icons";
import Color from "../../../../constants/Color";
import { useEffect, useState } from "react";
import { DatePicker, Spin } from "antd";

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

const { RangePicker } = DatePicker;

const ChartUser = () => {

  //User
  const [labelBar, setLabelBar] = useState(["May 2023", "Jun 2023", "Jul 2023", "Aug 2023", "Sep 2023", "Oct 2023"])

  const [data, setData] = useState<number[]>([])
  const [dataChange, setDataChange] = useState<number[]>([])

  const [dataPremium, setDataPremium] = useState<number[]>([])
  const [dataPremiumChange, setDataPremiumChange] = useState<number[]>([])

  const [filter, setFilter] = useState('month')
  const [mode, setMode] = useState('total')

  const [loading, setLoading] = useState(false)

  //For initialize
  useEffect(() => {
    setLoading(true)
    setTimeout(function () {
      setData([0, 1, 3, 4, 7, 10])
      setDataChange([0, 1, 2, 1, 3, 3])

      setDataPremium([0, 0, 1, 1, 2, 3])
      setDataPremiumChange([0, 0, 1, 0, 1, 1])
      setLoading(false)
    }, 3000);
  }, [])

  //For user change
  useEffect(() => {
    let newChangeData = [data[0]];
    for (let i = 1; i < data.length; i++) {
      newChangeData.push(data[i] - data[i - 1])
    }
    setDataChange(newChangeData)
  }, [data])

  //For premium change
  useEffect(() => {
    let newPremiumChangeData = [dataPremium[0]];
    for (let i = 1; i < dataPremium.length; i++) {
      newPremiumChangeData.push(dataPremium[i] - dataPremium[i - 1])
    }
    setDataPremiumChange(newPremiumChangeData)
  }, [dataPremium])

  const dataBar = {
    responsive: true,
    labels: labelBar,
    datasets: [
      {
        label: "Users",
        data: mode == "total" ? data : dataChange,
        borderColor: Color.main_red_color,
        backgroundColor: Color.main_red_color,
      },
      {
        label: "Premium Users",
        data: mode == "total" ? dataPremium : dataPremiumChange,
        borderColor: Color.dark_blue_color,
        backgroundColor: Color.dark_blue_color,
      },
    ],
  };

  const fillMonth = () => {
    setFilter('month')
    setLabelBar(["May 2023", "Jun 2023", "Jul 2023", "Aug 2023", "Sep 2023", "Oct 2023"])
    setData([0, 1, 3, 4, 7, 10])
    setDataPremium([0, 0, 1, 1, 2, 3])
  }

  const fillWeek = () => {
    setFilter('week')
    setLabelBar(["01/10 - 07/10", "08/10 - 14/10", "15/10 - 21/10", "22/10 - 28/10", "29/10 - 31/10",])
    setData([4, 4, 5, 7, 10])
    setDataPremium([1, 1, 2, 2, 3])
  }

  const modeTotal = () => {
    setMode('total')
  }

  const modeChange = () => {
    setMode('change')
  }

  return (
    <div className={styled["chart"]}>
      <div className={styled["top-title"]}>
        <div className={styled["title-chart"]}><BarChartOutlined style={{ paddingRight: '10px' }} /> User Analysis</div>
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
        <RangePicker disabled />
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
        {loading ? <Spin className={styled["spin"]} indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />} /> :
          <Bar redraw data={dataBar} options={optionsBar} />
        }
      </div>
    </div>
  );
};

export default ChartUser;

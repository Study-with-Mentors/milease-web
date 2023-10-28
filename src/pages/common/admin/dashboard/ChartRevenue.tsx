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
import { LineChartOutlined, LoadingOutlined } from "@ant-design/icons";
import Color from "../../../../constants/Color";
import { useEffect, useState } from "react";
import { DatePicker, Spin } from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import dayjs, { Dayjs } from "dayjs";
import { getMonthsAndYearsInRange } from "../../../../utils/dateFormat";

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

const disabledDate: RangePickerProps['disabledDate'] = (current) => {
  // Can not select days before today and today
  return current < dayjs('2023-10-01') || current > dayjs().endOf('day')
};

const ChartRevenue = () => {

  //Revenue
  const [labelBar, setLabelBar] = useState<string[]>([])
  const [data, setData] = useState<number[]>([])
  const [dataChange, setDataChange] = useState<number[]>([])
  const [filter, setFilter] = useState('month')
  const [mode, setMode] = useState('total')
  const [loading, setLoading] = useState(false)
  const [dateRange, setDateRange] = useState([new Date('2023-10-01').toISOString(), new Date().toISOString()])

  const dataBar = {
    responsive: true,
    labels: labelBar,
    datasets: [
      {
        data: mode == "total" ? data : dataChange,
        borderColor: Color.main_red_color,
        backgroundColor: Color.main_red_color,
      },
    ],
  };

  //For initialize, run only once
  useEffect(() => {
    setLoading(true)
    setLabelBar(getMonthsAndYearsInRange('2023-05-01', (new Date()).toISOString()))
    setData([0, 0, 15000, 15000, 15000, 45000])
    setDataChange([0, 0, 15000, 0, 0, 30000])
    setTimeout(() => {
      setLoading(false)
    }, 3000);
  }, [])

  //For switching mode or switching filter, set new changeData when main data changed
  useEffect(() => {
    let newChangeData = [data[0]];
    for (let i = 1; i < data.length; i++) {
      newChangeData.push(data[i] - data[i - 1])
    }
    setDataChange(newChangeData)
  }, [data])

  const fillMonth = () => {
    setFilter('month')
    setLabelBar(["May 2023", "Jun 2023", "Jul 2023", "Aug 2023", "Sep 2023", "Oct 2023"])
    setData([0, 0, 15000, 15000, 15000, 45000])
  }

  const fillWeek = () => {
    setFilter('week')
    setLabelBar(["01/10 - 07/10", "08/10 - 14/10", "15/10 - 21/10", "22/10 - 28/10", "29/10 - 31/10",])
    setData([15000, 15000, 30000, 30000, 45000])
  }

  const modeTotal = () => {
    setMode('total')
  }

  const modeChange = () => {
    setMode('change')
  }

  //For Range Picker
  const handleRangeChange = (values: [Dayjs | null, Dayjs | null] | null, formatString: [string, string]) => {
    if (values) {
      setDateRange(formatString)
    }
  };

  //Ok Date Click
  const onOKDateClick = () => {
    console.log([new Date(dateRange[0]).toISOString(), new Date(dateRange[1]).toISOString()])
    setLabelBar(getMonthsAndYearsInRange((new Date(dateRange[0])).toISOString(), (new Date(dateRange[1])).toISOString()))
  }

  return (
    <div className={styled["chart"]}>
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

        {/* Date Picker */}
        <div>
          <RangePicker onChange={handleRangeChange} disabledDate={disabledDate}
            defaultValue={[dayjs('2023-10-01'), dayjs().endOf('day')]} />
          <button style={{ borderRadius: '5px', padding: '3px 10px', marginLeft: '5px' }} onClick={onOKDateClick}>OK</button>
        </div>

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
          <Line redraw data={dataBar} options={optionsBar} />
        }
      </div>
    </div>
  );
};

export default ChartRevenue;

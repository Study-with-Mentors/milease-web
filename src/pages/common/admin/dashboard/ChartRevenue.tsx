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
import { getMonthsAndYearsLabelBar, splitDateRangeInWeeks, getWeekLabelBar, splitDateRangeInMonths, addOneMonthToDate } from "../../../../utils/dateFormat";
import { useQueries } from "react-query";
import { SearchUserParams, UserAPI } from "../../../../apis/UserAPI";

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

  const [fetchParams, setFetchParams] = useState<SearchUserParams[]>(splitDateRangeInWeeks(new Date('2023-10-01'), new Date()))
  const [fetchParamsMonth, setFetchParamsMonth] = useState<SearchUserParams[]>(splitDateRangeInMonths(new Date('2023-10-01'), new Date()))
  const [fetchDateRange, setFetchDateRange] = useState([new Date('2023-10-01').toISOString(), new Date().toISOString()])

  const [labelBar, setLabelBar] = useState<string[]>([])
  const [data, setData] = useState<number[]>([])
  const [dataChange, setDataChange] = useState<number[]>([])
  const [filter, setFilter] = useState('none')
  const [mode, setMode] = useState('none')
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

  //Premium User Data
  //Week
  const usersCountArr = useQueries(
    fetchParams.map(result => {
      return {
        queryKey: ['userPremium', result.lowerDate, result.upperDate],
        queryFn: async () => await UserAPI.getUserPremiumCount({
          lowerDate: addOneMonthToDate(result.lowerDate as string),
          upperDate: addOneMonthToDate(result.upperDate as string),
        }),
      }
    })
  )

  //Month
  const usersCountArrMonth = useQueries(
    fetchParamsMonth.map(result => {
      return {
        queryKey: ['userPremiumMonth', result.lowerDate, result.upperDate],
        queryFn: async () => await UserAPI.getUserPremiumCount({
          lowerDate: addOneMonthToDate(result.lowerDate as string),
          upperDate: addOneMonthToDate(result.upperDate as string),
        }),
      }
    })
  )

  useEffect(() => {
    usersCountArr.forEach(e => {
      e.refetch();
    });
  }, [fetchParams])

  useEffect(() => {
    usersCountArrMonth.forEach(e => {
      e.refetch();
    });
  }, [fetchParamsMonth])

  //For switching mode or switching filter, set new 'total' when 'change' changed
  useEffect(() => {
    const newTotal = dataChange.map((_, index, array) => {
      // Use array.slice(0, index + 1) to get a subarray containing elements up to the current index
      const subArray = array.slice(0, index + 1);
      // Calculate the sum of the subArray
      const sum = subArray.reduce((acc, currentValue) => acc + currentValue, 0);
      return sum;
    });
    setData(newTotal)
  }, [dataChange])

  const fillMonth = () => {
    setFilter('month')
    setLabelBar(getMonthsAndYearsLabelBar(fetchDateRange[0], fetchDateRange[1]))
    setDataChange(usersCountArrMonth.map((obj) => obj.data * 15000))
  }

  const fillWeek = () => {
    setFilter('week')
    setLabelBar(getWeekLabelBar(new Date(fetchDateRange[0]), new Date(fetchDateRange[1])))
    setDataChange(usersCountArr.map((obj) => obj.data * 15000))
  }

  const modeTotal = () => {
    setMode('total')
  }

  const modeChange = () => {
    setMode('change')
  }

  //For Range Picker, only change data when click OK
  const handleRangeChange = (values: [Dayjs | null, Dayjs | null] | null, formatString: [string, string]) => {
    if (values) {
      setDateRange(formatString)
    }
  };

  //Ok Date Click, set new date range, then refetch everything
  const onOKDateClick = () => {
    setFilter('none')
    setMode('none')
    setLabelBar([])
    setDataChange([])
    setFetchParams(splitDateRangeInWeeks(new Date(dateRange[0]), new Date(dateRange[1])))
    setFetchParamsMonth(splitDateRangeInMonths(new Date(dateRange[0]), new Date(dateRange[1])))
    setFetchDateRange(dateRange)
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
          <button style={{ borderRadius: '5px', padding: '3px 10px', marginLeft: '5px', color: 'white' }} onClick={onOKDateClick}>OK</button>
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
        {usersCountArr.every(a => a.isFetched) ||  usersCountArrMonth.every(a => a.isFetched) ?
          <Line redraw data={dataBar} options={optionsBar} />
          :
          <Spin className={styled["spin"]} indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />} />
        }
      </div>
    </div>
  );
};

export default ChartRevenue;

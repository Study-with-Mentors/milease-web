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
import { RangePickerProps } from "antd/es/date-picker";
import dayjs, { Dayjs } from "dayjs";
import { SearchUserParams, UserAPI } from "../../../../apis/UserAPI";
import { getMonthsAndYearsLabelBar, getWeekLabelBar, splitDateRangeInMonths, splitDateRangeInWeeks } from "../../../../utils/dateFormat";
import { useQueries } from "react-query";

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

const disabledDate: RangePickerProps['disabledDate'] = (current) => {
  // Can not select days before today and today
  return current < dayjs('2023-10-01') || current > dayjs().endOf('day')
};

const ChartUser = () => {

  const [fetchParams, setFetchParams] = useState<SearchUserParams[]>(splitDateRangeInWeeks(new Date('2023-10-01'), new Date()))
  const [fetchParamsMonth, setFetchParamsMonth] = useState<SearchUserParams[]>(splitDateRangeInMonths(new Date('2023-10-01'), new Date()))
  const [fetchDateRange, setFetchDateRange] = useState([new Date('2023-10-01').toISOString(), new Date().toISOString()])

  const [labelBar, setLabelBar] = useState(["May 2023", "Jun 2023", "Jul 2023", "Aug 2023", "Sep 2023", "Oct 2023"])

  const [data, setData] = useState<number[]>([])
  const [dataChange, setDataChange] = useState<number[]>([])

  const [dataPremium, setDataPremium] = useState<number[]>([])
  const [dataPremiumChange, setDataPremiumChange] = useState<number[]>([])

  const [filter, setFilter] = useState('none')
  const [mode, setMode] = useState('total')

  const [dateRange, setDateRange] = useState([new Date('2023-10-01').toISOString(), new Date().toISOString()])

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

  //User Data
  //User Week
  const usersCountArr = useQueries(
    fetchParams.map(result => {
      return {
        queryKey: ['user', result.lowerDate, result.upperDate],
        queryFn: async () => await UserAPI.getUserCount({
          lowerDate: result.lowerDate,
          upperDate: result.upperDate,
        }),
      }
    })
  )

  //User Month
  const usersCountArrMonth = useQueries(
    fetchParamsMonth.map(result => {
      return {
        queryKey: ['userMonth', result.lowerDate, result.upperDate],
        queryFn: async () => await UserAPI.getUserCount({
          lowerDate: result.lowerDate,
          upperDate: result.upperDate,
        }),
      }
    })
  )

  //Premium Week
  const usersPremiumCountArr = useQueries(
    fetchParams.map(result => {
      return {
        queryKey: ['userPremium', result.lowerDate, result.upperDate],
        queryFn: async () => await UserAPI.getUserPremiumCount({
          lowerDate: result.lowerDate,
          upperDate: result.upperDate,
        }),
      }
    })
  )

  //Premium Month
  const usersPremiumCountArrMonth = useQueries(
    fetchParamsMonth.map(result => {
      return {
        queryKey: ['userPremiumMonth', result.lowerDate, result.upperDate],
        queryFn: async () => await UserAPI.getUserPremiumCount({
          lowerDate: result.lowerDate,
          upperDate: result.upperDate,
        }),
      }
    })
  )

  useEffect(() => {
    usersCountArr.forEach(e => {
      e.refetch();
    });
    usersPremiumCountArr.forEach(e => {
      e.refetch();
    });
  }, [fetchParams])

  useEffect(() => {
    usersCountArrMonth.forEach(e => {
      e.refetch();
    });
    usersPremiumCountArrMonth.forEach(e => {
      e.refetch();
    });
  }, [fetchParamsMonth])

  //For user change
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

  //For premium change
  useEffect(() => {
    const newTotal = dataPremiumChange.map((_, index, array) => {
      // Use array.slice(0, index + 1) to get a subarray containing elements up to the current index
      const subArray = array.slice(0, index + 1);
      // Calculate the sum of the subArray
      const sum = subArray.reduce((acc, currentValue) => acc + currentValue, 0);
      return sum;
    });
    setDataPremium(newTotal)
  }, [dataPremiumChange])

  const fillMonth = () => {
    setFilter('month')
    setLabelBar(getMonthsAndYearsLabelBar(fetchDateRange[0], fetchDateRange[1]))
    setDataChange(usersCountArrMonth.map((obj) => obj.data))
    setDataPremiumChange(usersPremiumCountArrMonth.map((obj) => obj.data))
  }

  const fillWeek = () => {
    setFilter('week')
    setLabelBar(getWeekLabelBar(new Date(fetchDateRange[0]), new Date(fetchDateRange[1])))
    setDataChange(usersCountArr.map((obj) => obj.data))
    setDataPremiumChange(usersPremiumCountArr.map((obj) => obj.data))
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
    setLabelBar([])
    setDataChange([])
    setDataPremiumChange([])
    setFetchParams(splitDateRangeInWeeks(new Date(dateRange[0]), new Date(dateRange[1])))
    setFetchParamsMonth(splitDateRangeInMonths(new Date(dateRange[0]), new Date(dateRange[1])))
    setFetchDateRange(dateRange)
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
        {usersCountArr.every(a => a.isFetched) || usersCountArrMonth.every(a => a.isFetched) ||
          usersCountArr.every(a => a.isFetched) || usersCountArrMonth.every(a => a.isFetched) ?
          <Bar redraw data={dataBar} options={optionsBar} />
          :
          <Spin className={styled["spin"]} indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />} />
        }
      </div>
    </div>
  );
};

export default ChartUser;

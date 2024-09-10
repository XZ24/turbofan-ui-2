import { ApexOptions } from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";
import DefaultSelectOption from "@/components/SelectOption/DefaultSelectOption";

// 接收父组件传递的 customValue
interface RULProps {
  customValue: number;
}

const RUL: React.FC<RULProps> = ({ customValue }) => {
  const series = [65, 0, 0, 11];

  // 如果 customValue 改变，可以通过 key 强制刷新图表
  const chartKey = `chart-${customValue}`; // 当 customValue 改变时，key 也会随之改变

  const options: ApexOptions = {
    chart: {
      fontFamily: "Satoshi, sans-serif",
      type: "donut",
    },
    colors: ["#5750F1", "#5475E5", "#8099EC", "#ADBCF2"],
    labels: ["Desktop", "Tablet", "Mobile", "Unknown"],
    legend: {
      show: false,
      position: "bottom",
    },

    plotOptions: {
      pie: {
        donut: {
          size: "80%",
          background: "transparent",
          labels: {
            show: true,
            total: {
              show: true,
              showAlways: true,
              label: "",
              fontSize: "12px",
              fontWeight: "400",
              formatter: () => `${customValue}`, // 使用传递过来的 customValue
            },
            value: {
              show: true,
              fontSize: "50px",
              fontWeight: "bold",
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: 415,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  };

  // 根据 customValue 动态设置颜色和提示信息
  let borderColor = "#22ad5c"; // green
  let bgColor = "bg-green-light-7"; // green background
  let textColor = "#34d399"; // green text
  let message = "Your Engine Still Very Healthy";

  if (customValue <= 20) {
    borderColor = "#BC1C21"; // red
    bgColor = "bg-red-light-5"; // red background
    textColor = "#BC1C21"; // red text
    message = "Your Engine is in Critical Condition";
  } else if (customValue > 20 && customValue <= 50) {
    borderColor = "#FFB800"; // yellow
    bgColor = "bg-[#FEF5DE]"; // yellow background
    textColor = "#D0915C"; // yellow text
    message = "Your Engine Needs Attention Soon";
  }

  return (
    <div className="col-span-12 rounded-[10px] bg-white px-7.5 pb-7 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-5">
      <div className="mb-9 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
            Cycle
          </h4>
        </div>
        <div>
          <DefaultSelectOption options={["Monthly", "Yearly"]} />
        </div>
      </div>

      <div className="mb-2">
        <div className="mx-auto flex justify-center">
          {/* 使用 key 强制更新图表 */}
          <ReactApexChart key={chartKey} options={options} series={series} type="donut" />
        </div>
      </div>

      {/* 动态颜色和消息 */}
      <div className={`flex items-center justify-center w-full h-auto rounded-[10px] border-l-6 ${bgColor} px-7.5 py-2.5 dark:bg-[#1B1B24] dark:bg-opacity-30`} style={{ borderColor }}>
        <div className="w-full">
          <h5 className="text-body-sm font-bold leading-[18px]" style={{ color: textColor }}>
            {message}
          </h5>
          <p className="text-body-sm text-[#637381]">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RUL;

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

      <div className="flex items-center justify-center w-full h-auto rounded-[10px] border-l-6 border-green bg-green-light-7 px-7.5 py-2.5 dark:bg-[#1B1B24] dark:bg-opacity-30">
        <div className="w-full">
          <h5 className="text-body-sm font-bold leading-[18px] text-[#004434] dark:text-[#34D399]">
            Your Engine Still Very Healthy
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

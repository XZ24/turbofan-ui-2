import React from "react";

interface TemperatureStatProps {
  parameterValues: number[]; // 数组类型，包含数值
  parameterNames: string[]; // 数组类型，包含名称
  growthRates: number[]; // 只有目标参数的增长率
}

const TemperatureStat: React.FC<TemperatureStatProps> = ({
  parameterValues,
  parameterNames,
  growthRates
}) => {
  // 我们需要的参数名称列表
  const targetParameterNames = [
    "(Physical fan speed) (rpm)",
    "(Physical core speed) (rpm)",
    "(High-pressure turbines Cool air flow)",
    "(Low-pressure turbines Cool air flow)"
  ];

  // 手动查找每个参数的索引和值
  const fanSpeedIndex = parameterNames.indexOf(targetParameterNames[0]);
  const coreSpeedIndex = parameterNames.indexOf(targetParameterNames[1]);
  const hpcAirFlowIndex = parameterNames.indexOf(targetParameterNames[2]);
  const lpcAirFlowIndex = parameterNames.indexOf(targetParameterNames[3]);

  return (
    <div className="grid grid-cols-1 gap-4 mb-5 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      {/* 手动渲染每个参数的块 */}

      {/* Fan Speed */}
      <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark">
        <div className="my-2 flex items-center justify-between">
          <div>
            <h4 className="mb-1.5 text-heading-6 font-bold text-dark dark:text-white">
              {parameterValues[fanSpeedIndex]} {/* 显示参数值 */}
            </h4>
            <span className="text-body-sm font-medium">{parameterNames[fanSpeedIndex]}</span> {/* 显示参数名称 */}
          </div>
        </div>

        {/* Green block */}
        {parameterValues[fanSpeedIndex] >= 2388.05 && parameterValues[fanSpeedIndex] <= 2388.14 && (
          <div className="flex items-center justify-center mt-5 w-full h-auto rounded-[10px] border-l-6 border-green bg-green-light-7 px-7.5 py-2.5 dark:bg-[#1B1B24] dark:bg-opacity-30">
            <div className="w-full">
              <h5 className="text-body-sm font-bold leading-[18px] text-[#004434] dark:text-[#34D399]">
                Fan Speed is Optimal
              </h5>
            </div>
          </div>
        )}

        {/* Yellow block */}
        {((parameterValues[fanSpeedIndex] >= 2387.9 && parameterValues[fanSpeedIndex] < 2388.05)
        ||(parameterValues[fanSpeedIndex] > 2388.14 && parameterValues[fanSpeedIndex] <= 2388.56))
         && (
          <div className="flex items-center justify-center mt-5 w-full h-auto rounded-[10px] border-l-6 border-[#FFB800] bg-[#FEF5DE] px-7.5 py-2.5 dark:bg-[#1B1B24] dark:bg-opacity-30">
            <div className="w-full">
              <h5 className="text-body-sm font-bold leading-[18px] text-[#004434] dark:text-[#D0915C]">
                Fan Speed Warning
              </h5>
            </div>
          </div>
        )}

        {/* Red block */}
        {(parameterValues[fanSpeedIndex] < 2387.9 || parameterValues[fanSpeedIndex] > 2388.56) && (
          <div className="flex items-center justify-center mt-5 w-full h-auto rounded-[10px] border-l-6 border-[#BC1C21] bg-red-light-5 px-7.5 py-2.5 dark:bg-[#1B1B24] dark:bg-opacity-30">
            <div className="w-full">
              <h5 className="text-body-sm font-bold leading-[18px] text-[#BC1C21] dark:text-[#BC1C21]">
                Fan Speed Critical
              </h5>
            </div>
          </div>
        )}

      </div>

      {/* Core Speed */}
      <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark">
        <div className="my-2 flex items-center justify-between">
          <div>
            <h4 className="mb-1.5 text-heading-6 font-bold text-dark dark:text-white">
              {parameterValues[coreSpeedIndex]} {/* 显示参数值 */}
            </h4>
            <span className="text-body-sm font-medium">{parameterNames[coreSpeedIndex]}</span> {/* 显示参数名称 */}
          </div>
        </div>

        {/* Green block */}
        {parameterValues[coreSpeedIndex] >= 9053.1 && parameterValues[coreSpeedIndex] <= 9069.42 && (
          <div className="flex items-center justify-center mt-5 w-full h-auto rounded-[10px] border-l-6 border-green bg-green-light-7 px-7.5 py-2.5 dark:bg-[#1B1B24] dark:bg-opacity-30">
            <div className="w-full">
              <h5 className="text-body-sm font-bold leading-[18px] text-[#004434] dark:text-[#34D399]">
                Core Speed is Optimal
              </h5>
            </div>
          </div>
        )}

        {/* Yellow block */}
        {((parameterValues[coreSpeedIndex] >= 9021.73 && parameterValues[coreSpeedIndex] < 9053.1)
        ||(parameterValues[coreSpeedIndex] > 9069.42 && parameterValues[coreSpeedIndex] <= 9244.59)) && (
          <div className="flex items-center justify-center mt-5 w-full h-auto rounded-[10px] border-l-6 border-[#FFB800] bg-[#FEF5DE] px-7.5 py-2.5 dark:bg-[#1B1B24] dark:bg-opacity-30">
            <div className="w-full">
              <h5 className="text-body-sm font-bold leading-[18px] text-[#004434] dark:text-[#D0915C]">
                Core Speed Warning
              </h5>
            </div>
          </div>
        )}

        {/* Red block */}
        {(parameterValues[coreSpeedIndex] < 9021.73 || parameterValues[coreSpeedIndex] > 9244.59) && (
          <div className="flex items-center justify-center mt-5 w-full h-auto rounded-[10px] border-l-6 border-[#BC1C21] bg-red-light-5 px-7.5 py-2.5 dark:bg-[#1B1B24] dark:bg-opacity-30">
            <div className="w-full">
              <h5 className="text-body-sm font-bold leading-[18px] text-[#BC1C21] dark:text-[#BC1C21]">
                Core Speed Critical
              </h5>
            </div>
          </div>
        )}

      </div>

      {/* High-pressure turbines Cool air flow */}
      <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark">
        <div className="my-2 flex items-center justify-between">
          <div>
            <h4 className="mb-1.5 text-heading-6 font-bold text-dark dark:text-white">
              {parameterValues[hpcAirFlowIndex]} {/* 显示参数值 */}
            </h4>
            <span className="text-body-sm font-medium">{parameterNames[hpcAirFlowIndex]}</span> {/* 显示参数名称 */}
          </div>
        </div>

        {/* Green block */}
        {parameterValues[hpcAirFlowIndex] >= 38.7 && parameterValues[hpcAirFlowIndex] <= 38.95 && (
          <div className="flex items-center justify-center mt-5 w-full h-auto rounded-[10px] border-l-6 border-green bg-green-light-7 px-7.5 py-2.5 dark:bg-[#1B1B24] dark:bg-opacity-30">
            <div className="w-full">
              <h5 className="text-body-sm font-bold leading-[18px] text-[#004434] dark:text-[#34D399]">
                HPC Air Flow is Optimal
              </h5>
            </div>
          </div>
        )}

        {/* Yellow block */}
        {((parameterValues[hpcAirFlowIndex] >= 38.14 && parameterValues[hpcAirFlowIndex] < 38.7)
        ||(parameterValues[hpcAirFlowIndex] > 38.95 && parameterValues[hpcAirFlowIndex] <= 39.43)) && (
          <div className="flex items-center justify-center mt-5 w-full h-auto rounded-[10px] border-l-6 border-[#FFB800] bg-[#FEF5DE] px-7.5 py-2.5 dark:bg-[#1B1B24] dark:bg-opacity-30">
            <div className="w-full">
              <h5 className="text-body-sm font-bold leading-[18px] text-[#004434] dark:text-[#D0915C]">
                HPC Air Flow Warning
              </h5>
            </div>
          </div>
        )}

        {/* Red block */}
        {(parameterValues[hpcAirFlowIndex] < 38.14 || parameterValues[hpcAirFlowIndex] > 39.43) && (
          <div className="flex items-center justify-center mt-5 w-full h-auto rounded-[10px] border-l-6 border-[#BC1C21] bg-red-light-5 px-7.5 py-2.5 dark:bg-[#1B1B24] dark:bg-opacity-30">
            <div className="w-full">
              <h5 className="text-body-sm font-bold leading-[18px] text-[#BC1C21] dark:text-[#BC1C21]">
                HPC Air Flow Critical
              </h5>
            </div>
          </div>
        )}
        
      </div>

      {/* Low-pressure turbines Cool air flow */}
      <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark">
        <div className="my-2 flex items-center justify-between">
          <div>
            <h4 className="mb-1.5 text-heading-6 font-bold text-dark dark:text-white">
              {parameterValues[lpcAirFlowIndex]} {/* 显示参数值 */}
            </h4>
            <span className="text-body-sm font-medium">{parameterNames[lpcAirFlowIndex]}</span> {/* 显示参数名称 */}
          </div>
        </div>

        {/* Green block */}
        {parameterValues[lpcAirFlowIndex] >= 23.2218 && parameterValues[lpcAirFlowIndex] <= 23.3668 && (
          <div className="flex items-center justify-center mt-5 w-full h-auto rounded-[10px] border-l-6 border-green bg-green-light-7 px-7.5 py-2.5 dark:bg-[#1B1B24] dark:bg-opacity-30">
            <div className="w-full">
              <h5 className="text-body-sm font-bold leading-[18px] text-[#004434] dark:text-[#34D399]">
                LPC Air Flow is Optimal
              </h5>
            </div>
          </div>
        )}

        {/* Yellow block */}
        {((parameterValues[lpcAirFlowIndex] >= 22.8942 && parameterValues[lpcAirFlowIndex] < 23.2218)
        || (parameterValues[lpcAirFlowIndex] > 23.3668 && parameterValues[lpcAirFlowIndex] <= 23.6184)) && (
          <div className="flex items-center justify-center mt-5 w-full h-auto rounded-[10px] border-l-6 border-[#FFB800] bg-[#FEF5DE] px-7.5 py-2.5 dark:bg-[#1B1B24] dark:bg-opacity-30">
            <div className="w-full">
              <h5 className="text-body-sm font-bold leading-[18px] text-[#004434] dark:text-[#D0915C]">
                LPC Air Flow Warning
              </h5>
            </div>
          </div>
        )}

        {/* Red block */}
        {(parameterValues[lpcAirFlowIndex] < 22.8942 || parameterValues[lpcAirFlowIndex] > 23.6184) && (
          <div className="flex items-center justify-center mt-5 w-full h-auto rounded-[10px] border-l-6 border-[#BC1C21] bg-red-light-5 px-7.5 py-2.5 dark:bg-[#1B1B24] dark:bg-opacity-30">
            <div className="w-full">
              <h5 className="text-body-sm font-bold leading-[18px] text-[#BC1C21] dark:text-[#BC1C21]">
                LPC Air Flow Critical
              </h5>
            </div>
          </div>
        )}

      </div>




    </div>
  );
};

export default TemperatureStat;

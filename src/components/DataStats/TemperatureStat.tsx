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
    "(Fan inlet temperature) (◦R)",
    "(LPC outlet temperature) (◦R)",
    "(HPC outlet temperature) (◦R)",
    "(LPT outlet temperature) (◦R)"
  ];

  // 手动获取每个目标参数的值和增长率
  const fanInletIndex = parameterNames.indexOf(targetParameterNames[0]);
  const lpcOutletIndex = parameterNames.indexOf(targetParameterNames[1]);
  const hpcOutletIndex = parameterNames.indexOf(targetParameterNames[2]);
  const lptOutletIndex = parameterNames.indexOf(targetParameterNames[3]);

  return (
    <div className="grid grid-cols-1 gap-4 mb-5 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      
      {/* Fan Inlet Temperature */}
      <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark">
        <div className="my-2 flex items-center justify-between">
          <div>
            <h4 className="mb-1.5 text-heading-6 font-bold text-dark dark:text-white">
              {parameterValues[fanInletIndex]}
            </h4>
            <span className="text-body-sm font-medium">{parameterNames[fanInletIndex]}</span>
          </div>
        </div>
        {/* Green block */}
        {parameterValues[fanInletIndex] >= 510 && parameterValues[fanInletIndex] <= 520 && (
          <div className="flex items-center justify-center mt-5 w-full h-auto rounded-[10px] border-l-6 border-green bg-green-light-7 px-7.5 py-2.5 dark:bg-[#1B1B24] dark:bg-opacity-30">
            <div className="w-full">
              <h5 className="text-body-sm font-bold leading-[18px] text-[#004434] dark:text-[#34D399]">
                Fan Inlet Temperature is Optimal
              </h5>
            </div>
          </div>
        )}

        {/* Yellow block */}
        {parameterValues[fanInletIndex] >= 201 && parameterValues[fanInletIndex] <= 300 && (
          <div className="flex items-center justify-center mt-5 w-full h-auto rounded-[10px] border-l-6 border-[#FFB800] bg-[#FEF5DE] px-7.5 py-2.5 dark:bg-[#1B1B24] dark:bg-opacity-30">
            <div className="w-full">
              <h5 className="text-body-sm font-bold leading-[18px] text-[#004434] dark:text-[#D0915C]">
                Fan Inlet Temperature Warning
              </h5>
            </div>
          </div>
        )}

        {/* Red block */}
        {parameterValues[fanInletIndex] >= 530 && (
          <div className="flex items-center justify-center mt-5 w-full h-auto rounded-[10px] border-l-6 border-[#BC1C21] bg-red-light-5 px-7.5 py-2.5 dark:bg-[#1B1B24] dark:bg-opacity-30">
            <div className="w-full">
              <h5 className="text-body-sm font-bold leading-[18px] text-[#BC1C21] dark:text-[#BC1C21]">
                Fan Inlet Temperature Critical
              </h5>
            </div>
          </div>
        )}
      </div>

      {/* LPC Outlet Temperature */}
      <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark">
        <div className="my-2 flex items-center justify-between">
          <div>
            <h4 className="mb-1.5 text-heading-6 font-bold text-dark dark:text-white">
              {parameterValues[lpcOutletIndex]}
            </h4>
            <span className="text-body-sm font-medium">{parameterNames[lpcOutletIndex]}</span>
          </div>
        </div>
        {/* Green block */}
        {parameterValues[lpcOutletIndex] >= 642.325 && parameterValues[lpcOutletIndex] <= 643.00 && (
          <div className="flex items-center justify-center mt-5 w-full h-auto rounded-[10px] border-l-6 border-green bg-green-light-7 px-7.5 py-2.5 dark:bg-[#1B1B24] dark:bg-opacity-30">
            <div className="w-full">
              <h5 className="text-body-sm font-bold leading-[18px] text-[#004434] dark:text-[#34D399]">
                LPC Outlet Temperature is Optimal
              </h5>
            </div>
          </div>
        )}

        {/* Yellow block */}
        { ((parameterValues[lpcOutletIndex] >= 641.21 && parameterValues[lpcOutletIndex] < 642.325) 
          || (parameterValues[lpcOutletIndex] > 643.00 && parameterValues[lpcOutletIndex] <= 644.53) )
        && (
          <div className="flex items-center justify-center mt-5 w-full h-auto rounded-[10px] border-l-6 border-[#FFB800] bg-[#FEF5DE] px-7.5 py-2.5 dark:bg-[#1B1B24] dark:bg-opacity-30">
            <div className="w-full">
              <h5 className="text-body-sm font-bold leading-[18px] text-[#004434] dark:text-[#D0915C]">
                LPC Outlet Temperature Warning
              </h5>
            </div>
          </div>
        )}

        {/* Red block */}
        {(parameterValues[lpcOutletIndex] < 641.21 || parameterValues[lpcOutletIndex] > 644.53) && (
          <div className="flex items-center justify-center mt-5 w-full h-auto rounded-[10px] border-l-6 border-[#BC1C21] bg-red-light-5 px-7.5 py-2.5 dark:bg-[#1B1B24] dark:bg-opacity-30">
            <div className="w-full">
              <h5 className="text-body-sm font-bold leading-[18px] text-[#BC1C21] dark:text-[#BC1C21]">
                LPC Outlet Temperature Critical
              </h5>
            </div>
          </div>
        )}
      </div>

      {/* HPC Outlet Temperature */}
      <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark">
        <div className="my-2 flex items-center justify-between">
          <div>
            <h4 className="mb-1.5 text-heading-6 font-bold text-dark dark:text-white">
              {parameterValues[hpcOutletIndex]}
            </h4>
            <span className="text-body-sm font-medium">{parameterNames[hpcOutletIndex]}</span>
          </div>
        </div>
        {/* Green block */}
        {parameterValues[hpcOutletIndex] >= 1586.26 && parameterValues[hpcOutletIndex] <= 1594.38 && (
          <div className="flex items-center justify-center mt-5 w-full h-auto rounded-[10px] border-l-6 border-green bg-green-light-7 px-7.5 py-2.5 dark:bg-[#1B1B24] dark:bg-opacity-30">
            <div className="w-full">
              <h5 className="text-body-sm font-bold leading-[18px] text-[#004434] dark:text-[#34D399]">
                HPC Outlet Temperature is Optimal
              </h5>
            </div>
          </div>
        )}

        {/* Yellow block */}
        {((parameterValues[hpcOutletIndex] >= 1571.04 && parameterValues[hpcOutletIndex] < 1586.26) 
        || (parameterValues[hpcOutletIndex] > 1594.38 && parameterValues[hpcOutletIndex] <= 1616.91) ) && (
          <div className="flex items-center justify-center mt-5 w-full h-auto rounded-[10px] border-l-6 border-[#FFB800] bg-[#FEF5DE] px-7.5 py-2.5 dark:bg-[#1B1B24] dark:bg-opacity-30">
            <div className="w-full">
              <h5 className="text-body-sm font-bold leading-[18px] text-[#004434] dark:text-[#D0915C]">
                HPC Outlet Temperature Warning
              </h5>
            </div>
          </div>
        )}

        {/* Red block */}
        {(parameterValues[hpcOutletIndex] < 1571.04 || parameterValues[hpcOutletIndex] > 1616.91) && (
          <div className="flex items-center justify-center mt-5 w-full h-auto rounded-[10px] border-l-6 border-[#BC1C21] bg-red-light-5 px-7.5 py-2.5 dark:bg-[#1B1B24] dark:bg-opacity-30">
            <div className="w-full">
              <h5 className="text-body-sm font-bold leading-[18px] text-[#BC1C21] dark:text-[#BC1C21]">
                HPC Outlet Temperature Critical
              </h5>
            </div>
          </div>
        )}
      </div>
      

      {/* LPT Outlet Temperature */}
      <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark">
        <div className="my-2 flex items-center justify-between">
          <div>
            <h4 className="mb-1.5 text-heading-6 font-bold text-dark dark:text-white">
              {parameterValues[lptOutletIndex]}
            </h4>
            <span className="text-body-sm font-medium">{parameterNames[lptOutletIndex]}</span>
          </div>
        </div>

        {/* Green block */}
        {parameterValues[lptOutletIndex] >= 1402.36 && parameterValues[lptOutletIndex] <= 1414.554 && (
          <div className="flex items-center justify-center mt-5 w-full h-auto rounded-[10px] border-l-6 border-green bg-green-light-7 px-7.5 py-2.5 dark:bg-[#1B1B24] dark:bg-opacity-30">
            <div className="w-full">
              <h5 className="text-body-sm font-bold leading-[18px] text-[#004434] dark:text-[#34D399]">
                LPT Outlet Temperature is Optimal
              </h5>
            </div>
          </div>
        )}

        {/* Yellow block */}
        {((parameterValues[lptOutletIndex] >= 1382.25 && parameterValues[lptOutletIndex] < 1402.36) 
        ||(parameterValues[lptOutletIndex] > 1414.554 && parameterValues[lptOutletIndex] <= 1441.49)
      ) && (
          <div className="flex items-center justify-center mt-5 w-full h-auto rounded-[10px] border-l-6 border-[#FFB800] bg-[#FEF5DE] px-7.5 py-2.5 dark:bg-[#1B1B24] dark:bg-opacity-30">
            <div className="w-full">
              <h5 className="text-body-sm font-bold leading-[18px] text-[#004434] dark:text-[#D0915C]">
                LPT Outlet Temperature Warning
              </h5>
            </div>
          </div>
        )}

        {/* Red block */}
        {(parameterValues[lptOutletIndex] < 1382.25 || parameterValues[lptOutletIndex] > 1441.49) && (
          <div className="flex items-center justify-center mt-5 w-full h-auto rounded-[10px] border-l-6 border-[#BC1C21] bg-red-light-5 px-7.5 py-2.5 dark:bg-[#1B1B24] dark:bg-opacity-30">
            <div className="w-full">
              <h5 className="text-body-sm font-bold leading-[18px] text-[#BC1C21] dark:text-[#BC1C21]">
                LPT Outlet Temperature Critical
              </h5>
            </div>
          </div>
        )}
      </div>

        
    </div>
  );
};

export default TemperatureStat;

"use client";
import React from "react";
import Parameter from "@/components/ParameterInsert/Parameter";

// 定义 props 类型
interface SettingBoxesProps {
  parameterValues: number[]; // 数组类型，包含数值
  parameterNames: string[]; // 数组类型，包含名称
  updateParameterValue: (index: number, newValue: number) => void; // 更新单个值的函数
  updateArrayValue: (arrayName: string, newArray: number[]) => void; // 更新数组中某个值的函数
  onPredict: (predictionValue: number) => void;
}

const SettingBoxes_E: React.FC<SettingBoxesProps> = ({ parameterValues, parameterNames, updateParameterValue, updateArrayValue, onPredict }) => {
  
  // 使用 FileReader 读取 CSV 文件并解析
  const handleCSVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const text = e.target?.result as string;
        const rows = text.split("\n"); // 按行分割CSV
  
        if (rows.length > 1) { // 确保至少有一行以上数据
          const cycles: number[] = []; // 用于存储 cycles 数组
          const HPC_Temperature_percycle: number[] = []; // 用于存储 HPC 温度
          const LPT_Temperature_percycle: number[] = []; // 用于存储 LPT 温度
          const High_pressure_turbines: number[] = []; // 用于存储高压涡轮数据
          const Low_pressure_turbines: number[] = []; // 用于存储低压涡轮数据
          const RUL_percycle: number[] = []; // 用于存储 RUL 数据
  
          rows.forEach((row) => {
            const columns = row.split(","); // 拆分每一行
            if (columns.length >= 26) {
              // 提取数据并转换为数字
              cycles.push(Number(columns[0]));
              HPC_Temperature_percycle.push(Number(columns[6]));
              LPT_Temperature_percycle.push(Number(columns[7]));
              High_pressure_turbines.push(Number(columns[23]));
              Low_pressure_turbines.push(Number(columns[24]));
              RUL_percycle.push(Number(columns[25]));
            }
          });
  
          // 输出提取的数组数据以便调试
          console.log("Cycles: ", cycles);
          console.log("HPC_Temperature_percycle: ", HPC_Temperature_percycle);
          console.log("LPT_Temperature_percycle: ", LPT_Temperature_percycle);
          console.log("High_pressure_turbines: ", High_pressure_turbines);
          console.log("Low_pressure_turbines: ", Low_pressure_turbines);
          console.log("RUL_percycle: ", RUL_percycle);
  
          // 更新对应的数组
          updateArrayValue("cycles", cycles);
          updateArrayValue("HPC_Temperature_percycle", HPC_Temperature_percycle);
          updateArrayValue("LPT_Temperature_percycle", LPT_Temperature_percycle);
          updateArrayValue("High_pressure_turbines", High_pressure_turbines);
          updateArrayValue("Low_pressure_turbines", Low_pressure_turbines);
          updateArrayValue("RUL_percycle", RUL_percycle);

          const lastRow = rows[rows.length - 2]; // 取倒数第二行，倒数第一行为空行
          const lastRowValues = lastRow.split(",").slice(0, 25).map(Number); // 提取前25列并转换为数值
          console.log("Last row values for parameter update: ", lastRowValues);

          // 更新 parameterValues
          lastRowValues.forEach((value, index) => {
            updateParameterValue(index, value); // 更新每个参数
          });
  
        } else {
          console.error("CSV文件没有足够的行数据！");
        }
      };
      reader.readAsText(file);
    }
  };
  
  
  

  // 处理Predict按钮的点击事件
  const handlePredict = async () => {
    console.log("Current Parameter Values:", parameterValues);
  
    // 发送 POST 请求到 API
    try {
      const response = await fetch("http://localhost:8000/predict/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          testing_sample_array: parameterValues, // 将当前的 parameterValues 发送到 API
        }),
      });
  
      // 解析响应
      if (response.ok) {
        const result = await response.json();
        const prediction = result.prediction[0];
        console.log("Prediction Result:", result.prediction); // 打印预测结果
        onPredict(prediction);
      } else {
        console.error("API Error:", response.statusText);
      }
    } catch (error) {
      console.error("Request Failed:", error);
    }
  };
  

  return (
    <>
      <div className="grid grid-cols-12 gap-6 pb-10">
        <div className="col-span-12">
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12">
                <div className="border-b border-stroke px-7 py-4 dark:border-dark-3">
                  <div className="flex justify-between items-center">
                    <div className="flex justify-between items-center gap-10">
                      <h3 className="font-medium text-dark dark:text-white">
                        Personal Information
                      </h3>
                      <div>
                        <input
                          type="file"
                          accept=".csv"
                          onChange={handleCSVUpload} // 处理CSV上传
                          className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-[#E2E8F0] file:px-6.5 file:py-[10px] file:text-body-sm file:font-medium file:text-dark-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-dark dark:border-dark-3 dark:bg-dark-2 dark:file:border-dark-3 dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="flex">
                      <button
                        className="flex items-center justify-center rounded-[7px] border border-stroke p-5 m-2 font-medium text-dark hover:shadow-1 dark:border-dark-3 dark:text-white"
                        type="submit"
                        onClick={handlePredict}
                      >
                        Predict
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* 渲染每个Parameter，传递名称和值 */}
              {parameterValues && parameterNames && parameterValues.length === parameterNames.length ? (
                parameterValues.map((value, index) => (
                  <Parameter
                    key={index}
                    name={parameterNames[index]} // 传递名称
                    value={value}
                    onChange={(newValue) => updateParameterValue(index, newValue)}
                  />
                ))
              ) : (
                <p className="text-red-500">参数值和名称长度不匹配或数据未加载</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingBoxes_E;

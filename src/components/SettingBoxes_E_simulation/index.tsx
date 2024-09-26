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

const SettingBoxes_E_simulation: React.FC<SettingBoxesProps> = ({ parameterValues, parameterNames, updateParameterValue, updateArrayValue, onPredict }) => {
  
  // 使用 FileReader 读取 CSV 文件并解析
  const handleCSVUpload = () => {
    // Fetch CSV file from FastAPI
    fetch('http://127.0.0.1:8000/download-csv') // Fetch from FastAPI endpoint
      .then(response => response.text())  // Get the response as text
      .then(text => {
        const rows = text.split("\n"); // Split CSV by rows
  
        if (rows.length > 1) {
          // Make sure there is at least one row of data
          const cycles: number[] = []; // To store cycles array
          const HPC_Temperature_percycle: number[] = []; // To store HPC temperature
          const LPT_Temperature_percycle: number[] = []; // To store LPT temperature
          const High_pressure_turbines: number[] = []; // To store high-pressure turbines data
          const Low_pressure_turbines: number[] = []; // To store low-pressure turbines data
          const RUL_percycle: number[] = []; // To store RUL data
  
          let currentRowIndex = 0; // Start with the first row
          const updateInterval = 3000; // 3 seconds interval
  
          // Function to update parameters
          const updateParameters = () => {
            if (currentRowIndex >= rows.length - 1) {
              clearInterval(interval); // Stop when all rows are processed
              return;
            }
  
            const row = rows[currentRowIndex];
            const columns = row.split(","); // Split row into columns
  
            if (columns.length >= 26) {
              // Extract data and convert to numbers
              cycles.push(Number(columns[0]));
              HPC_Temperature_percycle.push(Number(columns[6]));
              LPT_Temperature_percycle.push(Number(columns[7]));
              High_pressure_turbines.push(Number(columns[23]));
              Low_pressure_turbines.push(Number(columns[24]));
              RUL_percycle.push(Number(columns[25]));
  
              // Update the arrays with the new data
              updateArrayValue("cycles", cycles);
              updateArrayValue("HPC_Temperature_percycle", HPC_Temperature_percycle);
              updateArrayValue("LPT_Temperature_percycle", LPT_Temperature_percycle);
              updateArrayValue("High_pressure_turbines", High_pressure_turbines);
              updateArrayValue("Low_pressure_turbines", Low_pressure_turbines);
              updateArrayValue("RUL_percycle", RUL_percycle);
  
              // Update parameterValues for the last row extracted
              const rowValues = columns.slice(0, 25).map(Number); // Extract the first 25 columns and convert to numbers
              rowValues.forEach((value, index) => {
                updateParameterValue(index, value); // Update each parameter
              });
  
              console.log(`Updated for row ${currentRowIndex + 1}`);
  
              // Automatically trigger prediction with the updated parameterValues
              onPredict(Number(columns[25]));
            }
  
            currentRowIndex++; // Move to the next row
          };
  
          // Set an interval to update parameters every 3 seconds
          const interval = setInterval(updateParameters, updateInterval);
  
          // Start by updating the first row immediately
          updateParameters();
        } else {
          console.error("CSV file does not have enough rows!");
        }
      })
      .catch(error => {
        console.error('Error fetching the CSV file:', error);
      });
  };
  
  
  
  
  
  

  // 处理Predict按钮的点击事件
  // Assuming the handlePredict function exists in the component as before
  const handlePredict = async (updatedParameterValues: number[]) => {
    console.log("Current Parameter Values:", updatedParameterValues);
  
    // Sending POST request to API for prediction
    try {
      const response = await fetch("http://localhost:8000/predict/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          testing_sample_array: updatedParameterValues, // Send updated parameter values to the API
        }),
      });
  
      // Parse response
      if (response.ok) {
        const result = await response.json();
        const prediction = result.prediction[0];
        console.log("Prediction Result:", result.prediction); // Print the prediction result
        onPredict(prediction); // Update the prediction result
      } else {
        console.error("API Error:", response.statusText);
      }
    } catch (error) {
      console.error("Request Failed:", error);
    }
  };

  return (
    <>
      <div className="grid grid-cols-12 gap-6 pb-5">
        <div className="col-span-12">
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12">
                <div className=" border-stroke px-7 py-4 dark:border-dark-3">
                  <div className="flex justify-between items-center">
                    <div className="flex justify-between items-center gap-10">
                      <h3 className="font-medium text-dark dark:text-white">
                        Personal Information
                      </h3>
                      {/* <div>
                        <input
                          type="file"
                          accept=".csv"
                          onChange={handleCSVUpload} // 处理CSV上传
                          className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-[#E2E8F0] file:px-6.5 file:py-[10px] file:text-body-sm file:font-medium file:text-dark-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-dark dark:border-dark-3 dark:bg-dark-2 dark:file:border-dark-3 dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                        />
                      </div> */}
                    </div>

                    <div className="flex">
                      <button
                        className="flex items-center justify-center rounded-[7px] border border-stroke p-5 m-2 font-medium text-dark hover:shadow-1 dark:border-dark-3 dark:text-white"
                        type="submit"
                        onClick={handleCSVUpload}
                      >
                        Predict
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingBoxes_E_simulation;

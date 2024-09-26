"use client";
import React, { useState } from "react";
import SettingBoxes_E_close from "@/components/SettingBoxes_E_close";
import RUL from "@/components/Charts/RUL";
import TemperatureStat from "@/components/DataStats/TemperatureStat";
import FanCoreStat  from "@/components/DataStats/Fan&CoreStat";
import ChartOne_RUL from "@/components/Charts/ChartOne_RUL";
import ChartOne_Temp from "@/components/Charts/ChartOne_Temp";
import ChartOne_Pressure from "@/components/Charts/ChartOne_Pressure";
import SettingBoxes_E_simulation from "../SettingBoxes_E_simulation";

const RUL_Predict_1: React.FC = () => {
  const [parameterValues, setParameterValues] = useState([1,
    1,
    -0.0007,
    -0.0004,
    100.0,
    518.67,
    641.82,
    1589.70,
    1400.60,
    14.62,
    521.66,
    2388.02,
    8138.62,
    8.4195,
    0.03,
    392,
    2388,
    100.0,
    39.06,
    23.4190,
    1,
    1,
    1,
    1,
    1
  ]);
  
  const parameterNames =['cycle',
    'setting_1', 
    'setting_2', 
    'setting_3',					
    "(Fan inlet temperature) (◦R)",
    "(LPC outlet temperature) (◦R)",
    "(HPC outlet temperature) (◦R)",
    "(LPT outlet temperature) (◦R)",
    "(Fan inlet Pressure) (psia)",
    "(bypass-duct pressure) (psia)",
    "(HPC outlet pressure) (psia)",
    "(Physical fan speed) (rpm)",
    "(Physical core speed) (rpm)",
    "(Engine pressure ratio(P50/P2)",
    "(HPC outlet Static pressure) (psia)",
    "(Ratio of fuel flow to Ps30) (pps/psia)",
    "(Corrected fan speed) (rpm)",
    "(Corrected core speed) (rpm)",
    "(Bypass Ratio) ",
    "(Burner fuel-air ratio)",
    "(Bleed Enthalpy)",
    "(Required fan speed)",
    "(Required fan conversion speed)",
    "(High-pressure turbines Cool air flow)",
    "(Low-pressure turbines Cool air flow)" 
    ]
  
  const temperature_growrate = [0.1 , 0.2 , 0.3, 0.5 ]
  const [customValue, setCustomValue] = useState(80); 
  const [cycles, setCycles] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [RUL_percycle, setRUL_percycle] = useState([100, 100, 100, 95, 85, 80, 65, 60, 50]);
  const [HPC_Temperature_percycle, setHPC_Temperature_percycle] = useState([1589.8, 1589.8, 1589.8, 1589.8, 1589.8, 1589.8, 1589.8, 1589.8, 1589.8]);
  const [LPT_Temperature_percycle, setLPT_Temperature_percycle] = useState([1489.82, 1489.82, 1489.8, 1481.8, 1489.8, 1481.8, 1489.8, 1489.82, 1489.8]);
  const [High_pressure_turbines, setHigh_pressure_turbines] = useState([300, 300, 300, 300, 300, 300, 300, 300, 300]);
  const [Low_pressure_turbines, setLow_pressure_turbines] = useState([300, 300, 300, 300, 300, 300, 300, 300, 300]);

  const updateArrayValue = (arrayName: string, newArray: number[]) => {
    switch (arrayName) {
      case "cycles":
        setCycles(newArray); // 直接设置新的 cycles 数组
        break;
      case "RUL_percycle":
        setRUL_percycle(newArray); // 直接设置新的 RUL_percycle 数组
        break;
      case "HPC_Temperature_percycle":
        setHPC_Temperature_percycle(newArray); // 直接设置新的 HPC_Temperature_percycle 数组
        break;
      case "LPT_Temperature_percycle":
        setLPT_Temperature_percycle(newArray); // 直接设置新的 LPT_Temperature_percycle 数组
        break;
      case "High_pressure_turbines":
        setHigh_pressure_turbines(newArray); // 直接设置新的 High_pressure_turbines 数组
        break;
      case "Low_pressure_turbines":
        setLow_pressure_turbines(newArray); // 直接设置新的 Low_pressure_turbines 数组
        break;
      default:
        console.error("Unknown array name!");
    }
  };

  // 更新单个Parameter的值
  const updateParameterValue = (index: number, newValue: number) => {
    setParameterValues((prevValues) =>
      prevValues.map((value, i) => (i === index ? newValue : value))
    );
  };

  // 模拟更新 customValue 的函数
  const updateCustomValue = () => {
    setCustomValue(Math.floor(Math.random() * 100)); // 随机更新 customValue
  };

  const handlePredictResult = (predictionValue: number) => {
    setCustomValue(predictionValue); // 将预测结果设置为 customValue
  };


  return (
    <>
      <SettingBoxes_E_simulation
        parameterValues={parameterValues}
        parameterNames={parameterNames}
        updateParameterValue={updateParameterValue}
        updateArrayValue = {updateArrayValue}
        onPredict={handlePredictResult}
      />


      <div className="mb-7 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-1 2xl:gap-7.5">
        <ChartOne_RUL cycles={cycles} RUL_percycle={RUL_percycle} />
        <RUL customValue={customValue} />
        
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
        <ChartOne_Temp
          cycles={cycles}
          HPC_Temperature_percycle={HPC_Temperature_percycle}
          LPT_Temperature_percycle={LPT_Temperature_percycle}
        />
        <ChartOne_Pressure
          cycles={cycles}
          High_pressure_turbines={High_pressure_turbines}
          Low_pressure_turbines={Low_pressure_turbines}
        />
      </div>
      
      <TemperatureStat 
        parameterValues={parameterValues}
        parameterNames={parameterNames}
        growthRates={temperature_growrate}
      />
      <FanCoreStat 
        parameterValues={parameterValues}
        parameterNames={parameterNames}
        growthRates={temperature_growrate}
      />
      
      
 
    </>
  );
};

export default RUL_Predict_1;

"use client";
import React from "react";
import ChartThree from "../Charts/ChartThree";
import ChartTwo from "../Charts/ChartTwo";
import ChatCard from "../Chat/ChatCard";
import TableOne from "../Tables/TableOne";
import MapOne from "../Maps/MapOne";
import DataStatsOne from "@/components/DataStats/DataStatsOne";
import ChartOne from "@/components/Charts/ChartOne";

import SettingBoxes_E from "@/components/SettingBoxes_E";
import RUL from "@/components/Charts/RUL";
import TemperatureStat from "@/components/DataStats/TemperatureStat";

const ECommerce: React.FC = () => {
  return (
    <>
      {/* <SettingBoxes_E /> */}
      <div className="mb-7 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-1 2xl:gap-7.5">
        <ChartOne />
        {/* <RUL/> */}
        {/* <ChartThree /> */}
   
      </div>

      <TemperatureStat />
      {/* <DataStatsOne /> */}
      
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <MapOne />
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard />
      </div>
    </>
  );
};

export default ECommerce;

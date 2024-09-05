"use client";
import React from "react";
import Image from "next/image";

import Parameter from "@/components/ParameterInsert";

const SettingBoxes_E = () => {
  return (
    <>
      <div className="grid grid-cols-12 gap-2 pb-10">
        <div className="col-span-12 ">
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            
          <div className="grid grid-cols-12 gap-8">
          
          <div className="col-span-12">
              <div className="border-b border-stroke px-7 py-4 dark:border-dark-3">
              <div className="flex justify-between items-center">
                  <h3 className="font-medium text-dark dark:text-white">
                    Personal Information
                  </h3>

                  <div className="flex">
                    <button
                      className="flex items-center justify-center rounded-[7px] border border-stroke p-5 m-2 font-medium text-dark hover:shadow-1 dark:border-dark-3 dark:text-white"
                      type="submit"
                    >
                      Default
                    </button>
                    <button
                      className="flex items-center justify-center rounded-[7px] border border-stroke p-5 m-2 font-medium text-dark hover:shadow-1 dark:border-dark-3 dark:text-white"
                      type="submit"
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

export default SettingBoxes_E;

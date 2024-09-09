import RUL_Predict_2 from "@/components/Dashboard/RUL-Predict-2";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import React from "react";

export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Home page for NextAdmin Dashboard Kit",
};
const rul_predict = () => {
  return (
    <>
      <DefaultLayout>
        <RUL_Predict_2 />
      </DefaultLayout>
    </>
  );
}
export default rul_predict;


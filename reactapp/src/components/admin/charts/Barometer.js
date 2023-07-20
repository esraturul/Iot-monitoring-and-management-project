import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";

function getRandomNumber() {
  return Math.random() * 100;
}

export function getData() {
  return [
    ["Label", "Value"],
    ["Sıcaklık", getRandomNumber()],
  ];
}

export const options = {
  width: 400,
  height: 200,
  redFrom: 90,
  redTo: 100,
  yellowFrom: 85,
  yellowTo: 70,
  minorTicks: 5,
};

export default function Barometer() {
  const [data, setData] = useState(getData);

  useEffect(() => {
    const id = setInterval(() => {
      setData(getData());
    }, 3000);

    return () => {
      clearInterval(id);
    };
  });

  return (
    <Chart
      chartType="Gauge"
      width="100%"
      height="400px"
      data={data}
      options={options}
      style={{ marginLeft: '40px' ,marginTop:'30px' }}
      
    />
  );
}
import React from "react";
import { Chart } from "react-google-charts";
import { useTenant } from "../../../Context/TenantContext";

const styles = {
  dial: {
    display:'inline-block',
    width: `300px`,
    height: `auto`,
    color: "#000",
    border: "0.5px solid #f2f2f2",
    padding: "2px",
  },
  title: {
    fontSize: "1em",
    color: "#000"
  }
};

const Barometer = ({ id, value, title }) => {
  const {low,big}=useTenant();
  return (
    <div style={styles.dial}>
      <Chart
        height={180}
        chartType="Gauge"
        loader={<div></div>}
        data={[
          ["Label", "Value"],
          [title, Number(value)]
        ]}
        options={{
          redFrom: big,
          redTo: 200,
          yellowFrom:-200,
          yellowTo:-low,
          minorTicks: 5,
          min: -200,
          max: 200
        }}
      />
    </div>
  );
};

export default Barometer;

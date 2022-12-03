import { ResponsiveRadar } from "@nivo/radar";
import React, { useState, useEffect } from "react";

export default function RadarChart(props) {
  const [tasteData, setData] = useState(props);

  useEffect(() => {
    if (props === undefined) {
      // console.log("unde");
    } else {
      setData(props.tasteData);
    }
  }, [props]);

  if (tasteData && tasteData.length > 0) {
    return (
      <div style={{ width: "600px", height: "400px", margin: "0 auto" }}>
        <ResponsiveRadar
          data={tasteData}
          keys={["전통주"]}
          indexBy="taste"
          maxValue="5"
          valueFormat=" >-.0"
          margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
          borderColor={{ from: "color" }}
          gridLabelOffset={36}
          dotSize={10}
          dotColor={{ theme: "background" }}
          dotBorderWidth={2}
          colors={{ scheme: "paired" }}
          blendMode="multiply"
          motionConfig="wobbly"
          animate={false}
          fillOpacity="1"
          legends={[
            {
              anchor: "top-left",
              direction: "column",
              translateX: -50,
              translateY: -40,
              itemWidth: 80,
              itemHeight: 20,
              itemTextColor: "#999",
              symbolSize: 12,
              symbolShape: "circle",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: "#000",
                  },
                },
              ],
            },
          ]}
        />
      </div>
    );
  } else {
    return (
      <div style={{ width: "650px", height: "400px", margin: "0 auto" }}>
        대기화면
      </div>
    );
  }
}

import * as React from "react";
import { ResponsiveBar } from "@nivo/bar";

const Barchart = prop => {
  const handle = {
    barClick: data => {
      // console.log(data);
    },

    legendClick: data => {
      // console.log(data);
    },
  };

  return (
    // chart height이 100%이기 때문이 chart를 덮는 마크업 요소에 height 설정

    <div style={{ width: "800px", height: "500px", margin: "0 auto" }}>
      <ResponsiveBar
        groupMode="stacked"
        maxValue={5}
        /**
         * chart에 사용될 데이터
         */
        data={prop.rateData}
        /**
         * chart에 보여질 데이터 key (측정되는 값)
         */
        keys={["rating"]}
        /**
         * keys들을 그룹화하는 index key (분류하는 값)
         */
        indexBy="subject"
        /**
         * chart margin
         */
        margin={{ top: 40, right: 180, bottom: 110, left: 50 }}
        /**
         * chart padding (bar간 간격)
         */
        padding={0.4}
        /**
         * chart 색상
         */
        colors={["#d3a9ab", "#e4ced0", "#5a707e", "#62acb3", "#e3e3e3"]} // 커스터하여 사용할 때
        // colors={{ scheme: "green_blue" }} // nivo에서 제공해주는 색상 조합 사용할 때
        /**
         * color 적용 방식
         */
        colorBy="indexValue" // 색상을 keys 요소들에 각각 적용
        // colorBy= "id" , colorBy="indexValue" // indexBy로 묵인 인덱스별로 각각 적용
        theme={{
          /**
           * label style (bar에 표현되는 글씨)
           */
          labels: {
            text: {
              fontSize: 20,
              fill: "#000000",
              fontFamily: "GD",
            },
          },
          /**
           * legend style (default로 우측 하단에 있는 색상별 key 표시)
           */
          legends: {
            text: {
              fontSize: 0,
              fill: "#000000",
              fontFamily: "GD",
            },
          },
          axis: {
            /**
             * axis legend style (bottom, left에 있는 글씨)
             */
            legend: {
              text: {
                fontSize: 10,
                fill: "#000000",
                fontFamily: "GD",
              },
            },
            /**
             * axis ticks style (bottom, left에 있는 값)
             */
            ticks: {
              text: {
                fontSize: 16,
                fill: "#000000",
                fontFamily: "GD",
              },
            },
          },
        }}
        /**
         * axis bottom 설정
         */
        axisBottom={{
          tickSize: 5, // 값 설명하기 위해 튀어나오는 점 크기
          tickPadding: 5, // tick padding
          tickRotation: 0, // tick 기울기
          legend: "", // bottom 글씨
          legendPosition: "middle", // 글씨 위치
          legendOffset: 40, // 글씨와 chart간 간격
        }}
        /**
         * axis left 설정
         */
        axisLeft={{
          tickSize: 5, // 값 설명하기 위해 튀어나오는 점 크기
          tickPadding: 10, // tick padding
          tickRotation: 0, // tick 기울기
          legend: "", // left 글씨
          legendPosition: "middle", // 글씨 위치
          legendOffset: -60, // 글씨와 chart간 간격
        }}
        /**
         * label 안보이게 할 기준 width
         */
        labelSkipWidth={36}
        /**
         * label 안보이게 할 기준 height
         */
        labelSkipHeight={12}
        /**
         * bar 클릭 이벤트
         */
        onClick={handle.barClick}
        /**
         * legend 설정 (default로 우측 하단에 있는 색상별 key 표시)
         */
        legends={[
          {
            dataFrom: "keys", // 보일 데이터 형태
            anchor: "bottom-right", // 위치
            direction: "column", // item 그려지는 방향
            justify: false, // 글씨, 색상간 간격 justify 적용 여부
            translateX: 120, // chart와 X 간격
            translateY: 0, // chart와 Y 간격
            itemsSpacing: 2, // item간 간격
            itemWidth: 100, // item width
            itemHeight: 20, // item height
            itemDirection: "left-to-right", // item 내부에 그려지는 방향
            itemOpacity: 0.85, // item opacity
            symbolSize: 0, // symbol (색상 표기) 크기
            effects: [
              {
                // 추가 효과 설정 (hover하면 item opacity 1로 변경)
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
            onClick: handle.legendClick, // legend 클릭 이벤트
          },
        ]}
      />
    </div>
  );
};

export default Barchart;

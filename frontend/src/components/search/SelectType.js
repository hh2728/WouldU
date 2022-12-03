import React from "react";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

//import axios from "axios";

/**
 * swiper로 구성된 선택 컴포
 * @param {*} prop (단맛,신맛,바디감,향)
 * @returns
 */
export default function SelectType(prop) {
  function valuetext(value) {
    return `${value}`;
  }

  // function repeatRadio(start, end) {
  //   var elements = [];

  //   for (var i = start; i <= end; i++) {
  //     let color = "primary";
  //     if (end % 2 === 0 && (end / 2 === i || end / 2 + 1 === i)) {
  //       color = "default";
  //     } else if (end % 2 !== 0 && end / 2 + 1 === i) {
  //       color = "default";
  //     }

  //     elements.push(
  //       <FormControlLabel
  //         value={i}
  //         control={<Radio className="Mui-checked" color={color} />}
  //         labelPlacement="bottom"
  //       />,
  //     );
  //   }
  //   return elements;
  // }

  return (
    <StyledWrapper>
      <div>
        {/* <FormControl>
        <FormLabel>단맛</FormLabel>
        <RadioGroup row className="radioGroup">
          <FormControlLabel
            value={0}
            control={<Radio className="Mui-checked" color="success" />}
            label="전혀 달지 않아요"
            labelPlacement="bottom"
          />
          {repeatRadio(1, 4)}
          <FormControlLabel
            value="5"
            control={<Radio className="Mui-checked" color="success" />}
            label="아주 달아요"
            labelPlacement="bottom"
          />
        </RadioGroup>
      </FormControl> */}

        <div id="textSub">&lt;단맛&gt;</div>
        <Box sx={{ width: 400 }} id="slider">
          <Slider
            defaultValue={3}
            getAriaValueText={valuetext}
            onChange={prop.handleChange1}
            valueLabelDisplay="auto"
            marks={[
              {
                value: 0,
                label: prop.selectText.handle1Text[0],
              },
              {
                value: 5,
                label: prop.selectText.handle1Text[1],
              },
            ]}
            min={0}
            max={5}
            color="secondary"
          />
        </Box>
      </div>
      <div>
        <div id="textSub">&lt;신맛&gt;</div>
        <Box sx={{ width: 400 }} id="slider">
          <Slider
            defaultValue={3}
            getAriaValueText={valuetext}
            onChange={prop.handleChange2}
            valueLabelDisplay="auto"
            marks={[
              {
                value: 0,
                label: prop.selectText.handle2Text[0],
              },
              {
                value: 5,
                label: prop.selectText.handle2Text[1],
              },
            ]}
            min={0}
            max={5}
            color="secondary"
          />
        </Box>
      </div>
      <div>
        <div id="textSub">&lt;바디감&gt;</div>
        <Box sx={{ width: 400 }} id="slider">
          <Slider
            defaultValue={3}
            getAriaValueText={valuetext}
            onChange={prop.handleChange3}
            valueLabelDisplay="auto"
            marks={[
              {
                value: 1,
                label: prop.selectText.handle3Text[0],
              },
              {
                value: 5,
                label: prop.selectText.handle3Text[1],
              },
            ]}
            min={1}
            max={5}
            color="secondary"
          />
        </Box>
      </div>
      <div>
        <div id="textSub">&lt;향&gt;</div>
        <Box sx={{ width: 400 }} id="slider">
          <Slider
            defaultValue={3}
            getAriaValueText={valuetext}
            onChange={prop.handleChange4}
            valueLabelDisplay="auto"
            marks={[
              {
                value: 1,
                label: prop.selectText.handle4Text[0],
              },
              {
                value: 5,
                label: prop.selectText.handle4Text[1],
              },
            ]}
            min={1}
            max={5}
            color="secondary"
            sx={{ fontFamily:"GD" }}
          />
        </Box>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  #main {
    text-align: center;
  }
  #searchForm {
    margin: auto;
    width: 600px;
    height: 800px;
    border: 1px solid;
  }
  #textSub {
    text-align: left;
    width: 100px;
    margin-left: 50px;
    margin-top: 25px;
    margin-bottom: 5px;
    font-family: "Jua";
    font-size: 24px;
  }
  #slider {
    margin: auto;
    font-family: "GD" !important;
  }
  // .radioGroup {
  //   width: 100%;
  // }
  // .radioGroup label {
  //   width: 11%;
  // }
  // .radioGroup label span:nth-child(2) {
  //   overflow: hidden;
  //   white-space: nowrap;
  //   text-overflow: ellipsis;
  // }

  .MuiSlider-markLabel {
    font-family: "GD";
    font-size: 16px;
  }
  .MuiSlider-rail {
    color: #319da0;
  }
  .MuiSlider-track {
    color: #256d85;
  }
  .MuiSlider-thumb {
    color: #1f4690;
  }
`;

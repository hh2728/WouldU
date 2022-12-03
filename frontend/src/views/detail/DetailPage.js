import styled from "styled-components";
import Information from "components/detail/Information";
import Similar from "components/detail/Similar";
import Review from "components/detail/Review";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  alcoholDetail,
  similaralcohol,
  reviewalcohol,
} from "../../api/recommendAPI";
import Nav from "components/nav/Nav";
import RadarChart from "components/detail/RadarChart";
import { Box, Grid, Stack } from "@mui/material";

import chartSVG from "assets/img/svg/chart.svg";
import followSVG from "assets/img/svg/following.svg";
import glassSVG from "assets/img/svg/glass.svg";

export default function DetailPage() {
  let params = useParams();
  const [alcohol, setAlcohol] = useState({});
  const [userno, setUserno] = useState("");
  const [similar, setSimilar] = useState([]);
  const [review, setReview] = useState([]);
  const [tasteData, setTasteData] = useState();

  useEffect(() => {
    setUserno(sessionStorage.getItem("no"));

    alcoholDetail(params.detail_id).then(res => {
      //console.log(res);
      setAlcohol(res);
    });

    similaralcohol(params.detail_id).then(res => {
      //console.log(res);
      setSimilar(res);
    });

    reviewalcohol(params.detail_id).then(res => {
      //console.log(res);
      setReview(res);
    });

    // setReview([
    //   {
    //     score: 5,
    //     comment: "hi",
    //   },
    //   { score: 4, comment: "hihihih" },
    //   { score: 1, comment: "난 별로" },
    // ]);
  }, [params.detail_id]);

  useEffect(() => {
    if (Object.entries(alcohol).length === 0) {
      return;
    }

    let temp = [
      {
        taste: "평점",
        전통주: Number(alcohol.score >= 0 ? alcohol.score : 0),
      },
      {
        taste: "단맛",
        전통주: Number(alcohol.sweet),
      },
      {
        taste: "바디감",
        전통주: Number(alcohol.body),
      },
      {
        taste: "신맛",
        전통주: Number(alcohol.sour),
      },
      {
        taste: "향",
        전통주: Number(alcohol.scent),
      },
    ];
    setTasteData(temp);
  }, [alcohol]);

  return (
    <Box>
      <Nav />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Stack sx={{ minWidth: "1200px", maxWidth: "80%" }}>
          <Grid container direction="row" columnGap={2}>
            <Grid item sx={{ mt: "3%" }}>
              <Box
                sx={{
                  position: "relative",
                  padding: "10px",
                  // border: "2px solid #FFC334",
                  borderRadius: "10px",
                  backgroundColor: "#FAF5DB",
                }}
              >
                <img src={glassSVG} alt="glass" width={"40px"} />
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: "19px",
                    width: "3px",
                    height: "",
                    backgroundColor: "gray",
                    zIndex: -1,
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs>
              <Information
                detailId={params.detail_id}
                alcohol={alcohol}
                userno={userno}
                setAlcohol={setAlcohol}
                setReview={setReview}
              />
            </Grid>
          </Grid>
          <Grid container direction="row" columnGap={2}>
            <Grid item>
              <Box
                sx={{
                  padding: "10px",
                  borderRadius: "10px",
                  backgroundColor: "#D5E0EC",
                }}
              >
                <img src={chartSVG} alt="chart" width={"40px"} />
              </Box>
            </Grid>
            <Grid
              item
              xs
              container
              direction="row"
              sx={{
                width: "100%",
                backgroundColor: "#f5f5f5",
                borderRadius: "10px",
              }}
            >
              <Grid item xs id="information-chart">
                <RadarChart tasteData={tasteData} />
              </Grid>
              <Grid item xs>
                <Similar alcohol={alcohol} similar={similar} />
              </Grid>
            </Grid>
          </Grid>
          <Grid container direction="row" columnGap={2}>
            <Grid item>
              <Box
                sx={{
                  padding: "10px",
                  borderRadius: "10px",
                  backgroundColor: "#ffcdc9",
                  mt: "10px",
                }}
              >
                <img src={followSVG} alt="follow" width={"40px"} />
              </Box>
            </Grid>
            <Grid item xs sx={{ width: "100%" }}>
              <Review review={review} />
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </Box>
  );
}

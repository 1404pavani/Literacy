import React from "react";
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Arthur from "../images/arthur.jpg";
import CatInTheHat from "../images/catinthehat.jpg";
import CuriousGeorge from "../images/curiousgeorge.jpg";
import MickeyMouse from "../images/mickeymouse.jpg";
import SofiaTheFirst from "../images/sofiathefirst.jpg";
import WildKratts from "../images/wildkratts.jpg";
import WordGirl from "../images/wordgirl.jpg";
import PeppaPig from "../images/peppapig.jpg";
import MyLittlePony from "../images/mylittlepony.jpg";
import "./menuGrid.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '##FFF',
  padding: theme.spacing(3),
  textAlign: 'center',
}));

export default function Writing() {
  return (
    <div className="menugrid">
      <br></br>
      <br></br>
      <Box sx={{ flexGrow: 1 }} className="box">
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={2} sm={4} md={4}>
            <Item elevation = "0" ><a href="./PeppaPigVideo"> <img src={PeppaPig} width="100%"/> </a></Item>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Item elevation = "0"><img src={CatInTheHat} width="100%"/></Item>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Item elevation = "0"><img src={SofiaTheFirst} width="100%"/></Item>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Item elevation = "0"><img src={WildKratts} width="100%"/></Item>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Item elevation = "0"><img src={MyLittlePony} width="100%"/></Item>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Item elevation = "0"><img src={Arthur} width="100%"/></Item>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Item elevation = "0"><img src={MickeyMouse} width="100%"/></Item>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Item elevation = "0"><img src={CuriousGeorge} width="100%"/></Item>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Item elevation = "0"><img src={WordGirl} width="100%"/></Item>
          </Grid>
      </Grid>
      </Box>
      <br></br>
      <br></br>
    </div>
  );
}
import React from "react";
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import bfg from "../images/bfg.jpg";
import dontletthepigeondrivethebus from "../images/dontletthepigeondrivethebus.jpg";
import givingtree from "../images/givingtree.jpg";
import humptydumpty from "../images/humptydumpty.jpg";
import ifyougiveamouseacookie from "../images/ifyougiveamouseacookie.jpg";
import rainbowfish from "../images/rainbowfish.jpg";
import runawaybunny from "../images/runawaybunny.jpg";
import snowyday from "../images/snowyday.jpg";
import veryhungrycaterpillar from "../images/veryhungrycaterpillar.jpg";

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
            <Item elevation = "0" > <a href="./Dictaphone"> <img src={dontletthepigeondrivethebus} width="100%"/> </a> </Item>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Item elevation = "0"><img src={snowyday} width="100%"/></Item>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Item elevation = "0"><img src={veryhungrycaterpillar} width="100%"/></Item>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Item elevation = "0"><img src={rainbowfish} width="100%"/></Item>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Item elevation = "0"><img src={ifyougiveamouseacookie} width="100%"/></Item>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Item elevation = "0"><img src={humptydumpty} width="100%"/></Item>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Item elevation = "0"><img src={givingtree} width="100%"/></Item>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Item elevation = "0"><img src={runawaybunny} width="100%"/></Item>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Item elevation = "0"><img src={bfg} width="100%"/></Item>
          </Grid>
      </Grid>
      </Box>
      <br></br>
      <br></br>
    </div>
  );
}
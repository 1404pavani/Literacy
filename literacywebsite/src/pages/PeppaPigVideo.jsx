import React from "react";
import { Carousel } from "react-bootstrap";
import vid1 from "../videos/vid1.mp4";
import vid2 from "../videos/vid2.mp4";
import vid3 from "../videos/vid3.mp4";
import ReactPlayer from "react-player";
import "bootstrap/dist/css/bootstrap.css"
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { experimentalStyled as styled } from '@mui/material/styles';
import "./videoplayer.css";
import { useState } from "react";
import { useRef } from "react";
import Button from '@mui/material/Button';
import { render } from "@testing-library/react";

const PeppaPigVideo = () => {
  return (
    <Box className="page">
      <div className="video"><Video/></div>
      <div className="writing"><WritingBox/></div>
    </Box>

  )
}

const Video = () => {
  const vidList = [
    {
      id: 1,
      src: vid1,
    },
    {
      id: 2,
      src: vid2,
    },
    {
      id: 3,
      src: vid3,
    },
  ];
  
  return (
    <div className="PeppaPigPage">

      <br></br>
      <br></br>

      <Carousel wrap = {false} interval={null} indicators={false} prevIcon="" prevLabel="">
        {vidList.map((vidObj) => {
          return (
            <Carousel.Item key={vidObj.id}>
              <ReactPlayer
                url={vidObj.src}
                width='100%'
                height='100%'
                controls={true}
                playing={true} 
                //loop={true} 
                //muted={true}
              />
            </Carousel.Item>
          );
        })}
      </Carousel>

    </div>
  );
};

const WritingBox = () => {
  const [text, setText] = useState();

  function onSubmit(event) {
    event.preventDefault();
    console.log(text);
    setText('');
  }

  return (

    <Box component="form" onSubmit={onSubmit}>
      
    <br></br>
    <br></br>
      <TextField
        id="outlined-multiline-flexible"
        multiline
        maxRows={4} fullWidth size="large"
        placeholder="Listen to the video and type what you hear!"
        variant="filled"
        rows={17}
        value={text}
        onInput={(e) => {setText(e.target.value)}}
        // inputProps={{style: {fontSize: 40}}} // font size of input text
        // InputLabelProps={{style: {fontSize: 40}}} // font size of input label

        sx={{
          '.MuiInputBase-input': { fontSize: '1.5rem' },
        }}
      />
      <Button type="submit">Submit</Button>
    </Box>
  );
}


  
export default PeppaPigVideo;


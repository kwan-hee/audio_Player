import React, { useState } from "react";
import Wavesurfer from "react-wavesurfer.js";
import styled from 'styled-components';

export default function MyWaveform({audioSrc} ) {
  const [position, setPosition] = useState(0);
  const [muted, setMuted] = useState(false);
  const [play,setPlay] = useState(false); 

  const handlePositionChange = (position) => {
    /* ... */
  };
  const onReadyHandler = () => console.log("done loading!");
  const playOn = () =>{
    setPlay(!play);
  } 
  return (
    <>
    <ContainerWarpper >
    <Wavesurfer
      src={audioSrc}
      position={position}
      onPositionChange={handlePositionChange}
      onReady={onReadyHandler}
      playing={play}
      muted={muted}
      width="50%"
    />
</ContainerWarpper>
<Button>
<button onClick={playOn}>play</button>
</Button>
    </>
  );
}


const ContainerWarpper = styled.div`
    border: 1px solid black;
    width: 50%;
    margin-left: 150px;
    margin-top:-20px;
`;
const Button = styled.button`
margin-left: 150px;

`

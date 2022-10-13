import React from 'react';
import styled from 'styled-components';
import { FaPlay, FaStop, FaPause } from 'react-icons/fa';

export function Player({ audioUrl }) {
    const play = () => {
        const audio = new Audio(URL.createObjectURL(audioUrl));
        audio.loop = false;
        audio.volume = 1;
        audio.play();
    };
    return (
        <PlayerWarppar>
            {/* <Wave>파형</Wave> */}
            {/* <AudioBox>
        <AudioPause>
          <FaPause size="20px" />
        </AudioPause>
        <AudioPlay onClick={play}>
          <FaPlay size="20px" />
        </AudioPlay>
        <AudioStop>
          <FaStop size="20px" />
        </AudioStop>
         <a onClick={play}>Download audio</a>
      </AudioBox>
           */}
        </PlayerWarppar>
    );
}

const PlayerWarppar = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 400px;
    height: 100%;
    background-color: #ffff;
`;

const Wave = styled.div`
    width: 100%;
    height: 300px;
    background-color: gray;
    font-size: 20px;
    padding: 5px;
`;

const AudioBox = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    padding: 15px;
`;

const AudioPlay = styled.button`
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
`;
const AudioStop = styled.button`
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
`;
const AudioPause = styled.button`
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
`;

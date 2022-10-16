import React, { useState, useCallback } from 'react';
import SetTimer from '../compliments/SetTimer';
import styled from 'styled-components';
import css from './AudioRecords.module.css';
import AudioDownload from '../compliments/AudioDownload';
import MyWaveform from '../compliments/MyWaveform';

export const AudioRecord = () => {
    const [stream, setStream] = useState();
    const [media, setMedia] = useState();
    const [onRec, setOnRec] = useState(true);
    const [source, setSource] = useState();
    const [analyser, setAnalyser] = useState();
    const [audioUrl, setAudioUrl] = useState();
    const [sound, setSound] = useState();
    const [time, setTime] = useState();
    const [music, setMusic] = useState();

    const onRecAudio = () => {
        // 음원정보를 담은 노드를 생성하거나 음원을 실행또는 디코딩 시키는 일을 한다
        const audioCtx = new (window.AudioContext ||
            window.webkitAudioContext)();
        // 자바스크립트를 통해 음원의 진행상태에 직접접근에 사용된다.
        const analyser = audioCtx.createScriptProcessor(0, 1, 1);
        setAnalyser(analyser);

        function makeSound(stream) {
            // 내 컴퓨터의 마이크나 다른 소스를 통해 발생한 오디오 스트림의 정보를 보여준다.
            const source = audioCtx.createMediaStreamSource(stream);
            setSource(source);
            source.connect(analyser);
            analyser.connect(audioCtx.destination);
        }
        // 마이크 사용 권한 획득
        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();
            setStream(stream);
            setMedia(mediaRecorder);
            makeSound(stream);

            analyser.onaudioprocess = function (e) {
                // 3분(180초) 지나면 자동으로 음성 저장 및 녹음 중지
                if (e.playbackTime > time) {
                    stream.getAudioTracks().forEach(function (track) {
                        track.stop();
                    });
                    mediaRecorder.stop();
                    // 메서드가 호출 된 노드 연결 해제
                    analyser.disconnect();
                    audioCtx.createMediaStreamSource(stream).disconnect();

                    mediaRecorder.ondataavailable = function (e) {
                        setAudioUrl(e.data);
                        setOnRec(true);
                    };
                } else {
                    setOnRec(false);
                }
            };
        });
    };

    // 사용자가 음성 녹음을 중지 했을 때
    const offRecAudio = () => {
        // dataavailable 이벤트로 Blob 데이터에 대한 응답을 받을 수 있음
        media.ondataavailable = function (e) {
            setAudioUrl(e.data);
            setOnRec(true);
        };

        // 모든 트랙에서 stop()을 호출해 오디오 스트림을 정지
        stream.getAudioTracks().forEach(function (track) {
            track.stop();
        });

        // 미디어 캡처 중지
        media.stop();
        // 메서드가 호출 된 노드 연결 해제
        analyser.disconnect();
        source.disconnect();
    };

    const onSubmitAudioFile = useCallback(() => {
        if (audioUrl) {
            setSound(URL.createObjectURL(audioUrl)); // 출력된 링크에서 녹음된 오디오 확인 가능
        }
        // File 생성자를 사용해 파일로 변환
        const sound = new File([audioUrl], 'soundBlob', {
            lastModified: new Date().getTime(),
            type: 'audio/wav',
        });
        console.log(sound); // File 정보 출력
    }, [audioUrl]);

    const play = () => {
        const audio = new Audio(sound);
        audio.loop = false;
        audio.volume = 1;
        audio.play();
        return audio;
    };

    const volume = new Audio(sound);
    const result = volume.src.replace('blob:', '');
    const vol = volume.src;

    console.log('audio', volume.src);
    const onChange = (e) => {
        setTime(e.target.value);
        // setTime('');
    };

    const onReset = () => {
        setTime('');
    };
    return (
        <div>
            <RecorderContainer>
            <ContainerWarpper>
                <div className={css.wrapper}>
                    <button onClick={onRec ? onRecAudio : offRecAudio}>
                        녹음
                    </button>
                    <button onClick={onSubmitAudioFile}>결과 확인</button>

                    <button onClick={play}>재생</button>
                </div>

                <div className={css.wrapper1}>
                    <SetTimer props={onRec} />
                </div>
                <div>
                    <div className={css.wrapper2}>
                        <input
                            type="number"
                            onChange={onChange}
                            value={time}
                            placeholder="녹음 시간을 입력하세요!"
                            step="100"
                        />
                        <button onClick={onReset}>Reset</button>
                        <br />
                    </div>
                    <div className={css.wrapper3}>
                        {/* <Player audioUrl={audioUrl} setIsPlay={true} /> */}
                    </div>
                    <div className={css.wave}>
                        <MyWaveform audioSrc={vol} />
                    </div>
                    <div className={css.audiowarpper}>
                        {/* <AudioWarpper> */}
                            <audio controls src={vol}>
                                <a>Download audio</a>
                            </audio>
                        {/* </AudioWarpper> */}
                    </div>
                    <div>
                        <AudioDownload audioSrc={vol} />
                    </div>
                    <div></div>
                </div>
            </ContainerWarpper>
            </RecorderContainer>
        </div>
    );
};

const ContainerWarpper = styled.div`
    border: 1px solid black;
    width: 50%;
    margin-left: 200px;
`;
const AudioWarpper = styled.div`
    margin-left: 150px;
`;

const RecorderContainer = styled.div`
  height: 100vh;
  overflow-y: hidden;
  .row::after{
    display:block;
    clear: both;
    content: '';
  } 

`;
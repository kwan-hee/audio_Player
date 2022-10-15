import styled from 'styled-components';

const AudioDownload = ({ audioSrc }) => {
  console.log('audioSrc: ', audioSrc)
    return (
    <AudioDownloadStyled>
      <a href={audioSrc} download>
        <button className='contentBtn'>
         Download
        </button>
      </a>
    </AudioDownloadStyled>
  );
};

const AudioDownloadStyled = styled.div`
  text-align: right;

  .contentBtn {
    margin-right: 0.313rem;
    margin-bottom: 0.313rem;
    background: none;
    border: none;
    cursor: pointer;

    img {
      width: 1.8rem;
    }
  }
`;
export default AudioDownload;
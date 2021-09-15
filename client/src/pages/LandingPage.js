import styled from 'styled-components';
import LandingSec1 from '../components/LandingSec1';
import LandingSec2 from '../components/LandingSec2';
import LandingQuiz from '../components/LandingQuiz';
import { useSelector } from 'react-redux';

const LandingPageWrap = styled.div`
  height: 100%; // 콘텐츠 전체 길이 생각해서 후에 max 설정해주기
  box-sizing: border-box;
  background-repeat: no-repeat;
`;

function LandingPage() {
  return (
    <>
      <LandingPageWrap>
        <LandingSec1 />
        <LandingSec2 />
        <LandingQuiz />
      </LandingPageWrap>
    </>
  );
}

export default LandingPage;

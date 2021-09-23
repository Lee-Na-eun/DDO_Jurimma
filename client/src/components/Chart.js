// 실시간 순위 보여질 부분
import styled, { keyframes } from 'styled-components';
import BestSearch from './BestSearch';
import '../App.css';
import { useDispatch, useSelector } from 'react-redux';
import { setChartModal } from '../actions/index';
import { useEffect } from 'react';

const ChartWrap = styled.div`
  width: 400px; // 콘텐츠 전체 길이 생각해서 후에 수정해주기
  height: 80vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 1399px) {
    width: 100%;
    height: 70vh;
    margin: 0 auto;
  }
`;

const ChartBar = styled.div`
  height: 40vh;
  border: 1px solid red;
  > button {
    width: 100%;
    border-radius: 20px;
    height: 120px;
    background-color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    font-family: 'NEXON Lv2 Gothic Bold';
    font-size: 20px;
    color: #fff;
    @media only screen and (max-width: 500px) {
      height: 60px;
      font-size: 15px;
    }
  }
`;

function Chart({ setWord }) {
  const dispatch = useDispatch();
  const url = process.env.REACT_APP_API_URL || `http://localhost:3000`;
  const openChartGraphModal = (isOpen) => {
    dispatch(setChartModal(isOpen));
  }; // 차트 모달 닫는 함수

  return (
    <ChartWrap>
      <ChartBar>{/* 이부분에 바 그래프 들어가야함 */}</ChartBar>
      <BestSearch setWord={setWord} />
    </ChartWrap>
  );
}

export default Chart;

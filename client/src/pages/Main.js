// main 페이지 (검색 및 검색결과 보기 페이지)
import styled from 'styled-components';
import Search from '../components/Search';
import Chart from '../components/Chart';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLogin } from '../actions/index';

const MainWrap = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  background-color: orange;
  margin: 0 auto;
  margin-top: 200px;
  @media screen and (min-width: 1500px) {
    background-color: pink;
  }
`; // 현재 3:1비율로 한꺼번에 보이는데, 크기가 작아질 경우 상단에 검색창 + 하단에 검색어 차트가 보이게 수정 필요

function Main() {
  return (
    <MainWrap>
      <Search />
      <Chart />
    </MainWrap>
  );
}

export default Main;

// Chart 안에 실시간 순위 보여질 부분
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';

const BestSearchWrap = styled.div`
  /* flex: 5 1 auto; // 콘텐츠 전체 길이 생각해서 후에 max 설정해주기 */
  height: 38vh;
  box-sizing: border-box;
  border: 2px solid #fff;
  border-radius: 20px;
  padding: 20px;
  > .bestSearchTitle {
  }
  > .bestSearchList {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;
  }
`;
const BestSearchList = styled.ul`
  width: 43%;
  display: flex;
  flex-direction: column;
  height: 100%;
  > li {
    flex: 1 1 auto;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* display: grid;
    place-items: center; */
    transition: all 1s;
    margin-top: 20px;
    cursor: pointer;
    position: relative;
    > span {
      display: block;
      width: 100%;
      height: 2px;
      position: absolute;
      top: 100%;
    }
    > span:before,
    span:after {
      content: '';
      width: 2px;
      height: 0px;
      transition: all 0.4s linear;
      position: absolute;
      top: 0;
      background: #fff;
    }

    > span.highlight:before,
    span.highlight:after {
      width: 100%;
      height: 2px;
    }
    > .percentage {
      margin-right: 10px;
      color: #ddd;
      font-size: 12px;
    }
    > .ranking {
      color: #fff;
    }
  }
  > li:nth-child(1) {
    margin-top: 0;
  }
`;

function BestSearch({ setWord }) {
  const [listNum, setListNum] = useState(0);
  const bestSearchState = useSelector((state) => state.bestSearchReducer);

  function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }
  useInterval(() => {
    if (listNum >= bestSearchState.searchData.length - 1) {
      setListNum(0);
    } else {
      setListNum(listNum + 1);
    }
  }, 3000);

  return (
    <BestSearchWrap>
      <div className='bestSearchList'>
        <BestSearchList>
          {bestSearchState.searchData.slice(0, 5).map((el, idx) => {
            return (
              <li key={el.id} onClick={() => setWord(el.wordName)}>
                <div className='ranking'>
                  {idx + 1}. {el.wordName}
                </div>
                <div className='percentage'>{(el.count * 100) / 1000}%</div>
                <span className={idx === listNum ? 'highlight' : ''}></span>
              </li>
            );
          })}
        </BestSearchList>
        <BestSearchList>
          {bestSearchState.searchData.slice(5).map((el, idx) => {
            return (
              <li key={el.id} onClick={() => setWord(el.wordName)}>
                <div className='ranking'>
                  {idx + 6}. {el.wordName}
                </div>
                <div className='percentage'>{(el.count * 100) / 1000}%</div>
                <span className={idx + 5 === listNum ? 'highlight' : ''}></span>
              </li>
            );
          })}
        </BestSearchList>
      </div>
    </BestSearchWrap>
  );
}

export default BestSearch;

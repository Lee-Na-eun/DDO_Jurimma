// Search에서 검색 후 좋아요 순으로 3개만 보여지는 부분
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setNewContentModal } from '../actions/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';

const SearchResultWrap = styled.div`
  flex: 1 1 auto; // 콘텐츠 전체 길이 생각해서 후에 수정해주기
  box-sizing: border-box;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  > .wordResultList {
    flex: 4 1 auto;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 30px;
    > li {
      width: 30%;
      height: max(200px, 80%);
      border-radius: 30px;
      text-align: center;
      padding: 10px;
      box-sizing: border-box;
      background-color: #230638;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      border: 2px solid #fff;
      color: #fff;
      @media only screen and (max-width: 800px) {
        font-size: 14px;
      }
      > p {
        color: #fff;
      }
      > .wordThumbsup {
        background-color: #fff;
        width: max(35px, 5vh);
        height: max(35px, 5vh);
        border-radius: max(35px, 5vh);
        margin: 0 auto;
        display: grid;
        place-items: center;
        > p {
          color: #230638;
        }
      }
    }
  }
`;

const BtnWrap = styled.div`
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  justify-content: space-evenly;
  width: 50%;
  margin: 0 auto;
  > .newOrSearchBtn {
    cursor: pointer;
    margin-top: 40px;
    border-radius: 50px;
    width: 40%;
    height: 50px;
    transition: 0.3s;
    background-color: #fff;
    color: #440a67;
    > a {
      display: block;
      width: 100%;
      height: 50px;
      text-decoration: none;
      text-align: center;
      line-height: 50px;
      color: #440a67;
    }
  }
`;

function SearchResult({ wordResult, notSearched }) {
  const state = useSelector((state) => state.userInfoReducer);
  const dispatch = useDispatch();
  const openNewContentModal = (isOpen) => {
    dispatch(setNewContentModal(isOpen));
  };
  const showLogin = () => {
    swal({
      title: '로그인이 필요합니다.',
      text: '로그인 후 더보기 페이지를 이용할 수 있습니다.',
      icon: 'warning',
    });
  };

  return (
    <SearchResultWrap>
      {notSearched ? null : (
        <>
          {wordResult.length !== 0 ? (
            <>
              <ul className='wordResultList'>
                {wordResult.map((res) => {
                  return (
                    <li key={res.id} className='wordResultData'>
                      <p>{res.wordName}</p>
                      <p>{res.wordMean}</p>
                      <div className='wordThumbsup'>
                        <p>
                          <FontAwesomeIcon icon={faThumbsUp} />
                          {res.thumbsup.length}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <BtnWrap>
                <button
                  className='newOrSearchBtn'
                  onClick={state.isLogin ? null : showLogin}
                >
                  <Link
                    to={`/searchMore?wordName=${encodeURIComponent(
                      wordResult[0].wordName
                    )}`}
                  >
                    더보기
                  </Link>
                </button>
              </BtnWrap>
            </>
          ) : (
            <>
              <ul className='wordResultList'>
                <li>
                  아직 뜻이 없네요! <br />
                  새로 작성하시겠어요?
                </li>
              </ul>

              <BtnWrap>
                {/*search의 검색결과가 0일때만 아래 새글쓰기 버튼이 보이도록 지정해줘야 함*/}
                <button
                  className='newOrSearchBtn'
                  onClick={() => openNewContentModal(true)}
                >
                  새글쓰기
                </button>
              </BtnWrap>
            </>
          )}
        </>
      )}
    </SearchResultWrap>
  );
}

export default SearchResult;

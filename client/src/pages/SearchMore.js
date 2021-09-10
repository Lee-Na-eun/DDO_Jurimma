// 검색결과 전체 보여지는 페이지
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setNewContentModal } from '../actions/index';

const SearchMoreWrap = styled.div`
  height: 70vh; // 콘텐츠 전체 길이 생각해서 후에 max 설정해주기
  border: 1px solid red;
  box-sizing: border-box;
`;
const ToDiffSearchMore = styled.div``;

function SearchMore() {
  const dispatch = useDispatch();
  const openNewContentModal = (isOpen) => {
    dispatch(setNewContentModal(isOpen));
  };

  return (
    <SearchMoreWrap>
      this is searchMore page
      <ToDiffSearchMore>
        <input type='text' /> {/* 더보기 페이지에서 다른 단어 더보기페이지로*/}
        <button onClick={() => openNewContentModal(true)}>새글쓰기</button>
        <button>
          {/* <Link to={`/searchMore?wordName=${}</button>`>검색하기</Link> 로 바꿔줘야함 */}
          <Link to={`/searchMore`}>검색하기</Link>
        </button>
      </ToDiffSearchMore>
    </SearchMoreWrap>
  );
}

export default SearchMore;

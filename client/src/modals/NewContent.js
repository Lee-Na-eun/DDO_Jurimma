// 사용자가 새로운 글을 쓰는 모달
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { setNewContentModal } from '../actions/index';
import mainLogo from '../images/main_logo.svg';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { setAccessToken, setUserInfo, setLogout } from '../actions/index';
import axios from 'axios';
import '../loadingCss.css';
import swal from 'sweetalert';

axios.defaults.withCredentials = true;

const NewContentBackdrop = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: grid;
  place-items: center;
  z-index: 20;
`;

const NewContentModal = styled.div`
  width: max(40vw, 350px);
  height: 600px;
  background-color: #fff;
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  > .closeBtn {
    z-index: 10;
    font-size: 50px;
    position: absolute;
    right: -40px;
    top: -40px;
    color: #fff;
    cursor: pointer;
    transition: 0.5s;
    @media screen and (max-width: 479px) {
      right: 10px;
      top: 5px;
      color: #000;
      font-size: 30px;
    }
  }
  > .closeBtn:hover {
    transform: rotate(-90deg);
  }
  > #inputWrap {
    height: 40px;
    width: 60%;
    margin: 0 auto;
    margin-top: 20px;
    display: inline-block;
    ::after {
      display: block;
      content: '';
      border-bottom: solid 3px #440a67;
      transform: scaleX(0);
      transition: transform 250ms ease-in-out;
    }
    :hover:after {
      transform: scaleX(1);
    }
    > input {
      height: 40px;
      width: 90%;
      display: block;
      margin: 0 auto;
      text-align: center;
      outline: none;
      font-size: max(1vw, 13px);
      :focus::-webkit-input-placeholder {
        color: transparent;
      }
    }
  }

  > textarea {
    width: 90%;
    height: 300px;
    margin: 0 auto;
    text-align: top;
    outline: none;
    margin-top: 20px;
    padding: 20px;
    box-sizing: border-box;
    border: 1px solid #440a67;
    font-size: max(0.85vw, 12px);
    border-radius: 20px;
    :focus::-webkit-input-placeholder {
      color: transparent;
    }
    :focus {
      border: 2px solid #440a67;
    }
  }
  > button {
    width: 50%;
    height: 50px;
    width: 200px;
    margin: 0 auto;
    cursor: pointer;
    border-radius: 50px;
    background-color: transparent;
    background-color: #440a67;
    color: #fff;
    transition: 0.3s;
    font-size: max(0.85vw, 12px);
    margin-top: 20px;
  }
  > button:hover {
    background-color: #230638;
    color: #fff;
  }
`;

const Logo = styled.div`
  width: 100px;
  height: 100px;
  margin: 0 auto;
  margin-top: 20px;
`;

function NewContent() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.userInfoReducer);
  const history = useHistory();
  const closeNewContentModal = (isOpen) => {
    dispatch(setNewContentModal(isOpen));
  }; // 새로 글쓰는 모달 닫는 함수
  const url = process.env.REACT_APP_API_URL || `http://localhost:4000`;
  const [isLoading, setIsLoading] = useState(false);
  const [newWord, setNewWord] = useState({
    wordName: '',
    wordMean: '',
    experience: state.userInfo.experience,
  }); // 새 글 작성 모달 입력상태

  const handleKeyPressNewWord = (e) => {
    if (e.type === 'keypress' && e.code === 'Enter') {
      handleNewWord();
    }
  }; // 새글 작성 모달에서 엔터나 버튼 클릭했을때

  const handleNewWordInputValue = (key) => (e) => {
    setNewWord({ ...newWord, [key]: e.target.value });
  }; // 새글 작성 모달에서 input에 입력했을 때 입력값 받아오기

  const handleNewWord = async () => {
    try {
      if (!newWord.wordName || !newWord.wordMean) {
        swal({
          title: '정보를 모두 입력해주세요.',
          text: '줄임말과 뜻을 모두 입력해주세요.',
          icon: 'warning',
        });
      } else {
        setIsLoading(true); // loading indicator 켜기
        const newWordRes = await axios({
          method: 'post',
          url: `${url}/meaning/me`,
          data: {
            wordName: newWord.wordName,
            wordMean: newWord.wordMean,
            experience: newWord.experience + 5,
          },
          headers: { authorization: `Bearer ${state.accessToken}` },
        }); // axios 새글쓰기 요청
        if (newWordRes.data.accessToken) {
          // localstorage에 담긴 accessToken 업데이트
          // reducer에서 accessToken값 업데이트
          dispatch(setAccessToken(newWordRes.data.accessToken));
        }
        const getResult = await axios.get(`${url}/user`, {
          headers: { authorization: `Bearer ${state.accessToken}` },
        }); //새로 유저 정보 요청하는 axios 요청
        dispatch(setUserInfo(getResult.data.data)); // axios 리턴으로 유저 정보 업데이트
        closeNewContentModal(false); // 모달 꺼짐
        setIsLoading(false); // loading indicator 끄기
        swal({
          title: '줄임말이 등록되었습니다.',
          text: '작성한 줄임말을 확인해보세요!',
          icon: 'success',
        });
        // then(() => {
        //   closeNewContentModal(false); // 모달 꺼짐
        //   setIsLoading(false); // loading indicator 끄기
        // }); // sweet alert로 안내
      }
    } catch (error) {
      console.log(error);
      swal({
        title: '로그인이 만료되었습니다.',
        text: '다시 로그인을 해주세요!',
        icon: 'error',
      }).then(() => {
        dispatch(setLogout());
        history('/');
      }); // sweet alert로 안내하고 랜딩페이지로 리다이렉트
    }
  };

  return (
    <NewContentBackdrop>
      <NewContentModal>
        <div className='closeBtn' onClick={() => closeNewContentModal(false)}>
          &times;
        </div>
        <Logo>
          <img src={mainLogo} />
        </Logo>
        <div id='inputWrap'>
          <input
            type='text'
            placeholder='작성할 단어를 입력해주세요'
            value={newWord.wordName}
            onChange={handleNewWordInputValue('wordName')}
          ></input>
        </div>
        <textarea
          placeholder='작성할 단어의 뜻을 입력해주세요'
          value={newWord.wordMean}
          onChange={handleNewWordInputValue('wordMean')}
          onKeyPress={handleKeyPressNewWord}
        ></textarea>
        {isLoading ? (
          <button className='lds-dual-ring'></button>
        ) : (
          <button onClick={handleNewWord}>저장하기</button>
        )}
      </NewContentModal>
    </NewContentBackdrop>
  );
}

export default NewContent;

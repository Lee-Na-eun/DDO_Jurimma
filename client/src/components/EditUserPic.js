// EditMyPage에서 사진 변경 일어나는 부분
import styled from 'styled-components';
import basicProfile from '../images/basic_profileImg.svg';
import { setSignOutModal } from '../actions/index';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import silverProfile from '../images/junior_profile.svg';
import goldProfile from '../images/senior_profile.svg';
import diaProfile from '../images/master_profile.svg';

const EditUserPicWrap = styled.div`
  width: 450px; // 콘텐츠 전체 길이 생각해서 후에 수정해주기
  height: 100%;
  box-sizing: border-box;
  @media only screen and (max-width: 1399px) {
    width: 100%;
  }
  > button {
    display: block;
    width: 150px;
    height: 40px;
    margin: 0 auto;
    margin-top: 90px;
    background-color: transparent;
    color: #b61919;
    cursor: pointer;
    border: 2px solid #b61919;
    border-radius: 50px;
    transition: 0.3s;
    :hover {
      border: 2px solid #b61919;
      background-color: #b61919;
      color: #fff;
    }
    @media only screen and (max-width: 1399px) {
      margin-top: 70px;
    }
  }
`;

const ProfileChange = styled.div`
  width: 450px;
  height: 450px;
  margin: 0 auto;
  @media only screen and (max-width: 1399px) {
    height: 300px;
    width: 300px;
  }
  > #profileBtnWrap {
    width: 300px;
    height: 50px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -40px;
    > button {
      display: block;
      width: 150px;
      height: 40px;
      margin: 0 auto;
      background-color: transparent;
      color: #fff;
      cursor: pointer;
      border: 2px solid #fff;
      border-radius: 50px;
      transition: 0.3s;
      margin-left: 20px;
      :hover {
        border: 2px solid #fff;
        background-color: #fff;
        color: #000;
      }
    }
    > button:nth-child(1) {
      margin-left: 0;
    }
  }
`;

const ProfileImgWrap = styled.div`
  background-color: red;
  width: 450px;
  height: 450px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  @media only screen and (max-width: 1399px) {
    height: 300px;
    width: 300px;
  }
  > #profileImg {
    width: 130px;
    height: 130px;
    border-radius: 300px;
    margin: 0 auto;
    background: url(${basicProfile}); // 주림마에서 기본적으로 제공하는 img
    background-repeat: no-repeat;
    background-size: cover;
    @media only screen and (max-width: 1399px) {
      width: 80px;
      height: 80px;
    }
  }
`;

function EditUserPic() {
  const dispatch = useDispatch();
  const openSignoutModal = (isOpen) => {
    dispatch(setSignOutModal(isOpen));
  }; // 회원탈퇴 모달 여는 함수
  const state = useSelector((state) => state.userInfoReducer);

  let whatProfile;
  if (0 <= state.userInfo.experience && state.userInfo.experience < 100) {
    whatProfile = silverProfile;
  } else if (
    100 <= state.userInfo.experience &&
    state.userInfo.experience < 200
  ) {
    whatProfile = goldProfile;
  } else {
    whatProfile = diaProfile;
  } // 나타낼 레벨 정하기

  return (
    <EditUserPicWrap>
      <ProfileChange>
        <ProfileImgWrap
          style={{
            background: `url(${whatProfile})`,
            backgroundSize: 'cover',
          }}
        >
          <div
            id='profileImg'
            style={{
              background: `url(${state.userInfo.userPic})`,
              backgroundSize: 'cover',
            }}
          ></div>
        </ProfileImgWrap>
        <div id='profileBtnWrap'>
          <button>프로필 바꾸기</button>
          <button>프로필 저장하기</button>
        </div>
      </ProfileChange>
      <button onClick={() => openSignoutModal(true)}>회원탈퇴 하기</button>
    </EditUserPicWrap>
  );
}

export default EditUserPic;

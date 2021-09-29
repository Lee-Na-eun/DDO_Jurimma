// Mypage 안에서 유저 정보 나타날 부분
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import basicProfile from '../images/basic_profileImg.svg';
import { useSelector } from 'react-redux';
import silverProfile from '../images/junior_profile.svg';
import goldProfile from '../images/senior_profile.svg';
import diaProfile from '../images/master_profile.svg';

const colorAni = keyframes`
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
`;

const UserInfoWrap = styled.div`
  height: 500px;
  width: 80%;
  margin: 0 auto;
  position: relative;
  border-radius: 20px;
  border: 2px solid #fff;
  background-color: rgba(255, 255, 255, 0.5);
  @media only screen and (max-width: 800px) {
    top: -100px;
    height: 450px;
  }
  /* @media only screen and (max-width: 400px) {
    width: 300px;
    background-color: red;
  } */
`;

const UserInfoLevel = styled.div`
  width: 450px;
  margin: 0 auto;
  box-sizing: border-box;
  position: relative;
  top: -250px;
  @media only screen and (max-width: 800px) {
    top: -150px;
    height: 255px;
    width: 255px;
  }
  @media only screen and (max-width: 400px) {
    top: -100px;
    width: 175px;
    height: 175px;
  }
  > #levelProfile {
    width: 450px;
    height: 450px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    @media only screen and (max-width: 800px) {
      height: 255px;
      width: 255px;
    }
    @media only screen and (max-width: 400px) {
      height: 175px;
      width: 175px;
    }
    > #profileImg {
      width: 130px;
      height: 130px;
      border-radius: 300px;
      margin: 0 auto;
      background-repeat: no-repeat;
      background-size: cover;
      margin-top: 20px;
      @media only screen and (max-width: 800px) {
        width: 80px;
        height: 80px;
      }
      @media only screen and (max-width: 400px) {
        width: 60px;
        height: 60px;
      }
    }
  }
`; // 유저 사진 및 레벨 정보

const UserInfoProgress = styled.div`
  width: max(50%, 100px);
  height: 20px;
  background-color: #fff;
  border-radius: 50px;
  overflow: hidden;
  > #barStyle {
    /* 나중에 axios 하고나면 "state.experience"% 로 처리하기*/
    height: 100%;
    background-color: #b4aee8;
  }
`; // 유저 레벨 progress bar

const UserInfoDataWrap = styled.div`
  position: relative;
  top: -250px;
  margin: 0 auto;
  @media only screen and (max-width: 800px) {
    top: -100px;
  }
  @media only screen and (max-width: 400px) {
    top: -50px;
  }
  > #levelWrap {
    width: 100%;
    margin-top: 30px;
    height: 100px;
    color: #fff;
    display: grid;
    place-items: center;
    > #levelInfo {
      width: 50%;
      text-align: center;
      display: grid;
      place-items: center;
      > p {
        color: #fff;
        margin-bottom: 10px;
      }
    }
    @media only screen and (max-width: 800px) {
      min-height: 100px;
    }
  }
`;

const UserInfoData = styled.div`
  margin-top: -30px;
  @media only screen and (max-width: 1399px) {
    width: 100%;
  }
  > #userInfo {
    width: 80%;
    margin: 0 auto;
    text-align: center;
    @media only screen and (max-width: 400px) {
      width: 90%;
    }
    > #userName {
      // 유저 이름이 길어지는 경우 span이 영역을 벗어나서 width를 40에서 100으로 수정했습니다.
      width: 100%;
      margin: 0 auto;
      height: 60px;
      line-height: 60px;
      color: #fff;
      border-radius: 20px;
      border: 2px solid #fff;
      animation: ${colorAni} 10s ease infinite;
      background-size: 200% 100%;
      font-size: 14px;
      > span {
        font-size: 12px;
        color: #fff;
      }
      @media only screen and (max-width: 400px) {
        display: grid;
        place-items: center;
        line-height: 0;
      }
    }
    > #userEmail {
      height: 30px;
      line-height: 30px;
      width: 50%;
      margin: 0 auto;
      margin-top: 30px;
      background-color: orange;
    }
    > #userInfoEditBtn {
      cursor: pointer;
      border-radius: 50px;
      width: 40%;
      height: 50px;
      background-color: #fff;
      width: 200px;
      color: #440a67;
      margin-top: 30px;
      @media only screen and (max-width: 800px) {
        width: 130px;
      }
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
  }
`; // 유저 개인 정보

function UserInfo() {
  const state = useSelector((state) => state.userInfoReducer);
  // const barWidth = {
  //   width: state.userInfo.experience + '%',
  // }; // 경험치 status bar width 정하는 함수

  let whatLevel;
  let whatProfile;
  let whatColor;
  let barWidth;
  if (0 <= state.userInfo.experience && state.userInfo.experience < 100) {
    whatLevel = '실버';
    whatColor = 'linear-gradient(-45deg, #5591C9, #245689)';
    whatProfile = silverProfile;
    barWidth = state.userInfo.experience + '%';
  } else if (
    100 <= state.userInfo.experience &&
    state.userInfo.experience < 200
  ) {
    whatLevel = '골드';
    whatColor = 'linear-gradient(-45deg, #ffc851, #FF1515)';
    whatProfile = goldProfile;
    barWidth = state.userInfo.experience - 100 + '%';
  } else {
    whatLevel = '다이아';
    whatColor = 'linear-gradient(-45deg, #3FC1FF, #D42AFF)';
    whatProfile = diaProfile;
    barWidth = state.userInfo.experience - 200 + '%';
  } // 나타낼 레벨 정하기

  return (
    <UserInfoWrap>
      <UserInfoLevel>
        <div
          id='levelProfile'
          style={{
            backgroundImage: `url(${whatProfile})`,
            backgroundSize: 'cover',
          }}
        >
          {state.userInfo.userPic ? (
            <div
              id='profileImg'
              style={{
                backgroundImage: `url(${state.userInfo.userPic})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            ></div>
          ) : (
            <div
              id='profileImg'
              style={{
                backgroundImage: `url(${basicProfile})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            ></div>
          )}
        </div>
      </UserInfoLevel>
      <UserInfoDataWrap>
        <UserInfoData>
          <div id='userInfo'>
            <p
              id='userName'
              style={{
                backgroundImage: `${whatColor}`,
              }}
            >
              {state.userInfo.username.length > 10
                ? `${state.userInfo.username.slice(0, 10)}...님`
                : `${state.userInfo.username}님`}
              &nbsp;
              <span>반갑습니다!</span>
            </p>
            {/* <p id='userEmail'>{state.userInfo.email}</p> */}
            <button id='userInfoEditBtn'>
              <Link to='/mypageEdit'>내 정보 수정하기</Link>
            </button>
          </div>
        </UserInfoData>
        <div id='levelWrap'>
          <div id='levelInfo'>
            <p>
              Lv.{whatLevel} ({state.userInfo.experience}exp)
            </p>
            <UserInfoProgress>
              <div id='barStyle' style={{ width: barWidth }}></div>
            </UserInfoProgress>
          </div>
        </div>
      </UserInfoDataWrap>
    </UserInfoWrap>
  );
}

export default UserInfo;

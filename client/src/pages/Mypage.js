import React, { useState } from 'react';
import styled from 'styled-components';
import MypageBox from '../components/mypage/MypageBox';
import WriteList from '../components/mypage/WriteList';
import BookMarkList from '../components/mypage/BookMarkList';
import ProfileIcon from '../assets/icons/ProfileIcon.svg';
import SettingIcon from '../assets/icons/SettingIcon.svg';
import WriteListIcon from '../assets/icons/WriteListIcon.svg';
import CommentIcon from '../assets/icons/CommentIcon.svg';
import BookMark from '../assets/icons/BookMark.svg';
import StarIcon from '../assets/icons/StarIcon.svg';
import MapIcon from '../assets/icons/MapIcon.svg';

const Mypage = () => {
  const [name, setName] = useState('이름');
  const [email, setEmail] = useState('aaa@naver.com');
  const [description, setDescription] = useState('내용을 추가하세요.');

  return (
    <Container>
      <ProfileConatiner>
        <ProfileImg src={ProfileIcon} alt='profile'></ProfileImg>
        <UserName>{name}</UserName>
        <UserEmail>{email}</UserEmail>
        <UserDescription>{description}</UserDescription>
        <EditBtn>Edit</EditBtn>
        <SettingBtn src={SettingIcon} alt='setting'></SettingBtn>
      </ProfileConatiner>
      <MypageContainer>
        <MypageBox
          icon={WriteListIcon}
          title='내가 쓴 글'
          component={<WriteList title='제목' date='2024-06-05' />}
        />
        <MypageBox
          icon={CommentIcon}
          title='내가 쓴 댓글'
          component={<WriteList title='제목' date='2024-06-05' />}
        />
        <MypageBox
          icon={BookMark}
          title='즐겨찾기 장소'
          component={
            <BookMarkList
              title='성동구립성수도서관'
              location='서울 성동구 뚝섬로1길 43 성수문화복지회관 7층'
            />
          }
          mapIcon={MapIcon}
        />
        <MypageBox
          icon={StarIcon}
          title='작성한 리뷰'
          component={<WriteList title='제목' date='2024-06-05' />}
        />
      </MypageContainer>
    </Container>
  );
};

export default Mypage;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: calc(100vh - 60px);
`;

const ProfileConatiner = styled.div`
  flex: display;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #eed8bc;
  width: 21.5rem;
  position: relative;
`;

const ProfileImg = styled.img`
  width: 7rem;
  margin: 75px 0px 8px 0px;
`;

const UserName = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
  color: #191619;
`;

const UserEmail = styled.p`
  font-size: 1rem;
  color: #565656;
  margin-top: -20px;
`;

const UserDescription = styled.p`
  font-size: 1.1rem;
  color: #191619;
  margin-top: 35px;
`;

const EditBtn = styled.button`
  font-size: 0.9;
  font-weight: 500;
  color: white;
  width: 3.3rem;
  margin-top: 30px;
  padding: 5px 10px 5px 10px;
  border: none;
  border-radius: 20px;
  background-color: #563c0a;
  cursor: pointer;
`;

const SettingBtn = styled.img`
  width: 3rem;
  padding: 5px 10px 5px 10px;
  border: none;
  position: absolute;
  bottom: 50px;
  left: 20px;
  cursor: pointer;
`;

const MypageContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 50px;
  align-items: center;
  margin: auto;
`;

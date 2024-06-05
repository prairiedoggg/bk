import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { ReactComponent as UserIcon } from '../../assets/icons/usericon.svg';

const BoardContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 1.25rem;
  box-sizing: border-box;
`;

const BoardTags = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 1.25rem;

  & > *:not(:first-child) {
    margin-left: 1rem;
  }
`;

const Button = styled.button`
  background-color: ${(props) => (props.isActive ? '#543D20' : 'white')};
  color: ${(props) => (props.isActive ? 'white' : '#8a5a2b')};
  border: 0.063rem solid #8a5a2b;
  padding: 0.5rem 1rem;
  border-radius: 1.25rem;
  cursor: pointer;
  font-size: 0.875rem;
  margin-right: 0.325rem;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

const BoardContent = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.25rem;

  @media (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const BoardItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0.625rem;
  border-radius: 0.625rem;
  background: white;
  color: #543d20;
  cursor: pointer;

  &.placeholder {
    border: 0.063rem dashed #ddd;
  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 0.625rem;
  margin-bottom: 0.625rem;
`;

const LoadMoreButton = styled.button`
  display: block;
  margin: 1.25rem auto;
  margin-top: 2%;
  background-color: #543d20;
  color: white;
  border: none;
  padding: 0.625rem 1.25rem;
  border-radius: 1.25rem;
  cursor: pointer;
  font-size: 1rem;
  width: 10%;
`;

const ModalContent = styled.div`
  background: white;
  padding: 1.25rem;
  width: 90%;
  max-width: 60rem;
  height: auto;
  max-height: 80vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  overflow-y: auto;

`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  margin: 0;
`;

const ModalDate = styled.div`
  font-size: 0.875rem;
  color: #888;
  margin-left: 0.65rem;
`;

const ModalAuthor = styled.div`
  font-size: 0.875rem;
  color: #191619;
  margin-left: auto;
  font-weight: bold;
`;

const ModalBody = styled.div`
  display: flex;
  gap: 1.25rem;
  flex-wrap: wrap;
`;

const CommentSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const CommentInput = styled.input.attrs({ type: 'text' })`
  width: 100%;
  padding: 0.625rem;
  margin-bottom: 0.625rem;
  border-radius: 0.325rem;
  border: 0.5px solid #ddd;
  box-sizing: border-box;
  height: 5rem;
`;
const CommentButton = styled(Button)`
  margin-left: auto;
  display: block;
  background-color: #543D20;
  color: white;
`;

const CommentList = styled.div`
  margin-top: 1.25rem;
`;

const CommentItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 0.625rem;
`;

const CommentAvatar = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  margin-right: 0.625rem;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const CommentContent = styled.div`
  flex: 1;
`;

const customModalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: '60rem',
    height: 'auto',
    maxHeight: '80vh',
    overflowY: 'auto',
    borderRadius: '1rem',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' 
  }
};

const Board = () => {
  const items = [
    {
      id: 1,
      text: '우리집 고양이 너무 귀여워',
      imgSrc: 'https://via.placeholder.com/150'
    },
    {
      id: 2,
      text: '다들 귀여운 저희 집 고양이 보고 가세요',
      imgSrc: 'https://via.placeholder.com/150'
    }
    // 더미 데이터 추가
  ];

  const comments = [
    { id: 1, author: '이름', text: '고양이 귀여워' },
    { id: 2, author: '이름', text: '고양이 귀여워' }
  ];

  const [activeTag, setActiveTag] = useState('전체');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleTagClick = (tag) => {
    setActiveTag(tag);
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedItem(null);
  };

  return (
    <BoardContainer>
      <BoardTags>
        <Button
          isActive={activeTag === '전체'}
          onClick={() => handleTagClick('전체')}
        >
          전체
        </Button>
        <Button
          isActive={activeTag === '추천 장소'}
          onClick={() => handleTagClick('추천 장소')}
        >
          추천 장소
        </Button>
        <Button
          isActive={activeTag === '같이 해요'}
          onClick={() => handleTagClick('같이 해요')}
        >
          같이 해요
        </Button>
      </BoardTags>
      <BoardContent>
        {items.map((item) => (
          <BoardItem key={item.id} onClick={() => openModal(item)}>
            <Image src={item.imgSrc} alt={item.text} />
            <p>{item.text}</p>
          </BoardItem>
        ))}
      </BoardContent>
      <LoadMoreButton>더보기</LoadMoreButton>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel='Item Detail Modal'
        ariaHideApp={false}
        style={customModalStyles}
      >
        {selectedItem && (
          <ModalContent>
            <ModalHeader>
                <ModalTitle>{selectedItem.text}</ModalTitle>
                <ModalDate>2024.06.03</ModalDate>
              <ModalAuthor>작성자</ModalAuthor>
            </ModalHeader>
            <ModalBody>
              <div>
                <Image src={selectedItem.imgSrc} alt={selectedItem.text} />
                <p>다들 귀여운 저희 집 고양이 보고 가세요</p>
              </div>
              <CommentSection>
                <h3>댓글</h3>
                <CommentInput placeholder='내용을 입력해 주세요.' />
                <CommentButton>등록</CommentButton>
                <CommentList>
                  {comments.map((comment) => (
                    <CommentItem key={comment.id}>
                      <CommentAvatar>
                        <UserIcon />
                      </CommentAvatar>
                      <CommentContent>
                        <strong>{comment.author}</strong>
                        <p>{comment.text}</p>
                      </CommentContent>
                    </CommentItem>
                  ))}
                </CommentList>
              </CommentSection>
            </ModalBody>
          </ModalContent>
        )}
      </Modal>
    </BoardContainer>
  );
};

export default Board;

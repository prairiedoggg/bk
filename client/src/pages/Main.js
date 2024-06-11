import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import FindLibrary from '../../src/assets/icons/FindLibrary.svg';
import LibraryParkMap from '../components/main/LibraryParkMap';
import DetailModal from '../../src/components/main/DetailModal';
import LibraryList from '../components/main/LibraryList';
import ParkList from '../components/main/ParkList';

const Main = () => {
  const [keyword, setKeyword] = useState('');
  const [libraries, setLibraries] = useState([]);
  const [parks, setParks] = useState([]);
  const [selectedLibrary, setSelectedLibrary] = useState(null);
  const [selectedPark, setSelectedPark] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedButton, setSelectedButton] = useState('library');
  const [mapCenter, setMapCenter] = useState({ lat: 37.5665, lng: 126.978 }); // 지도 중심 상태

  useEffect(() => {
    fetch('/api/libraries')
      .then((response) => response.json())
      .then((data) => {
        setLibraries(data);
      })
      .catch((error) => console.error('Error fetching libraries:', error));

    fetch('/api/parks')
      .then((response) => response.json())
      .then((data) => {
        setParks(data);
      })
      .catch((error) => console.error('Error fetching parks:', error));
  }, []);

  const handleFindLibraryClick = () => {
    console.log(keyword);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      console.log(keyword);
    }
  };

  const handleLibraryItemClick = (library) => {
    setSelectedLibrary(library);
    setMapCenter({ lat: library.latitude, lng: library.longitude });
  };

  const handleParkItemClick = (park) => {
    setSelectedPark(park);
    setMapCenter({ lat: park.latitude, lng: park.longitude });
  };

  const handleLibraryClick = (library) => {
    setSelectedLibrary(library);
    setIsModalOpen(true);
  };

  const handleButtonClick = (button) => {
    setSelectedButton(button);
    setKeyword(''); // 버튼이 변경될 때 검색어 초기화
  };

  const handleParkClick = (park) => {
    setSelectedPark(park);
    setIsModalOpen(true);
  };

  return (
    <FullHeightContainer>
      <Guide as={HBox}>
        <Flex flex={1}>
          <>
            <InputContainer>
              <KeywordInputContainer>
                <Input
                  type='text'
                  placeholder='도서관 검색'
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <ClickableIconContainer onClick={handleFindLibraryClick}>
                  <FindLibraryIcon src={FindLibrary} alt='FindLibrary' />
                </ClickableIconContainer>
              </KeywordInputContainer>
              <LabelContainer>
                <Label>설정한 위치</Label>
                <Label style={{ color: '#563C0A' }}>00구</Label>
              </LabelContainer>
            </InputContainer>

            {/* 도서관 버튼이 클릭된 경우 LibraryList 컴포넌트를 렌더링 */}
            {selectedButton === 'library' ? (
              <LibraryList
                libraries={libraries}
                keyword={keyword}
                handleLibraryItemClick={handleLibraryItemClick}
              />
            ) : (
              <ParkList
                parks={parks}
                keyword={keyword}
                handleParkItemClick={handleParkItemClick}
              />
            )}
          </>
        </Flex>
        <Flex flex={4}>
          <LibraryParkMapContainer>
            <LibraryParkMap
              libraries={libraries}
              parks={parks}
              searchTerm={keyword}
              onLibraryClick={handleLibraryClick}
              onParkClick={handleParkClick} // 공원 마커 클릭 시 실행될 함수
              selectedButton={selectedButton} // 공원 버튼 선택 여부 전달
              center={mapCenter} // 지도 중심 좌표 전달
            />
            <ButtonContainer>
              <Button
                onClick={() => handleButtonClick('library')}
                selected={selectedButton === 'library'}
              >
                도서관
              </Button>
              <Button
                onClick={() => handleButtonClick('park')}
                selected={selectedButton === 'park'}
              >
                공원
              </Button>
            </ButtonContainer>
          </LibraryParkMapContainer>
        </Flex>
      </Guide>
      <DetailModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        place={selectedButton === 'library' ? selectedLibrary : selectedPark}
      />
    </FullHeightContainer>
  );
};
export default Main;

const LibraryParkMapContainer = styled.div`
  position: relative;
  z-index: 0;
`;

const ButtonContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1;
`;

const Button = styled.button`
  /* Rectangle 29 */
  background: ${(props) => (props.selected ? '#563C0A' : 'white')};
  color: ${(props) => (props.selected ? 'white' : '#563C0A')};
  border: 1px solid #563c0a;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.08);
  border-radius: 20px;
  font-size: 14px;
  padding: 10px 20px;
  margin: 10px;
  margin-bottom: 10px;
  cursor: pointer;
`;

const FullHeightContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const HBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  flex: 1;
`;

const Flex = styled.div`
  flex: ${(props) => props.flex || 1};
  display: flex;
  flex-direction: column;
`;

const Guide = styled.div`
  > * {
    outline: 1px solid #c4c4c4;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 15px;
`;

const Input = styled.input`
  width: 16rem;
  height: 1.5rem;
  border: 1px solid #d0d0d0;
  border-radius: 8px;
  padding: 5px 12px 5px 12px;
  margin-bottom: 15px;

  &::placeholder {
    color: #bababa;
  }
`;

const KeywordInputContainer = styled.div`
  position: relative;
`;

const ClickableIconContainer = styled.div`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
`;

const FindLibraryIcon = styled.img`
  margin-bottom: 0.7rem;
`;

const LabelContainer = styled.div`
  margin-top: 10px;
`;

const Label = styled.span`
  margin: 0 10px;
  font-family: 'SUIT';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 16px;

  color: ${(props) => props.color || '#191619'};
`;

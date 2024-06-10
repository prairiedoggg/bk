import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import FindLibrary from '../../src/assets/icons/FindLibrary.svg';
import LibraryPing from '../../src/assets/icons/LibraryPing.svg';
import LibraryParkMap from '../components/main/LibraryParkMap';
import DetailModal from '../../src/components/main/DetailModal';

const Main = () => {
  const [keyword, setKeyword] = useState('');
  const [libraries, setLibraries] = useState([]);
  const [parks, setParks] = useState([]);
  const [selectedLibrary, setSelectedLibrary] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const filterLibraries = (libraries, keyword) => {
    return libraries.filter((library) => library.name.includes(keyword));
  };

  const handleLibraryItemClick = (library) => {
    setSelectedLibrary(library);
    setIsModalOpen(true);
  };

  const handleMarkerClick = (library) => {
    setSelectedLibrary(library);
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

            <LibraryListContainer>
              <LibraryList>
                {filterLibraries(libraries, keyword).map((library, index) => (
                  <LibraryListItem
                    key={index}
                    onClick={() => handleLibraryItemClick(library)}
                  >
                    <LibraryIcon src={LibraryPing} alt='LibraryPing' />
                    <LibraryInfo>
                      <LibraryName>{library.name}</LibraryName>
                      <LibraryAddress>{library.address}</LibraryAddress>
                    </LibraryInfo>
                  </LibraryListItem>
                ))}
              </LibraryList>
            </LibraryListContainer>
          </>
        </Flex>
        <Flex flex={4}>
          <LibraryParkMapContainer>
            <LibraryParkMap
              libraries={libraries}
              parks={parks}
              searchTerm={keyword}
              onLibraryClick={handleMarkerClick}
            />
          </LibraryParkMapContainer>
        </Flex>
      </Guide>
      <DetailModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        library={selectedLibrary}
      />
    </FullHeightContainer>
  );
};

export default Main;

const LibraryParkMapContainer = styled.div`
  position: relative;
  z-index: 0;
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

const LibraryListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  max-height: 60vh;
`;

const LibraryList = styled.ul`
  list-style: none;
  padding-left: 0.5rem;
`;

const LibraryListItem = styled.li`
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 0.5px solid #dfdfdf;
`;

const LibraryIcon = styled.img`
  width: 34px;
  height: 34px;
  margin-right: 10px;
`;

const LibraryInfo = styled.div`
  display: flex;
  text-align: left;
  flex-direction: column;
`;

const LibraryName = styled.span`
  font-family: 'SUIT';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  color: #191619;
  text-align: left;
  margin: 5px 0;
`;

const LibraryAddress = styled.span`
  font-family: 'SUIT';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #545454;
  text-align: left;
  margin: 5px 0;
`;

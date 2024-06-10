import React, { useEffect, useState } from 'react';

const { kakao } = window;

const LibraryParkMap = ({ libraries, searchTerm, onLibraryClick }) => {
  const [district, setDistrict] = useState('');

  useEffect(() => {
    if (!kakao || !kakao.maps) {
      console.error('카카오 맵 로딩 실패');
      return;
    }

    const mapContainer = document.getElementById('map');
    const mapOption = {
      center: new kakao.maps.LatLng(37.5665, 126.978),
      level: 4
    };

    const map = new kakao.maps.Map(mapContainer, mapOption);

    const libraryImageSrc = '/LocationIcon.svg';
    const libraryImageSize = new kakao.maps.Size(24, 35);
    const libraryImageOption = { offset: new kakao.maps.Point(12, 35) };

    const parkImageSrc = '/ParkIcon.svg';
    const parkImageSize = new kakao.maps.Size(24, 35);
    const parkImageOption = { offset: new kakao.maps.Point(12, 35) };

    const libraryMarkerImage = new kakao.maps.MarkerImage(
      libraryImageSrc,
      libraryImageSize,
      libraryImageOption
    );
    const parkMarkerImage = new kakao.maps.MarkerImage(
      parkImageSrc,
      parkImageSize,
      parkImageOption
    );

    let markers = [];

    const clearMarkers = () => {
      markers.forEach((marker) => marker.setMap(null));
      markers = [];
    };

    const displayMarkers = (locations, image, type) => {
      clearMarkers(); // 기존 마커를 지우고 새로운 마커를 표시

      if (locations.length > 0 && type === 'library') {
        const firstLocation = locations[0];
        const newCenter = new kakao.maps.LatLng(
          firstLocation.latitude,
          firstLocation.longitude
        );
        map.setCenter(newCenter);
      }

      locations.forEach((location) => {
        const latitude = location.latitude || 0;
        const longitude = location.longitude || 0;

        const markerPosition = new kakao.maps.LatLng(latitude, longitude);
        const marker = new kakao.maps.Marker({
          position: markerPosition,
          image: image,
          name: location.name // 도서관의 이름 추가
        });

        kakao.maps.event.addListener(marker, 'click', () => {
          if (type === 'library') {
            onLibraryClick(location); // 도서관 마커 클릭 시 콜백 함수 호출
          }
        });

        marker.setMap(map);
        markers.push(marker);
      });
    };

    const fetchAndDisplayData = (url, image, type, filter = {}) => {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data)) {
            let filteredData = data;

            if (filter.district) {
              filteredData = filteredData.filter(
                (item) => item.district === filter.district
              );
            }

            if (filter.searchTerm) {
              filteredData = filteredData.filter(
                (item) => item.name && item.name.includes(filter.searchTerm)
              );
            }

            displayMarkers(filteredData, image, type);
          } else {
            console.error('Error: Expected array but got', data);
          }
        })
        .catch((error) => console.error('Error fetching data:', error));
    };

    const fetchAndDisplayLibraries = (filter = {}) => {
      fetchAndDisplayData(
        '/api/libraries',
        libraryMarkerImage,
        'library',
        filter
      );
    };

    const fetchAndDisplayParks = (filter = {}) => {
      fetchAndDisplayData('/api/parks', parkMarkerImage, 'park', filter);
    };

    fetchAndDisplayLibraries({ district, searchTerm });
    fetchAndDisplayParks({ district, searchTerm });
  }, [district, searchTerm, onLibraryClick]);

  const handleDistrictChange = (e) => {
    setDistrict(e.target.value);
  };

  return (
    <div>
      <div>
        <label htmlFor='district-select'>지역구 선택:</label>
        <select
          id='district-select'
          value={district}
          onChange={handleDistrictChange}
        >
          <option value=''>전체</option>
          {[
            '강남구',
            '강동구',
            '강북구',
            '강서구',
            '관악구',
            '광진구',
            '구로구',
            '금천구',
            '노원구',
            '도봉구',
            '동대문구',
            '동작구',
            '마포구',
            '서대문구',
            '서초구',
            '성동구',
            '성북구',
            '송파구',
            '양천구',
            '영등포구',
            '용산구',
            '은평구',
            '종로구',
            '중구',
            '중랑구'
          ].map((district, index) => (
            <option key={index} value={district}>
              {district}
            </option>
          ))}
        </select>
      </div>
      <div id='map' style={{ width: '100%', height: '500px' }}></div>
    </div>
  );
};

export default LibraryParkMap;

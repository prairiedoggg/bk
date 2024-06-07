document.addEventListener("DOMContentLoaded", function () {
  // 카카오 맵이 로딩되었는지 확인합니다.
  if (typeof kakao === "undefined" || typeof kakao.maps === "undefined") {
    console.error("카카오 맵 로딩 실패");
    return;
  }

  var mapContainer = document.getElementById("map"), // 지도를 표시할 HTML 요소
    mapOption = {
      center: new kakao.maps.LatLng(37.5665, 126.978), // 기본 중심 좌표 설정
      level: 4 // 기본 확대 수준 설정
    };

  var map = new kakao.maps.Map(mapContainer, mapOption);

  // 사용자 정의 마커 이미지 설정
  var libraryImageSrc = "/static/LocationIcon.svg", // 도서관 마커 이미지 URL
    libraryImageSize = new kakao.maps.Size(24, 35), // 도서관 마커 이미지 크기
    libraryImageOption = { offset: new kakao.maps.Point(12, 35) }; // 도서관 마커 이미지의 기준 위치

  var parkImageSrc = "/static/ParkIcon.svg", // 공원 마커 이미지 URL
    parkImageSize = new kakao.maps.Size(24, 35), // 공원 마커 이미지 크기
    parkImageOption = { offset: new kakao.maps.Point(12, 35) }; // 공원 마커 이미지의 기준 위치

  var libraryMarkerImage = new kakao.maps.MarkerImage(
    libraryImageSrc,
    libraryImageSize,
    libraryImageOption
  );
  var parkMarkerImage = new kakao.maps.MarkerImage(
    parkImageSrc,
    parkImageSize,
    parkImageOption
  );

  var markers = [];
  var infoWindows = []; //markers 배열은 지도에 표시된 모든 마커를 저장하고, infoWindows 배열은 정보 창을 저장합니다.

  function clearMarkers() {
    // 지도에서 모든 마커를 제거하고, markers와 infoWindows 배열을 초기화합니다.
    markers.forEach((marker) => marker.setMap(null));
    markers = [];
    infoWindows = [];
  }

  // 마커표시
  function displayMarkers(locations, image, type) {
    locations.forEach((location) => {
      var latitude, longitude;
      if (type === "library") {
        latitude = location.latitude || 0;
        longitude = location.longitude || 0;
      } else if (type === "park") {
        latitude = location.latitude || 0;
        longitude = location.longitude || 0;
      }

      var markerPosition = new kakao.maps.LatLng(latitude, longitude);
      var marker = new kakao.maps.Marker({
        position: markerPosition,
        image: image // 사용자 정의 마커 이미지 사용
      });

      // 인포 윈도우
      var infoContent;
      if (type === "library") {
        infoContent = `
          <div class="kakao-info-window">
            <h4>${location.name || "정보 없음"}</h4>
            <p>주소: ${location.address || "정보 없음"}</p>
            <p>전화번호: ${location.phone || "정보 없음"}</p>
            <p>운영시간: ${location.hours || "정보 없음"}</p>
            <p>정기 휴관일: ${location.holidays || "정보 없음"}</p>
            ${
              location.url
                ? `<a href="${location.url}" target="_blank">홈페이지</a>`
                : ""
            }
          </div>
        `;
      } else if (type === "park") {
        infoContent = `
          <div class="kakao-info-window">
            <h4>${location.name || "정보 없음"}</h4>
            <p>주소: ${location.address || "정보 없음"}</p>
            <p>전화번호: ${location.phone || "정보 없음"}</p>
          </div>
        `;
      }

      var infoWindow = new kakao.maps.InfoWindow({
        content: infoContent,
        removable: true
      });

      kakao.maps.event.addListener(marker, "click", function () {
        infoWindows.forEach((infoWindow) => infoWindow.close());
        infoWindow.open(map, marker);
      });

      marker.setMap(map);
      markers.push(marker);
      infoWindows.push(infoWindow);
    });
  }

  function fetchAndDisplayData(url, image, type, filter) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          var filteredData = data;

          if (filter && filter.district) {
            filteredData = filteredData.filter(
              (item) => item.district === filter.district
            );
          }

          if (filter && filter.searchTerm) {
            filteredData = filteredData.filter(
              (item) => item.name && item.name.includes(filter.searchTerm)
            );
          }

          displayMarkers(filteredData, image, type);
        } else {
          console.error("Error: Expected array but got", data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  // 도서관 데이터를 가져와서 표시
  function fetchAndDisplayLibraries(filter = {}) {
    fetchAndDisplayData(
      "/api/library_locations",
      libraryMarkerImage,
      "library",
      filter
    );
  }

  // 공원 데이터를 가져와서 표시
  function fetchAndDisplayParks(filter = {}) {
    fetchAndDisplayData("/api/park_locations", parkMarkerImage, "park", filter);
  }

  // 구를 선택, 검색 버튼을 클릭할 때 필터링된 데이터를 가져와서 마커와 정보 창을 표시
  document
    .getElementById("district-select")
    .addEventListener("change", function () {
      var district = this.value;
      clearMarkers();
      fetchAndDisplayLibraries({ district: district });
      fetchAndDisplayParks({ district: district });
    });

  document
    .getElementById("search-button")
    .addEventListener("click", function () {
      var searchTerm = document.getElementById("library-search").value;
      clearMarkers();
      fetchAndDisplayLibraries({ searchTerm: searchTerm });
      fetchAndDisplayParks({ searchTerm: searchTerm });
    });

  // 초기 데이터 로드
  fetchAndDisplayLibraries();
  fetchAndDisplayParks();
});

const mapContainer = document.getElementById("map");
const mapOption = {
  center: new kakao.maps.LatLng(37.566535, 126.97796919999996), // 서울 중심좌표
  level: 5
};

const map = new kakao.maps.Map(mapContainer, mapOption);

let markers = [];

function clearMarkers() {
  markers.forEach((marker) => marker.setMap(null));
  markers = [];
}

async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function createMarker(position, title) {
  const marker = new kakao.maps.Marker({
    map: map,
    position: position,
    title: title
  });
  markers.push(marker);
  return marker;
}

function createInfoWindow(content) {
  return new kakao.maps.InfoWindow({
    content: content
  });
}

async function showLibraries() {
  clearMarkers();
  const libraries = await fetchData("/api/libraries"); // API 엔드포인트 수정 필요
  libraries.forEach((library) => {
    const position = new kakao.maps.LatLng(library.latitude, library.longitude);
    const marker = createMarker(position, library.name);
    const infoWindow = createInfoWindow(`
            <div style="padding:5px;">
                <h4>${library.name}</h4>
                <p>${library.address}</p>
                <p>${library.phone}</p>
                <a href="${library.url}" target="_blank">홈페이지</a>
            </div>
        `);
    kakao.maps.event.addListener(marker, "click", () => {
      infoWindow.open(map, marker);
    });
  });
}

async function showParks() {
  clearMarkers();
  const parks = await fetchData("/api/parks"); // API 엔드포인트 수정 필요
  parks.forEach((park) => {
    const position = new kakao.maps.LatLng(park.latitude, park.longitude);
    const marker = createMarker(position, park.name);
    const infoWindow = createInfoWindow(`
            <div style="padding:5px;">
                <h4>${park.name}</h4>
                <p>${park.address}</p>
                <p>${park.phone}</p>
            </div>
        `);
    kakao.maps.event.addListener(marker, "click", () => {
      infoWindow.open(map, marker);
    });
  });
}

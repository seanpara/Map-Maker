const higherOrderFetch = async (url, options = null) =>
  fetch(url, options)
    .then(res => res.json())
    .catch(error => {
      throw error;
    });

export const fetchAllMaps = higherOrderFetch("http://localhost:8000/api/maps/");

export const createMap = ({ name, viewPort, features }) =>
  higherOrderFetch("http://localhost:8000/api/maps/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    credentials: "same-origin",
    body: JSON.stringify({
      name,
      initial_viewport: viewPort,
      features,
    }),
  });

export const updateMap = (mapId, { name, viewPort, features }) =>
  higherOrderFetch(`http://localhost:8000/api/maps/${mapId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    credentials: "same-origin",
    body: JSON.stringify({
      name,
      initial_viewport: viewPort,
      features,
    }),
  });

export const deleteMap = mapId => {
  higherOrderFetch(`http://localhost:8000/api/maps/${mapId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    credentials: "same-origin",
  });
};

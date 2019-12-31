import React, { useState, useEffect } from "react";
import ReactMapGL from "react-map-gl";
import { Editor, EditorModes } from "react-map-gl-draw";
import "mapbox-gl/dist/mapbox-gl.css";

import * as api from "../utils/api";
import { MAP_BOX_KEY } from "../config/keys";
import { MAP_BOX_STYLE, EDITOR_MODES } from "../Constants";

const MapView = () => {
  const [allMaps, setAllMaps] = useState([]);
  const [selectedMap, setSelectedMap] = useState({
    name: "placeholder map name",
    id: null,
    viewPort: {
      width: 500,
      height: 500,
      latitude: 52.52,
      longitude: 13.405,
      zoom: 5,
    },
    features: [],
    selectedFeatureId: null,
  });

  const [selectedMode, setSelectedMode] = useState(EditorModes.READ_ONLY);

  useEffect(() => {
    const fetchMaps = async () => {
      const fetchedMaps = await api.fetchAllMaps;
      //const [{ features, initial_viewport, name, id }] = fetchedMaps;
      setAllMaps(fetchedMaps);
      // setSelectedMap({
      //   name,
      //   id,
      //   features,
      //   viewPort: initial_viewport,
      //   selectedFeatureId: null,
      // });
    };
    fetchMaps();
  }, []);

  // useEffect(() => {
  //   const { id, name, features, initial_viewport: viewPort } =
  //     allMaps[0] || selectedMap;
  //   setSelectedMap(selectedMap => ({
  //     ...selectedMap,
  //     id,
  //     name,
  //     features,
  //     viewPort,
  //   }));
  // }, [allMaps]);

  useEffect(
    () =>
      setSelectedMap(selectedMap => ({
        ...selectedMap,
        selectedFeatureId: null,
      })),
    [selectedMap.features],
  );

  const switchMode = ({ target: { value } }) =>
    setSelectedMode(value === selectedMode ? null : value);

  const handleUpdate = ({ data }) =>
    setSelectedMap(selectedMap => ({ ...selectedMap, features: data }));

  const handleSelect = ({ selectedFeature }) =>
    setSelectedMap(selectedMap => ({
      ...selectedMap,
      selectedFeatureId: selectedFeature ? selectedFeature.properties.id : null,
    }));

  const handleFeatureDelete = () =>
    setSelectedMap(selectedMap => ({
      ...selectedMap,
      features: selectedMap.features.filter(
        ({ properties: { id } }) => id !== selectedMap.selectedFeatureId,
      ),
    }));
  const handleMapSubmit = () => api.createMap(selectedMap);

  const handleMapUpate = () => api.updateMap(selectedMap.id, selectedMap);

  const handleMapDelete = async () => {
    const { id: deletedMapId } = selectedMap;
    await api.deleteMap(deletedMapId);
    setAllMaps(allMaps => allMaps.filter(({ id }) => id !== deletedMapId));
  };

  const handleInputNameChange = ({ target: { value } }) =>
    setSelectedMap(setSelectedMap => ({ ...setSelectedMap, name: value }));
  const renderMapSelection = () => (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      {allMaps.map(({ name, id, initial_viewport: viewPort, features }) => (
        <button
          key={id}
          onClick={() =>
            setSelectedMap(selectedMap => ({
              ...selectedMap,
              name,
              id,
              viewPort,
              features,
            }))
          }
        >
          {name}
        </button>
      ))}
    </div>
  );

  const renderToolbar = () => (
    <div style={{ position: "absolute", top: 0, right: 0, maxWidth: "320px" }}>
      <select onChange={switchMode}>
        <option value="">--Please choose a mode--</option>
        {EDITOR_MODES.map(({ id, text }) => (
          <option key={id} value={id}>
            {text}
          </option>
        ))}
      </select>
    </div>
  );
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {renderMapSelection()}
      <ReactMapGL
        {...selectedMap.viewPort}
        onViewportChange={newViewPort =>
          setSelectedMap(selectedMap => ({
            ...selectedMap,
            viewPort: newViewPort,
          }))
        }
        mapStyle={MAP_BOX_STYLE}
        mapboxApiAccessToken={MAP_BOX_KEY}
      >
        <Editor
          clickRadius={12}
          mode={selectedMode}
          features={selectedMap.features}
          onUpdate={handleUpdate}
          onSelect={handleSelect}
        />
        {renderToolbar()}
      </ReactMapGL>
      {selectedMap.selectedFeatureId &&
        selectedMode === EditorModes.EDITING && (
          <button onClick={handleFeatureDelete}>Delete This Shape</button>
        )}
      <input type="text" onChange={handleInputNameChange} />
      <button onClick={handleMapSubmit}>Save Map!</button>
      <button onClick={handleMapUpate}>Update Map!</button>
      <button onClick={handleMapDelete}>Delete Map!</button>
    </div>
  );
};

export default MapView;

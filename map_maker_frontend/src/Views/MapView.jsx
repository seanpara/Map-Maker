import React, { useState, useEffect } from "react";
import { EditorModes } from "react-map-gl-draw";

import Map from "../Components/Map";
import * as api from "../api";
import { prepareMapObjects } from "../utils";
import { defaultMap } from "../Constants";

const MapView = () => {
  const [allMaps, setAllMaps] = useState([]);
  const [selectedMap, setSelectedMap] = useState(defaultMap);

  const [selectedMode, setSelectedMode] = useState(EditorModes.READ_ONLY);

  useEffect(() => {
    const fetchMaps = async () => {
      const fetchedMaps = prepareMapObjects(await api.fetchAllMaps);
      const [{ features, viewPort, name, id }] = fetchedMaps;
      setAllMaps(fetchedMaps);
      setSelectedMap({
        name,
        id,
        features,
        viewPort,
        selectedFeatureId: null,
      });
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

  const handleMapSubmit = async () => {
    const {
      id,
      name,
      initial_viewport: viewPort,
      features,
    } = await api.createMap(selectedMap);
    setAllMaps(allMaps => [
      ...allMaps,
      {
        id,
        name,
        viewPort,
        features,
        selectedFeatureId: null,
      },
    ]);
  };

  const handleNewMapSet = () => setSelectedMap(defaultMap);

  const handleMapUpate = async () => {
    await api.updateMap(selectedMap.id, selectedMap);
    setAllMaps(allMaps =>
      allMaps.map(map => (map.id === selectedMap.id ? selectedMap : map)),
    );
  };

  const handleMapDelete = async () => {
    const { id: deletedMapId } = selectedMap;
    await api.deleteMap(deletedMapId);
    setAllMaps(allMaps => allMaps.filter(({ id }) => id !== deletedMapId));
    setSelectedMap(defaultMap);
  };

  const handleInputNameChange = ({ target: { value } }) =>
    setSelectedMap(setSelectedMap => ({ ...setSelectedMap, name: value }));

  const handleMapSelect = ({ features, id, name, viewPort }) => {
    setSelectedMap({
      name,
      id,
      features,
      viewPort,
      selectedFeatureId: null,
    });
  };

  const renderMapSelection = () => (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        overflowX: "scroll",
      }}
    >
      {allMaps.map(mapOption => (
        <button key={mapOption.id} onClick={() => handleMapSelect(mapOption)}>
          {mapOption.name}
        </button>
      ))}
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
      <Map
        selectedMap={selectedMap}
        setSelectedMap={setSelectedMap}
        selectedMode={selectedMode}
        switchMode={switchMode}
        handleUpdate={handleUpdate}
        handleSelect={handleSelect}
        handleFeatureDelete={handleFeatureDelete}
        handleInputNameChange={handleInputNameChange}
        handleNewMapSet={handleNewMapSet}
        handleMapSubmit={handleMapSubmit}
        handleMapUpate={handleMapUpate}
        handleMapDelete={handleMapDelete}
      />
    </div>
  );
};

export default MapView;

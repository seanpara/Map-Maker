import React, { useEffect } from "react";
import ReactMapGL from "react-map-gl";
import { Editor, EditorModes } from "react-map-gl-draw";

import { MAP_BOX_KEY } from "../config/keys";
import { MAP_BOX_STYLE, EDITOR_MODES } from "../Constants";

export default ({
  selectedMap,
  setSelectedMap,
  selectedMode,
  switchMode,
  handleUpdate,
  handleSelect,
  handleFeatureDelete,
  handleInputNameChange,
  handleNewMapSet,
  handleMapSubmit,
  handleMapUpate,
  handleMapDelete,
}) => {
  useEffect(
    () =>
      setSelectedMap(selectedMap => ({
        ...selectedMap,
        selectedFeatureId: null,
      })),
    [selectedMap.features],
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
    <>
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
      <input
        type="text"
        onChange={handleInputNameChange}
        value={selectedMap.name}
      />
      <button onClick={handleNewMapSet}>Create New Map</button>
      <button onClick={handleMapSubmit}>Save Map!</button>
      <button onClick={handleMapUpate}>Update Map!</button>
      <button onClick={handleMapDelete}>Delete Map!</button>
    </>
  );
};

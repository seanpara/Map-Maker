import { EditorModes } from "react-map-gl-draw";

export const MAP_BOX_STYLE =
  "mapbox://styles/sean-para/ck3j4uefz2j2m1co1fvx7lfy6";

export const EDITOR_MODES = [
  { id: EditorModes.EDITING, text: "Select and Edit Feature" },
  { id: EditorModes.DRAW_POINT, text: "Draw Point" },
  { id: EditorModes.DRAW_PATH, text: "Draw Polyline" },
  { id: EditorModes.DRAW_POLYGON, text: "Draw Polygon" },
  { id: EditorModes.DRAW_RECTANGLE, text: "Draw Rectangle" },
];

export const defaultMap = {
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
};

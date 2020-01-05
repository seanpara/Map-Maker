export const prepareMapObjects = allMaps =>
  allMaps.map(({ id, name, initial_viewport: viewPort, features }) => ({
    id,
    name,
    viewPort,
    features,
    selectedFeatureId: null,
  }));

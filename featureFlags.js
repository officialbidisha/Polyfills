const SAMPLE_FEATURES = {
  show_dialog_box: true,
  enable_new_pricing: true,
};

const Cache = {
  timestamp: null,
  featureFlags: {},
};

const MAX_CACHE_TTL = 10000;

// returns the state of *all* features for the current user
function fetchAllFeatures() {
  console.log('---FETCH ALL FEATURES---');
  return new Promise((resolve) => {
    setTimeout(() => resolve(SAMPLE_FEATURES), 100);
  });
}

// Shared promise for ongoing fetch operation
let ongoingFetchPromise = null;

// DO NOT CHANGE THE FUNCTION NAME
function getFeatureState(featureName, defaultValue) {
  // Serve from cache if valid
  if (Cache.featureFlags && Date.now() - Cache.timestamp < MAX_CACHE_TTL) {
    const value = Object.prototype.hasOwnProperty.call(Cache.featureFlags, featureName)
      ? Cache.featureFlags[featureName]
      : defaultValue;
    return Promise.resolve(value);
  }

  // Reuse ongoing fetch promise if available
  if (ongoingFetchPromise) {
    return ongoingFetchPromise.then((featureFlags) => {
      return Object.prototype.hasOwnProperty.call(featureFlags, featureName)
        ? featureFlags[featureName]
        : defaultValue;
    });
  }

  // Initiate a new fetch operation
  ongoingFetchPromise = fetchAllFeatures()
    .then((featureFlags) => {
      Cache.timestamp = Date.now();
      Cache.featureFlags = featureFlags;
      return featureFlags;
    })
    .finally(() => {
      // Clear ongoing fetch promise
      ongoingFetchPromise = null;
    });

  return ongoingFetchPromise.then((featureFlags) => {
    return Object.prototype.hasOwnProperty.call(featureFlags, featureName)
      ? featureFlags[featureName]
      : defaultValue;
  }).catch(() => {
    return defaultValue;
  });
}

// Example Usage
getFeatureState("show_dialog_box", false)
  .then((isEnabled) => {
    if (isEnabled) {
      console.log("Show Dialog Box");
    } else {
      console.log("Do not show Dialog Box");
    }
  });

getFeatureState("enable_new_pricing", false)
  .then((isEnabled) => {
    if (isEnabled) {
      console.log("Enable New Pricing");
    } else {
      console.log("Use Old Pricing");
    }
  });

 * Read FAQs section on the left for more information on how to use the editor
**/
const SAMPLE_FEATURES = {
  show_dialog_box: true,
  enable_new_pricing: true,
};

const Cache = {
  timestamp: null,
  featureFlags: {},
}

const MAX_CACHE_TTL = 10000;

// returns the state of *all* features for the current user
function fetchAllFeatures() {
  // mocking the fetch API call
  console.log('---FETCH ALL FEATURES---');
  return new Promise((resolve) => {
    setTimeout(() => resolve(SAMPLE_FEATURES), 100);
  });
}

// Shared promise for ongoing fetch operation
let ongoingFetchPromise = null;
// DO NOT CHANGE THE FUNCTION NAME
function getFeatureState(featureName, defaultValue) {
  // write your solution here

  if (Cache.featureFlags && Date.now() - Cache.timestamp < MAX_CACHE_TTL) {
    const value = Object.prototype.hasOwnProperty.call(Cache.featureFlags,
      featureName) ? Cache.featureFlags[featureName] : defaultValue;
    return Promise.resolve(value);
  }

  if(ongoingFetchPromise){
    return ongoingFetchPromise.then((featureFlags)=> {
      return Object.prototype.hasOwnProperty.call(featureFlags, 
      featureName)? featureFlags[featureName]: defaultValue;
    })
  }

  ongoingFetchPromise = fetchAllFeatures().then((featureFlags) => {
    Cache.timestamp = Date.now();
    Cache.featureFlags = featureFlags;
    return featureFlags;
  }).catch((err) => {
    return err;
  }).finally(() => {
    // Always clear the promise after resolution or rejection
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

const SAMPLE_FEATURES = {
  show_dialog_box: true,
  enable_new_pricing: true,
  show_pricing_v2: true,
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
  // Serve from cache .if valid
  console.log('cah', Cache);
  if (Cache.featureFlags && Date.now() - Cache.timestamp < MAX_CACHE_TTL) {
    console.log('from caxhe----')
    const value = Cache.featureFlags[featureName] ?? defaultValue;
    return Promise.resolve(value);
  }

  // Reuse ongoing fetch promise if available
  if (ongoingFetchPromise) {
    console.log('---STRUCK------');
    return ongoingFetchPromise.then((featureFlags) => featureFlags[featureName] ?? defaultValue);
  }

  // Initiate a new fetch operation
  ongoingFetchPromise = fetchAllFeatures()
    .then((featureFlags) => {
      Cache.timestamp = Date.now();
      Cache.featureFlags = featureFlags;
    console.log('---set cache----', Cache);
      return featureFlags;
    })
    .finally(() => {
      // Clear ongoing fetch promise
      ongoingFetchPromise = null;
    });

  return ongoingFetchPromise.then((featureFlags) => featureFlags[featureName] ?? defaultValue).catch(() => defaultValue);
}

// Example usage:
getFeatureState("show_pricing_v2", false)
  .then(function (isEnabled) {
    if (isEnabled) {
      showPricingV2();
    } else {
      showOldPricing();
    }
  });

getFeatureState("show_pricing_v2", false)
  .then(function (isEnabled) {
    if (isEnabled) {
      showRedesignedDialog();
    }
  });

setTimeout(()=>{
  getFeatureState("show_pricing_v2", false)
  .then(function (isEnabled) {
    if (isEnabled) {
      showRedesignedDialog();
    }
  });

}, 3000)


// Example feature-specific functions
function showPricingV2() {
  console.log("Showing the new pricing page");
}

function showOldPricing() {
  console.log("Showing the old pricing page");
}

function showRedesignedDialog() {
  console.log("Showing the redesigned dialog");
}


/**
* If you simply return ongoingFetchPromise, the function would return a promise that resolves to all 
feature flags instead of the individual feature flag value you're looking for. 
This would break the intended behavior because you want the specific feature flag value for the given featureName.
* The key is to chain .then() after ongoingFetchPromise resolves, 
so that you can return the correct value (either from the cache or the fetched data).
*/

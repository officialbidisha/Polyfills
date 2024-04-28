const circuitBreaker = (fn, failureCount, timeThreshold) => {
  let failures = 0;
  let timeSinceLastFailure = 0;
  let isClosed = false;
  
  return function(...args){
    // if service is closed
    if(isClosed){
      const diff = Date.now() - timeSinceLastFailure;
      
      // if the time since last failure has exceeded 
      // the time threshold
      // open the service
      if(diff > timeThreshold){
        isClosed = false;
      }
      // else throw error
      else{
        console.error("Service unavailable");
        return;
      }
    }
    
    // try running the function
    // if it passes reset the failure count
    try{
      const result = fn(...args);
      failures = 0;
      return result;
    }
    // if function throws error / fails
    // increase the failure count and 
    // timewhen it fails
    catch(error){
      failures++;
      timeSinceLastFailure = Date.now();
      if(failures >= failureCount){
        isClosed = true;  
      }
      
      console.log("Error");
    }
  }
}

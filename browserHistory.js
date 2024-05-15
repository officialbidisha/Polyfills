

/** To simulate browser history, we need a way to keep track of visited URLs and navigate back and forth.
 We can use two stacks to model the back and forward browser functionality. 
The main stack (stk1) keeps track of the browsing history where the top of the stack is the current page being viewed. 
Another stack (stk2) is used to keep track of the pages that have been gone back from, enabling us to navigate forward.
**/
class BrowserHistory {
  
  /**
   * @param {string} url
   * if url is set, it means new tab with url
   * otherwise, it is empty new tab
   */
  constructor(url) {
    this.backStack = [];
    this.forwardStack = [];
    this.backStack.push(url);
  }
  /**
   * @param { string } url
   */
  visit(url) {
    this.backStack.push(url);
    this.forwardStack = [];
  }
  
  /**
   * @return {string} current url
   */
  get current() {
     return this.backStack[this.backStack.length-1];
  }
  
  // go to previous entry
  goBack() {
    if(this.backStack.length>1){
      let currentEntry = this.backStack.pop();
      this.forwardStack.push(currentEntry);
      return this.backStack[this.backStack.length-1];
    }

  }
  
  // go to next visited url
  forward() {
    if(this.forwardStack.length>1){
      let currentEntry = this.forwardStack.pop();
      this.backStack.push(currentEntry);
      return this.forwardStack[this.forwardStack.length-1];
    }
  }
}

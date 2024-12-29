class BlogPost {
  constructor(baseUrl, authenticationKey, maxTtl = 4000, maxRetryTime = 4) {
    this.baseUrl = baseUrl;
    this.authenticationKey = authenticationKey;
    this.maxTtl = maxTtl;
    this.maxRetryTime = maxRetryTime;
    this.initDelay = 2000;
    this.cache = new Map();
  }

  async makeRequest(endpoint, method, body = null, retryCount = 0) {
    const headers = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.authenticationKey}`,
    });

    const options = {
      method,
      headers,
      body: body !== null ? JSON.stringify(body) : null,
    };

    try {
      let response = await fetch(`${this.baseUrl}${endpoint}`, options);
      if (!response.ok) {
        throw new Error(`Error occured due to ${response.status}`);
      }
      return await response.json();
    } catch (err) {
      if (retryCount < this.maxRetryTime) {
        const delay = this.initDelay * Math.pow(2, retryCount);
        await new Promise((resolve) => setTimeout(resolve, delay));
        return this.makeRequest(endpoint, method, body, retryCount + 1);
      }
      throw err;
    }
  }

  async cachedRequest(endpoint, method, body) {
    let cacheKey = `${endpoint}_${method}`;
    let cachedData = this.cache.get(cacheKey);
    if (cachedData && Date.now() - cachedData.timestamp < this.maxTtl) {
      return cachedData.data;
    }
    const response = await this.makeRequest(endpoint, method, body, 0);
    if (method === HTTP_METHODS.GET) {
      this.cache.set(cacheKey, { data: response, timestamp: Date.now() });
    }
    return response;
  }

  /**
   * Implementation methods
   */

  async getPosts() {
    return this.cachedRequest(`/path`, HTTP_METHODS.GET);
  }

  async getPost(id) {
    return this.cachedRequest(`path?id=${id}`, HTTP_METHODS.GET);
  }

  async createPost(postData) {
    const response = this.cachedRequest(`/path`, HTTP_METHODS.POST, postData);
    this.invalidateCache(`/path`);
    return response;
  }

  async deletePost(id) {
    const response = this.cachedRequest(`/path?id=${id}`, HTTP_METHODS.DELETE);
    this.invalidateCache(`/path?id=${id}`);
    this.invalidateCache(`/path`);
    return response;
  }

  async updatePost(id, postData) {
    const response = this.cachedRequest(
      `path?id=${id}`,
      HTTP_METHODS.PUT,
      postData
    );
    this.invalidateCache(`/path?id=${id}`);
    this.invalidateCache(`/path`);
    return response;
  }

  async invalidateCache(endpoint) {
    for (let key of this.cache.keys()) {
      if (key.startsWith(`${endpoint}_`)) {
        this.cache.delete(key);
      }
    }
  }
}

class BlogClient {
  constructor(baseUrl, authenticationKey, maxTtl = 4000, maxRetry = 3) {
    this.BASE_URL = baseUrl;
    this.AUTH_KEY = authenticationKey;
    this.MAX_TTL = maxTtl;
    this.MAX_RETRY = maxRetry;
    this.INIT_DELAY = 2000;
    this.cache = new Map();
  }

  async getPost(id) {
    this.validateId(id);
    return this.cachedRequest(`/path?id=${id}`, "GET");
  }

  async getAllPosts() {
    return this.cachedRequest(`/path`, "GET");
  }

  async createPost(postData) {
    this.validateBody(postData);
    const result = await this.makeRequest(`/path`, "POST", postData);
    this.invalidateCache(`/path`);
    return result;
  }

  async deletePost(id) {
    this.validateId(id);
    const result = await this.makeRequest(`/path?id=${id}`, "DELETE");
    this.invalidateCache(`/path`);
    this.invalidateCache(`/path?id=${id}`);
    return result;
  }

  async updatePost(id, postData) {
    this.validateId(id);
    this.validateBody(postData);
    const result = await this.makeRequest(`/path?id=${id}`, "PUT", postData);
    this.invalidateCache(`/path`);
    this.invalidateCache(`/path?id=${id}`);
    return result;
  }

  async cachedRequest(endpoint, method, body = null) {
    const cacheKey = `${endpoint}_${method}`;
    const cached = this.cache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < this.MAX_TTL) {
      return cached.data;
    }

    const response = await this.makeRequest(endpoint, method, body);
    if (method === "GET") {
      this.cache.set(cacheKey, { data: response, timestamp: Date.now() });
    }
    return response;
  }

  invalidateCache(endpoint) {
    [...this.cache.keys()]
      .filter((key) => key.startsWith(`${endpoint}_`))
      .forEach((key) => this.cache.delete(key));
  }

  async makeRequest(endpoint, method, body = null, retry = 0) {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.AUTH_KEY}`,
      },
      body: body ? JSON.stringify(body) : null,
    };

    try {
      const response = await fetch(`${this.BASE_URL}${endpoint}`, options);
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      return await response.json();
    } catch (error) {
      if (retry < this.MAX_RETRY) {
        await new Promise((res) => setTimeout(res, this.INIT_DELAY * 2 ** retry));
        return this.makeRequest(endpoint, method, body, retry + 1);
      }
      throw error;
    }
  }

  validateId(id) {
    if (!id || typeof id !== "string") throw new Error("Invalid ID");
  }

  validateBody(body) {
    if (!body || typeof body !== "object") throw new Error("Invalid data");
  }
}

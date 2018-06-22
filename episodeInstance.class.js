const request = require('request-promise-native');

class episodeInstance {
  constructor(uri, port) {
    this.uri = uri;
    this.port = port || 8080;
    this.url = this.uri + ':' + this.port;
    this._body = {
      jsonrpc: '2.0',
      id: 1,
      params: {},
    };
    this._request = function(method, params = {}) {
      this._body.params = params;
      this._body.method = method;
      return request({
        method: 'POST',
        uri: this.url,
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': 1,
        },
        body: this._body,
        json: true,
      });
    };
  }

  getPort() {
    return this.port;
  }

  getVersion() {
    return this._request('getVersion');
  }

  statusBonjour() {
    return this._request('statusBonjour');
  }

  nodeInfoCluster(params) {
    return this._request('nodeInfoCluster', params);
  }

  statusTasks2(params) {
    return this._request('statusTasks2', params);
  }

  statusWorkflows2(params) {
    return this._request('statusWorkflows2', params);
  }

  statusWatchFolders(params) {
    return this._request('statusWatchFolders', params);
  }
}

module.exports = episodeInstance;

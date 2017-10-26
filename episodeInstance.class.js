const request = require('request-promise-native');

class episodeInstance {
    constructor(uri, port) {
        this.uri = uri;
        this.port = port || 8080;
        this.url = this.uri + ':' + this.port;
        this._body = {
            jsonrpc: '2.0',
            id: 1,
            params: {}
        };
        this._build_request = function () {
            return {
                method: 'POST',
                uri: this.url,
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': 1
                },
                body: JSON.stringify(this._body)
            };
        }
    }

    sayPort() {
        return this.port;
    }

    getVersion() {
        this._body.method = 'getVersion';
        return request(this._build_request());
    }

    statusBonjour() {
        this._body.method = 'statusBonjour';
        return request(this._build_request());
    }

    nodeInfoCluster() {
        this._body.method = 'nodeInfoCluster';
        return request(this._build_request());
    }

    statusTasks2(workflowIds, parentId, fields) {
        if (workflowIds) {
            this._body.params['workflow-ids'] = workflowIds;
        }
        if (parentId) {
            this._body.params['parent-id'] = parentId;
        }
        if (fields) {
            this._body.params['fields'] = fields;
        }
        this._body.method = 'statusTasks2';
        return request(this._build_request());
    }

    statusWorkflows2(workflowIds, parentId, running, finished) {
        if (workflowIds) {
            this._body.params['workflow-ids'] = workflowIds;
        }
        if (parentId) {
            this._body.params['parent-id'] = parentId;
        }
        if (running) {
            this._body.params['only-running'] = running;
        }
        if (finished) {
            this._body.params['only-finished'] = finished;
        }
        this._body.method = 'statusWorkflows2';
        return request(this._build_request());
    }

    statusWatchFolders() {
        this._body.method = 'statusWatchFolders';
        return request(this._build_request());
    }
}

module.exports = episodeInstance;

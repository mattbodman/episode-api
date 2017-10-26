const assert = require('assert');
const episodeInstance = require('../episodeInstance.class');
const {describe, it} = require("mocha");


describe('episodeInstance', () => {
    let ei = new episodeInstance('http://10.10.5.55');
    it('should return the default port 8080', () => {
        assert(ei.sayPort() === 8080);
    });

    it('should return a non-default port', () => {
        let ei_port = new episodeInstance('http://10.10.5.55', 80);
        assert(ei_port.sayPort() === 80);
    });

    it('should return the version of Episode', () => {
        ei.getVersion().then((res) => {
            assert(JSON.parse(res).result.API === 2);
        }).catch((err) => {
            throw err;
        });
    });

    it('should return the Bonjour status', () => {
        ei.statusBonjour().then((res) => {
            assert(JSON.parse(res).result.clusters);
        }).catch((err) => {
            throw err;
        });
    });

    it('should return Node Info Cluster', () => {
        ei.nodeInfoCluster().then((res) => {
            assert(JSON.parse(res).result['activated-license-names']);
        }).catch((err) => {
            throw err;
        });
    });

    it('should return statusTasks2', () => {
        ei.statusTasks2().then((res) => {
            assert(JSON.parse(res).result);
        }).catch((err) => {
            throw err;
        });
    });

    it('should return statusTasks2 for specific workflow', () => {
        ei.statusTasks2().then((res) => {
            ei.statusTasks2([Object.keys(JSON.parse(res).result.statuses)[0]]).then((res) => {
                assert(JSON.parse(res).result);
            }).catch((err) => {
                throw err;
            });
        }).catch((err) => {
            throw err;
        });
    });

    it('should return subset of fields from statusTasks2', () => {
        ei.statusTasks2().then((res) => {
            ei.statusTasks2([Object.keys(JSON.parse(res).result.statuses)[0]], null, ['task.progress.fraction', 'task.message']).then((res) => {
                assert(JSON.parse(res).result.statuses[Object.keys(JSON.parse(res).result.statuses)[0]]);
            }).catch((err) => {
                throw err;
            });
        }).catch((err) => {
            throw err;
        });
    });

    it('should return statusWorkflows2', () => {
        ei.statusWorkflows2().then((res) => {
            assert(Object.keys(JSON.parse(res).result.workflows).length>0);
        }).catch((err) => {
            throw err;
        });
    });

    it('should return statusWorkflows2 that are finished only', () => {
        ei.statusWorkflows2(null, null, null, true).then((res) => {
            assert(JSON.parse(res).result);
        }).catch((err) => {
            throw err;
        });
    });

    it('should return statsusWatchFolders', () => {
        ei.statusWatchFolders().then((res) => {
            assert(JSON.parse(res).result);
        }).catch((err) => {
            throw err;
        });
    });
});

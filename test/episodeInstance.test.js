const episodeInstance = require('../episodeInstance.class');
const {assert} = require('chai');

let ei;

before(() => {
  try {
    ei = new episodeInstance('http://10.10.5.50');
  } catch (err) {
    throw err;
  }
});

describe('episodeInstance', () => {
  it('should return the default port 8080', () => {
    assert.strictEqual(ei.getPort(), 8080);
  });

  it('should return a non-default port', () => {
    let ei_port = new episodeInstance('http://10.10.5.55', 80);
    assert(ei_port.getPort() === 80);
  });

  it('should return the version of Episode', async () => {
    try {
      let response = await ei.command('getVersion');
      assert.strictEqual(response.result.API, 2);
    } catch (err) {
      throw err;
    }
  });

  it('should return the Bonjour status', async () => {
    try {
      let response = await ei.command('statusBonjour');
      assert.ok(response.result.clusters);
    } catch (err) {
      throw err;
    }
  });

  it('should return Node Info Cluster', async () => {
    try {
      let response = await ei.command('nodeInfoCluster');
      assert.ok(response.result['activated-license-names']);
    } catch (err) {
      throw err;
    }
  });

  it('should return statusTasks2', async () => {
    try {
      let response = await ei.command('statusTasks2');
      assert.ok(response.result);
    } catch (err) {
      throw err;
    }
  });

  it('should return statusTasks2 for specific workflow', async () => {
    try {
      let response = await ei.command('statusTasks2');
      let workflowId = Object.keys(response.result.statuses)[0];
      response = await ei.command('statusTasks2', {'workflow-ids': [workflowId]});
      assert.ok(response.result.statuses);
    } catch (err) {
      throw err;

    }
  });

  it('should return subset of fields from statusTasks2', async () => {
    try {
      let response = await ei.command('statusTasks2');
      let workflowId = Object.keys(response.result.statuses)[0];
      let params = {
        'workflow-ids': [workflowId],
        fields: ['task.progress.fraction', 'task.message'],
      };
      response = await ei.command('statusTasks2', params);
      assert.ok(response.result.statuses);
    } catch (err) {
      throw err;
    }
  });

  it('should return statusWorkflows2', async () => {
    try {
      let response = await ei.command('statusWorkflows2');
      assert.ok(response.result.workflows);
    } catch (err) {
      throw err;
    }
  });

  it('should return statusWorkflows2 that are finished only', async () => {
    try {
      let response = await ei.command('statusWorkflows2', {finished: true});
      assert.ok(response.result.workflows);
    } catch (err) {
      throw err;
    }
  });

  it('should return statusWatchFolders', async () => {
    try {
      let response = await ei.command('statusWatchFolders');
      assert.ok(response.result.monitors);
    } catch (err) {
      throw err;
    }
  });

  it.only('should get node info for cluster', async () => {
    try {
      let response = await ei.command('nodeInfoCluster');
      assert.ok(response.result['node-id']);
    } catch (err) {
      throw err;
    }
  });
});

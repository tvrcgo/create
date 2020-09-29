
const core = require('@actions/core');
const github = require('@actions/github');

(async () => {
  try {
    const keyId = core.getInput('key-id', { required: true })
    core.setOutput('url', 'a url string')
  } catch (err) {
    core.setFailed(err.message)
  }
})()

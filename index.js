const core = require('@actions/core');
const exec = require('@actions/exec');

(async () => {
  try {
    // `args` input defined in action metadata file
    const args = core.getInput('args');
    console.log(`Running GitVersion with args: ${args}`);
    
    var gitversion = "";
    const options = {};
    options.listeners = {
      stdout: (data) => {
        var output = data.toString();
        gitversion += output;
      }
    };

    await exec.exec("GitVersion", [], options);
    
    core.setOutput('fullsemver', gitversion.FullSemVer);
    console.log(`GitVersion: ${gitversion}`);
  } catch (error) {
    core.setFailed(error.message);
  }
})();

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
    
    const data = JSON.parse(gitversion);

    core.setOutput('major', data.Major);
    core.setOutput('minor', data.Minor);
    core.setOutput('patch', data.Patch);
    core.setOutput('build', data.BuildMetaData);
    core.setOutput('semver', data.SemVer);
    core.setOutput('fullsemver', data.FullSemVer);
    core.setOutput('assemblysemver', data.AssemblySemVer);
    core.setOutput('gitversion', gitversion);

    console.log(`GitVersion: ${gitversion}`);
  } catch (error) {
    core.setFailed(error.message);
  }
})();

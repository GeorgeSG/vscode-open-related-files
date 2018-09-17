import * as assert from 'assert';
import * as vscode from 'vscode';

describe('Open Related Files', () => {
  it('is active after startup', done => {
    setTimeout(() => {
      const extension = vscode.extensions.getExtension('georgesg.open-related-files');
      assert.ok(extension);
      assert.equal(extension!.isActive, true);
      done();
    }, 1000 * 3);
  }).timeout(1000 * 10);

  it('registers commands', done => {
    vscode.commands
      .getCommands(true)
      .then(commands => commands.filter(command => command.startsWith('openRelatedFiles')))
      .then(commands => {
        assert.equal(commands.length > 0, true);
      })
      .then(() => done());
  });
});

import * as assert from 'assert';
import * as vscode from 'vscode';

suite('vscode-open-related-files extension tests', () => {
  test('Extension should be active after startup', done => {
    setTimeout(() => {
      const extension = vscode.extensions.getExtension('georgesg.open-related-files');
      assert.ok(extension);
      assert.equal(extension!.isActive, true);
      done();
    }, 1000 * 3);
  }).timeout(1000 * 10);

  test('registers commands', done => {
    vscode.commands
      .getCommands(true)
      .then(commands => commands.filter(command => command.startsWith('openRelatedFiles')))
      .then(commands => {
        assert.equal(commands.length > 0, true);
      })
      .then(() => done());
  });
});

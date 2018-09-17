import { expect } from 'chai';
import * as vscode from 'vscode';

describe('Open Related Files', () => {
  it('is active after startup', done => {
    setTimeout(() => {
      const extension = vscode.extensions.getExtension('georgesg.open-related-files');

      expect(extension).to.be.ok;
      expect(extension!.isActive).to.be.true;
      done();
    }, 1000 * 3);
  }).timeout(1000 * 10);

  it('registers commands', done => {
    setTimeout(() => {
      vscode.commands
        .getCommands(true)
        .then(commands => commands.filter(command => command.startsWith('openRelatedFiles')))
        .then(commands => {
          expect(commands.length > 0).to.be.true;
        })
        .then(() => done());
    }, 1000 * 3);
  }).timeout(1000 * 10);
});

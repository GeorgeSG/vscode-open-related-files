import { expect } from 'chai';
import * as sinon from 'sinon';
import * as vscode from 'vscode';

import { ExtensionSettings } from '../src/settings';

describe('ExtensionSettings', () => {
  let settings: ExtensionSettings;
  const workspaceConfiguration: vscode.WorkspaceConfiguration = {
    get(key: string): any {
      return key;
    },
    has(_: string): boolean {
      return true;
    },
    inspect() {
      return undefined;
    },
    update(_: string, value: any, __?: boolean): Thenable<void> {
      return value;
    }
  };

  let configStub;
  let getStub;

  beforeEach(() => {
    configStub = sinon.stub(vscode.workspace, 'getConfiguration').returns(workspaceConfiguration);
    settings = new ExtensionSettings();
  });

  afterEach(() => {
    if (configStub) {
      configStub.restore();
    }

    if (getStub) {
      getStub.restore();
    }
  });

  context('initialization', () => {
    it('gets the config from the vscode workspace config', () => {
      expect(configStub.callCount).to.equal(1);
    });
  });

  context('settings', () => {
    describe('#limitToExtensions', () => {
      it('defaults to an empty array', () => {
        getStub = sinon.stub(workspaceConfiguration, 'get').returns(undefined);
        expect(settings.limitToExtensions).to.eql([]);
      });

      it('gets the value from the correct key from the workspace configuration', () => {
        getStub = sinon.stub(workspaceConfiguration, 'get').returns(['ts']);

        expect(settings.limitToExtensions).to.eql(['ts']);

        expect(getStub.callCount).to.equal(1);
        expect(getStub.calledWith('limitToExtensions')).to.be.true;
      });
    });

    describe('#hasLimitToExtensions', () => {
      it('defaults to false', () => {
        getStub = sinon.stub(workspaceConfiguration, 'get').returns(undefined);
        expect(settings.hasLimitToExtensions).to.be.false;
      });

      it('is true when limitToExtensions is set', () => {
        getStub = sinon.stub(workspaceConfiguration, 'get').returns(['ts', 'html']);
        expect(settings.hasLimitToExtensions).to.be.true;
      });

      it('is false when limitToExtensions is set to an empty array', () => {
        getStub = sinon.stub(workspaceConfiguration, 'get').returns([]);
        expect(settings.hasLimitToExtensions).to.be.false;
      });
    });

    describe('#shouldShowExtension', () => {
      it('returns true if limitToExtensions is not set', () => {
        getStub = sinon.stub(workspaceConfiguration, 'get').returns([]);
        expect(settings.shouldShowExtension('test')).to.be.true;
      });

      it("returns false if limitToExtensions is set and doesn't include the passed extension", () => {
        getStub = sinon.stub(workspaceConfiguration, 'get').returns(['html']);
        expect(settings.shouldShowExtension('test')).to.be.false;
      });

      it('returns true if limitToExtensions is set and includes the passed extension', () => {
        getStub = sinon.stub(workspaceConfiguration, 'get').returns(['html']);
        expect(settings.shouldShowExtension('html')).to.be.true;
      });
    });

    describe('#openSingleFile', () => {
      it('gets the value from, the correct key from the workspace configuration', () => {
        getStub = sinon.stub(workspaceConfiguration, 'get').returns(true);

        settings.openSingleFile;

        expect(getStub.callCount).to.equal(1);
        expect(getStub.calledWith('openSingleFile')).to.be.true;
      });

      it('returns true when openSingleFile is set to true', () => {
        getStub = sinon.stub(workspaceConfiguration, 'get').returns(true);
        expect(settings.openSingleFile).to.be.true;
      });

      it('returns false when openSingleFile is set to false', () => {
        getStub = sinon.stub(workspaceConfiguration, 'get').returns(false);
        expect(settings.openSingleFile).to.be.false;
      });
    });
  });
});

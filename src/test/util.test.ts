import { expect } from 'chai';
import * as path from 'path';
import * as sinon from 'sinon';

import * as util from '../util';

describe('util', () => {
  describe('#getOnlyName', () => {
    it('returns only the file name by given file and extension', () => {
      expect(util.getOnlyName('file.ext1.ext')).to.equal('file');
    });

    it("returns the passed value if there's no extension", () => {
      expect(util.getOnlyName('file')).to.equal('file');
    });
  });

  describe('#getFullExtension', () => {
    context('with multiple extensions', () => {
      it('returns all extensions', () => {
        const stub = sinon.stub(path, 'parse').returns({
          ext: '.ext2',
          name: 'file.ext1'
        });

        expect(util.getFullExtension('/path/to/file.ext1.ext')).to.equal('.ext1.ext2');
        expect(stub.callCount).to.equal(1);

        stub.restore();
      });
    });

    context('with a single extension', () => {
      it('returns the extension', () => {
        const stub = sinon.stub(path, 'parse').returns({
          ext: '.ext1',
          name: 'file'
        });

        expect(util.getFullExtension('/path/to/file.ext1')).to.equal('.ext1');
        expect(stub.callCount).to.equal(1);

        stub.restore();
      });
    });
  });
});

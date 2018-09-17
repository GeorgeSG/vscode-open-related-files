import { expect } from 'chai';
import { RelatedFiles } from '../src/relatedFiles';
import { ExtensionSettings } from '../src/settings';

describe('RelatedFiles', () => {
  let relatedFiles: RelatedFiles;

  beforeEach(() => {
    const settings = new ExtensionSettings();
    relatedFiles = new RelatedFiles('/test/path/file.ext1.ext2', settings);
  });

  it('returns the related file with the specified extension', () => {
    expect(relatedFiles.getRelatedFilePath('ext3')).to.equal('/test/path/file.ext3');
  });
});

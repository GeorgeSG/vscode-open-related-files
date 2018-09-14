import * as path from 'path';
import * as fs from 'fs';

import { getOnlyName, getFullExtension } from './util';

class RelatedFiles {
  private dir: string;
  private name: string;
  private ext: string;

  constructor(filePath: string) {
    const parsedPath = path.parse(filePath);

    this.dir = parsedPath.dir;
    this.name = getOnlyName(parsedPath.name);
    this.ext = getFullExtension(filePath);
  }

  /**
   * Returns a list of available extensions from the current directory.
   */
  get extensions(): Array<string> {
    return fs
      .readdirSync(this.dir)
      .filter((fileName) => getOnlyName(fileName) === this.name && fileName !== `${this.name}${this.ext}`)
      .map((fileName) =>
        fileName
          .split('.')
          .splice(1)
          .join('.')
      );
  }

  get folder(): string {
    return this.dir;
  }

  get fileName(): string {
    return this.name;
  }

  getRelatedFile(extension: string): string {
    return `${this.folder}/${this.fileName}.${extension}`;
  }
}

export { RelatedFiles };

import * as path from 'path';
import * as fs from 'fs';
import * as vscode from 'vscode';

import * as util from './util';
import { ExtensionSettings } from './settings';

class RelatedFiles {
  private settings: ExtensionSettings;

  private dir: string;
  private name: string;
  private ext: string;

  constructor(filePath: string, settings: ExtensionSettings) {
    this.settings = settings;

    const parsedPath = path.parse(filePath);

    this.dir = parsedPath.dir;
    this.name = util.getOnlyName(parsedPath.name);
    this.ext = util.getFullExtension(filePath);
  }

  /**
   * Returns a list of all available extensions from the current directory.
   */
  get allExtensions(): Array<string> {
    return fs
      .readdirSync(this.dir)
      .filter((fileName) => {
        return fs.lstatSync(`${this.dir}/${fileName}`).isFile() &&
          util.getOnlyName(fileName) === this.name &&
          fileName !== `${this.name}${this.ext}`;
      })
      .map((fileName) => fileName.split('.').splice(1).join('.'));
  }

  /**
   * Returns a list of all possible extensions to open. Takes 'limitToExtensions' into account.
   */
  get extensions(): Array<string> {
    if (this.settings.hasLimitToExtensions) {
      return this.allExtensions.filter((extension) => this.settings.shouldShowExtension(extension));
    } else {
      return this.allExtensions;
    }
  }

  /**
   * Returns the full path to a related file by a given extension.
   */
  getRelatedFilePath(extension: string): string {
    if (extension) {
      return `${this.dir}/${this.name}.${extension}`;
    } else {
      return `${this.dir}/${this.name}`;
    }
  }

  /**
   * Opens a related file in the active workspace by a given extension.
   */
  async openWithExtension(extension: string): Promise<void> {
    await this.open(this.getRelatedFilePath(extension));
  }

  /**
   * Opens a related file in the active workspace by a given file path.
   */
  async open(filePath: string): Promise<void> {
    if (fs.existsSync(filePath) && fs.lstatSync(filePath).isFile()) {
      const document = await vscode.workspace.openTextDocument(filePath);
      vscode.window.showTextDocument(document);
    } else {
      vscode.window.showInformationMessage("File doesn't exist.");
    }
  }
}

export { RelatedFiles };

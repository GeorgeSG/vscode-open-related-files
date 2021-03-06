import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import * as util from './util';

import { Settings } from './settings';

class RelatedFiles {
  private settings: Settings;

  private dir: string;
  private name: string;
  private ext: string;

  constructor(filePath: string, settings: Settings) {
    this.settings = settings;

    const parsedPath = path.parse(filePath);

    this.dir = parsedPath.dir;
    this.name = util.getOnlyName(parsedPath.name);
    this.ext = util.getFullExtension(filePath);
  }

  /**
   * Returns a list of all available extensions from the current directory.
   */
  get allExtensions(): string[] {
    return fs
      .readdirSync(this.dir)
      .filter(fileName => {
        return (
          fs.lstatSync(`${this.dir}/${fileName}`).isFile() &&
          util.getOnlyName(fileName) === this.name &&
          fileName !== `${this.name}${this.ext}`
        );
      })
      .map(fileName =>
        fileName
          .split('.')
          .splice(1)
          .join('.')
      );
  }

  /**
   * Returns a list of all possible extensions to open. Takes 'limitToExtensions' into account.
   */
  get extensions(): string[] {
    if (this.settings.hasLimitToExtensions) {
      return this.allExtensions.filter(extension => this.settings.shouldShowExtension(extension));
    } else {
      return this.allExtensions;
    }
  }

  /**
   * Opens a related file in the active workspace by a given extension.
   */
  public async openWithExtension(extension: string): Promise<void> {
    await this.open(this.getRelatedFilePath(extension));
  }

  /**
   * Opens a related file in the active workspace by a given file path.
   */
  public async open(filePath: string): Promise<void> {
    if (!fs.existsSync(filePath) || !fs.lstatSync(filePath).isFile()) {
      vscode.window.showWarningMessage("Open Related Files: File doesn't exist.");
      return;
    }

    const document = await vscode.workspace.openTextDocument(filePath);
    vscode.window.showTextDocument(document);
  }

  /**
   * Creates a new file next to the currently opened file with the selected extension.
   */
  public async create(extension: string): Promise<void> {
    const newFilePath = this.getRelatedFilePath(extension);

    if (fs.existsSync(newFilePath) && fs.lstatSync(newFilePath).isFile()) {
      vscode.window.showWarningMessage(
        'Open Related Files: Cannot create related file - it already exists.'
      );
      return;
    }

    fs.appendFileSync(newFilePath, '');
    await this.open(newFilePath);
  }

  /**
   * Returns the full path to a related file by a given extension.
   */
  public getRelatedFilePath(extension: string): string {
    if (extension) {
      return `${this.dir}/${this.name}.${extension}`;
    } else {
      return `${this.dir}/${this.name}`;
    }
  }
}

export { RelatedFiles };

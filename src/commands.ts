import * as vscode from 'vscode';

import { RelatedFiles } from './relatedFiles';
import { ExtensionSettings } from './settings';

class Commands {
  public static readonly OPEN_RELATED_FILES_KEY: string = 'openRelatedFiles.open';
  public static readonly OPEN_RELATED_FILES_WITH_EXTENSION_KEY: string =
    'openRelatedFiles.withExtension';

  public static async openRelatedFiles(): Promise<void> {
    if (!vscode.window.activeTextEditor) {
      vscode.window.showInformationMessage('Open Related Files: You have to open a file first');
      return;
    }

    const filePath = vscode.window.activeTextEditor.document.fileName;

    const settings = new ExtensionSettings();
    const relatedFiles = new RelatedFiles(filePath, settings);
    const extensions = relatedFiles.extensions;

    if (extensions.length === 0) {
      vscode.window.showInformationMessage(
        'Open Related Files: There are no files to choose from.'
      );
      return;
    }

    if (extensions.length === 1 && settings.openSingleFile) {
      await relatedFiles.openWithExtension(extensions[0]);
      return;
    }

    const chosenExtension = await vscode.window.showQuickPick(extensions, {
      placeHolder: 'Choose related file to open'
    });

    if (chosenExtension === undefined) {
      return;
    }

    await relatedFiles.openWithExtension(chosenExtension);
  }

  public static async openRelatedFilesWithExtension(chosenExtension: string) {
    if (!vscode.window.activeTextEditor) {
      vscode.window.showInformationMessage('Open Related Files: You have to open a file first');
      return;
    }

    const filePath = vscode.window.activeTextEditor.document.fileName;
    const relatedFiles = new RelatedFiles(filePath, new ExtensionSettings());
    await relatedFiles.openWithExtension(chosenExtension);
  }
}

export { Commands };

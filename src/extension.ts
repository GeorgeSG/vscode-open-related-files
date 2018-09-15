import * as vscode from 'vscode';

import { RelatedFiles } from './relatedFiles';
import { ExtensionSettings } from './settings';

export function activate(context: vscode.ExtensionContext) {
  const openRelatedFiles = vscode.commands.registerCommand('openRelatedFiles.open', async () => {
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
  });

  const openRelatedFilesWithExtension = vscode.commands.registerCommand(
    'openRelatedFiles.withExtension',
    async (chosenExtension: string) => {
      if (!vscode.window.activeTextEditor) {
        vscode.window.showInformationMessage('Open Related Files: You have to open a file first');
        return;
      }

      const filePath = vscode.window.activeTextEditor.document.fileName;
      const relatedFiles = new RelatedFiles(filePath, new ExtensionSettings());
      await relatedFiles.openWithExtension(chosenExtension);
    }
  );
  context.subscriptions.push(openRelatedFiles);
  context.subscriptions.push(openRelatedFilesWithExtension);
}

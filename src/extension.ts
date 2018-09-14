'use strict';
import * as vscode from 'vscode';

import { RelatedFiles } from './relatedFiles';
import { ExtensionSettings } from './settings';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('extension.openRelatedFiles', async () => {
    if (vscode.window && vscode.window.activeTextEditor) {
      const filePath = vscode.window.activeTextEditor.document.fileName;

      const settings = new ExtensionSettings();
      const relatedFiles = new RelatedFiles(filePath);

      let extensions;

      if (settings.hasLimitToExtensions) {
        extensions = relatedFiles.extensions.filter((extension) => settings.shouldShowExtension(extension));
      } else {
        extensions = relatedFiles.extensions;
      }

      if (extensions.length === 0) {
        vscode.window.showInformationMessage('There are no files to choose from.');
        return;
      }

      const chosenExtension = await vscode.window.showQuickPick(extensions, {
        placeHolder: 'Choose related file to open'
      });

      if (!chosenExtension) {
        return;
      }

      const fileToOpen = relatedFiles.getRelatedFile(chosenExtension);
      const document = await vscode.workspace.openTextDocument(fileToOpen);
      vscode.window.showTextDocument(document);
    } else {
      vscode.window.showInformationMessage('You have to open a file first');
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}

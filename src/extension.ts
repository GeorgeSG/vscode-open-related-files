import * as vscode from 'vscode';

import { Commands } from './commands';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand(Commands.OPEN_RELATED_FILES_KEY, Commands.openRelatedFiles)
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      Commands.OPEN_RELATED_FILES_WITH_EXTENSION_KEY,
      Commands.openRelatedFilesWithExtension
    )
  );
}

'use strict';
import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "open-related-file" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand('extension.sayHello', () => {
    if (vscode.window && vscode.window.activeTextEditor) {
      const filePath = vscode.window.activeTextEditor.document.fileName;
      const dir = path.parse(filePath).dir;
      const fileName = path.parse(filePath).name;

      vscode.window.showInformationMessage(fileName);
      vscode.window.showInformationMessage(`${dir}${fileName}.scss`);
    } else {
      vscode.window.showInformationMessage('You have to open a file first');
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}

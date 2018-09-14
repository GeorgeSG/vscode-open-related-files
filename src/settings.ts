import * as vscode from 'vscode';

class ExtensionSettings {
  private static readonly CONFIG_KEY: string = 'openRelatedFiles';
  private static readonly CONFIG_EXTENSIONS_KEY: string = 'limitToExtensions';

  private configuration: any;

  constructor() {
    this.configuration = vscode.workspace.getConfiguration(ExtensionSettings.CONFIG_KEY);
  }

  get hasLimitToExtensions(): boolean {
    return this.limitToExtensions.length > 0;
  }

  get limitToExtensions(): Array<string> {
    return this.configuration.get(ExtensionSettings.CONFIG_EXTENSIONS_KEY) || [];
  }

  shouldShowExtension(extension: string): boolean {
    return this.hasLimitToExtensions && this.limitToExtensions.indexOf(extension) > -1;
  }
}

export { ExtensionSettings };

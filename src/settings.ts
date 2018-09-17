import * as vscode from 'vscode';

class Settings {
  private static readonly CONFIG_KEY: string = 'openRelatedFiles';
  private static readonly CONFIG_EXTENSIONS_KEY: string = 'limitToExtensions';
  private static readonly CONFIG_OPEN_SINGLE_FILE: string = 'openSingleFile';

  private configuration: vscode.WorkspaceConfiguration;

  constructor() {
    this.configuration = vscode.workspace.getConfiguration(Settings.CONFIG_KEY);
  }

  get hasLimitToExtensions(): boolean {
    return this.limitToExtensions.length > 0;
  }

  get limitToExtensions(): string[] {
    return this.configuration.get(Settings.CONFIG_EXTENSIONS_KEY) || [];
  }

  public shouldShowExtension(extension: string): boolean {
    return this.hasLimitToExtensions === false || this.limitToExtensions.indexOf(extension) > -1;
  }

  get openSingleFile(): boolean {
    return this.configuration.get(Settings.CONFIG_OPEN_SINGLE_FILE);
  }
}

export { Settings };

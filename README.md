# Open Related Files

Open Related Files is a VS Code extension that allows you to quickly navigate files that have the same name as the file you have currently opened.

![VS Code Open Related Files](https://raw.githubusercontent.com/GeorgeSG/vscode-open-related-files/master/images/vscode-open-related-file-demo.gif)

## Features

### Open Related Files QiuckPick list

Use the command `Open Related Files` or the default shortcut cmd+shift+r. This will show the Open Related Files QuickPick list. The list shows all extensions for related files - i.e. if you have opened `main.html` and there are `main.css` and `main.js` files in the same folder, the list will display `css` and `js`.

### Custom shortcuts

If you want to define your own custom shorctuts for specific extensions, use the command `openRelatedFiles.withExtension`

Example:
```
{
  "key": "alt+cmd+c",
   "command": "openRelatedFiles.withExtension",
   "args": "css"
}
```

This shortcut will directly open a related file with `css` extension, if such file exists

## Extension Settings

This extension contributes the following settings:

* `openRelatedFiles.limitToExtensions`: Only look for this specific list of extensions, ignore all other files.

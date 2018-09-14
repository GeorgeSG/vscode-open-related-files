# Open Related Files

Open Related Files is a VS Code extension that allows you to quickly navigate files that have the same name as the file you have currently opened.

![VS Code Open Related Files](https://raw.githubusercontent.com/GeorgeSG/vscode-open-related-files/master/images/vscode-open-related-file-demo.gif)

## Features

### QiuckPick list

Use the command `Open Related Files` or the default shortcut `cmd+shift+r`. This will show the Open Related Files QuickPick list. The list shows all extensions for related files - i.e. if you have opened `main.html` and there are `main.css` and `main.js` files in the same folder, the list will display `css` and `js`.

### Custom shortcuts

**`openRelatedFiles.open`**
  - opens the QuickPick list.
  - default: `cmd+shift+r`.

```
{
  "key": "cmd+shift+r",
  "command": "openRelatedFiles.open",
}
```

**`openRelatedFiles.withExtension`**
  - define your own custom shorctuts for a specific extension.
  - directly opens the related file with the specified extension if such file exists.
```
{
  "key": "alt+cmd+c",
   "command": "openRelatedFiles.withExtension",
   "args": "css"
}
```

## Extension Settings

This extension contributes the following settings:

**`openRelatedFiles.limitToExtensions`**:
  - Type: `Array`
  - Default: `[]`

Only look for this specific list of extensions, ignore all other files. Will be ignored if array is empty.

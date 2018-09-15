# Open Related Files
![](https://github.com/GeorgeSG/vscode-open-related-files/blob/master/images/logo/facebook_cover_photo_2.png)
[![Version](https://vsmarketplacebadge.apphb.com/version-short/georgesg.open-related-files.svg)](https://marketplace.visualstudio.com/items?itemName=georgesg.open-related-files)
[![Installs](https://vsmarketplacebadge.apphb.com/installs-short/georgesg.open-related-files.svg)]
((https://marketplace.visualstudio.com/items?itemName=georgesg.open-related-files))

Open Related Files is a VS Code extension that allows you to quickly navigate files that are in the same folder and have the same name as the file you have currently opened.

## Demo

![VS Code Open Related Files Demo](https://raw.githubusercontent.com/GeorgeSG/vscode-open-related-files/master/images/vscode-open-related-file-demo.gif)

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

**`openRelatedFiles.openSingleFile`**:
  - Type: `boolean`
  - Default: `true`

If there is only one related file, open it without prompt.

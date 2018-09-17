# Open Related Files
![](https://github.com/GeorgeSG/vscode-open-related-files/blob/master/images/logo/facebook_cover_photo_2.png)
[![Version](https://vsmarketplacebadge.apphb.com/version-short/georgesg.open-related-files.svg)](https://marketplace.visualstudio.com/items?itemName=georgesg.open-related-files)
[![Installs](https://vsmarketplacebadge.apphb.com/installs-short/georgesg.open-related-files.svg)](https://marketplace.visualstudio.com/items?itemName=georgesg.open-related-files)
[![Build Status](https://travis-ci.org/GeorgeSG/vscode-open-related-files.svg?branch=master)](https://travis-ci.org/GeorgeSG/vscode-open-related-files)

A "Related file" is a file that has the same name and is in the same folder as the file you have currently opened. "Open Related Files" is a VS Code extension that allows you to quickly navigate and create related files.

## Demo

![VS Code Open Related Files Demo](https://raw.githubusercontent.com/GeorgeSG/vscode-open-related-files/master/images/vscode-open-related-file-demo.gif)

## Features

### Open Related Files

Use the command `Open Related Files` or the default shortcut `cmd+shift+r`.

This will show the Open Related Files QuickPick list. The list shows all extensions for related files - i.e. if you have opened `main.html` and there are `main.css` and `main.js` files in the same folder, the list will display `css` and `js`.

Pick an extension to open a related file.

If there is only one related file, it'll be opened by default. See `openRelatedFiles.openSingleFile` for changing the default behavior.

### Create Related File

Use the command `Create Related File` to create a new file next to the currently opened one. You'll be prompted for an extension. The new file will have the same name and the extension that you specified.

## Commands and Keyboard Shortcuts

#### `openRelatedFiles.open`
  - Opens the QuickPick list.
  - Default: `cmd+shift+r`.

Example / Default:
```
{
  "key": "cmd+shift+r",
  "command": "openRelatedFiles.open",
}
```

#### `openRelatedFiles.withExtension`
  - Define your own custom shorctuts for a specific extension.
  - Directly opens the related file with the specified extension if such file exists.
  - No default shortcut provided.

Example:
```
{
  "key": "alt+cmd+c",
   "command": "openRelatedFiles.withExtension",
   "args": "css"
}
```

#### `openRelatedFiles.create`
  - Execute the 'Create Related File' command.
  - No default shortcut provided.

## Extension Settings

This extension contributes the following settings:

#### `openRelatedFiles.limitToExtensions`
  - Type: `Array`
  - Default: `[]`

Only look for the specified list of extensions, ignore all other files. Setting will be ignored if the array is empty.

#### `openRelatedFiles.openSingleFile`
  - Type: `boolean`
  - Default: `true`

If there is only one related file, open it without prompt.

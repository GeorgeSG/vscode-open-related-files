import * as path from 'path';

/**
 * Returns a "full" extension given an absolute filepath. A full extension includes everything after the first dot in
 * the filename.
 * Input: "/absolute/path/to/filename.ext1.ext2"
 * Output ".ext1.ext2"
 * @param filePath
 */
export function getFullExtension(filePath) {
  const parsedPath = path.parse(filePath);
  const { name, ext } = parsedPath;

  if (name.indexOf('.') > -1) {
    return `.${name
      .split('.')
      .slice(1)
      .join('.')}${ext}`;
  } else {
    return ext;
  }
}

/**
 * Input: "filename.ext1.ext2"
 * Output: "filename"
 * @param name
 */
export function getOnlyName(name) {
  return name.indexOf('.') > -1 ? name.split('.')[0] : name;
}

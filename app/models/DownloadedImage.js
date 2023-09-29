import RNFS from 'react-native-fs';
import BaseModel from './BaseModel';
import fileUtil from '../utils/file_util';
import uuidv4 from '../utils/uuidv4';
import images from '../assets/images';

const MODEL = "DownloadedImage"

class DownloadedImage {
  static getAll() {
    return BaseModel.getAll(MODEL);
  }

  static create(data) {
    BaseModel.create(MODEL, {...data, uuid: uuidv4()})
  }

  static findByName(name) {
    return BaseModel.findByAttr(MODEL, {name: `'${name}'`})[0]
  }

  static isFileNameExisted(fileUrl) {
    return !!this.findByName(fileUtil.getFilenameFromUrl(fileUrl))
  }

  static getImagePath(fileUrl) {
    if (!fileUrl) return null;

    const downloadedImage = this.findByName(fileUtil.getFilenameFromUrl(fileUrl))
    return !!downloadedImage ? `file://${RNFS.DocumentDirectoryPath}/${downloadedImage.name}` : null
  }

  static getLocalImage(fileUrl) {
    if (!fileUrl) return null;

    const filename = fileUrl.split('/').at(-1).split('.')[0];     // get the file name with the extension (ex: rupp)
    return images[filename] ? images[filename] : null;
  }
}

export default DownloadedImage;
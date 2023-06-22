import fileDownloadService from './file_download_service'
import DownloadedImage from '../models/DownloadedImage';
import fileUtil from '../utils/file_util';

const imageDownloadService = (() => {
  return {
    handleDownloadItemsLogo
  }

  function handleDownloadItemsLogo(index, items, callback) {
    if (index >= items.length)
      return !!callback && callback();

    const item = items[index]  
    if (item.logo.url != null && !DownloadedImage.isFileNameExisted(item.logo.url) && fileUtil.isFileImage(item.logo.url)) {
      fileDownloadService.download(item.logo.url, (filename, isNewFile) => {
        !!isNewFile && DownloadedImage.create({name: filename})
        this.handleDownloadItemsLogo(index + 1, items, callback)
      }, () => this.handleDownloadItemsLogo(index + 1, items, callback))
    }
    else this.handleDownloadItemsLogo(index + 1, items, callback)
  }
})()

export default imageDownloadService
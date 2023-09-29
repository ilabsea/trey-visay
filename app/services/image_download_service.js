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
    let logoUrl = null;
    if (item.logo && item.logo.url)
      logoUrl = item.logo.url;
    else if (item.logo_url)
      logoUrl = item.logo_url;

    if (logoUrl != null && !DownloadedImage.isFileNameExisted(logoUrl) && fileUtil.isFileImage(logoUrl)) {
      fileDownloadService.download(logoUrl, (filename, isNewFile) => {
        !!isNewFile && DownloadedImage.create({name: filename})
        this.handleDownloadItemsLogo(index + 1, items, callback)
      }, () => this.handleDownloadItemsLogo(index + 1, items, callback))
    }
    else this.handleDownloadItemsLogo(index + 1, items, callback)
  }
})()

export default imageDownloadService
const fileUtil = (() => {
  return {
    getFilenameFromUrl,
    isFileImage
  }

  function getFilenameFromUrl(url) {
    const urlWithoutQueryString = url.split('?')[0];
    const splitedPaths = urlWithoutQueryString.split('/');
    return splitedPaths[splitedPaths.length - 1];
  }

  function isFileImage(fileName) {
    const extensions = ['.jpg', '.jpeg', '.png']
    for(let i = 0; i < extensions.length; i++) {
      if (fileName.endsWith(extensions[i]))
        return true
    }
    return false
  }
})()

export default fileUtil;
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
    const fileExtension = fileName.split('/').at(-1).split('.').at(-1);   // get the file extension from the file name (ex: jpg, png, ...)
    const extensions = ['jpg', 'jpeg', 'png']
    for(let i = 0; i < extensions.length; i++) {
      if (!!fileExtension && fileExtension.toLowerCase() == extensions[i])
        return true
    }
    return false
  }
})()

export default fileUtil;
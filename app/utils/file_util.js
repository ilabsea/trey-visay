const fileUtil = (() => {
  return {
    getFilenameFromUrl
  }

  function getFilenameFromUrl(url) {
    const urlWithoutQueryString = url.split('?')[0];
    const splitedPaths = urlWithoutQueryString.split('/');
    return splitedPaths[splitedPaths.length - 1];
  }
})()

export default fileUtil;
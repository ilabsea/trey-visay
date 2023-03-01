import UploadServices from '../services/upload_services';

const UploadWorker = (() => {
  return {
    performAsync
  }

  function performAsync() {
    UploadServices.syncToServer();
  }
})();

export default UploadWorker;

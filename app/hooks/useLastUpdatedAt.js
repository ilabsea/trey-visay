import asyncStorageService from '../services/async_storage_service';

export const lastUpdateAtKeys = {
  school: 'SCHOOL_LAST_UPDATED_AT',
  highSchool: 'HIGH_SCHOOL_LAST_UPDATED_AT',
  careerWebsite: 'CAREER_WEBSITE_LAST_UPDATED_AT',
  major: 'MAJOR_LAST_UPDATED_AT',
  video: 'VIDEO_LAST_UPDATED_AT',
  job: 'JOB_LAST_UPDATED_AT',
  jobCluster: 'JOB_CLUSTER_LAST_UPDATED_AT',
}

const useLastUpdatedAt = async (model, storageKey) => {
  let updatedAt = await asyncStorageService.getItem(storageKey);

  if(!updatedAt) {
    updatedAt = model.getLastUpdatedAt();
    asyncStorageService.setItem(storageKey, updatedAt);
    return updatedAt;
  }

  return updatedAt;
}

export default useLastUpdatedAt;

import authStorage from "../auth/storage";
import Visit from '../models/Visit';
import SidekiqJob from '../models/SidekiqJob';
import uuidv4 from '../utils/uuidv4';

const detailTypes = {
  school: { pageable_type: 'School', code: 'school_detail', parent_code: 'school', name: 'school detail' },
  job: { pageable_type: 'Job', code: 'job_detail', parent_code: 'job', name: 'job detail' },
  video: { pageable_type: 'Video', code: 'video_detail', parent_code: 'video', name: 'video detail' }
}

const visitService = (() => {
  return {
    recordVisitPage,
    recordVisitDetailScreen,
  }

  function recordVisitPage(code, name, parentCode = null) {
    _saveVisit({ pageable_type: "Page", code: code, name: name, parent_code: parentCode});
  }

  function recordVisitDetailScreen(type, pageableId) {
    _saveVisit({ ...detailTypes[type], pageable_id: pageableId });
  }

  // private method
  async function _saveVisit(params) {
    const user = await authStorage.getUser();
    const data = {
      uuid: uuidv4(),
      name: params.name,
      code: params.code,
      parent_code: params.parent_code || null,
      pageable_id: !!params.pageable_id ? params.pageable_id.toString() : null,
      pageable_type: params.pageable_type,
      user_id: (!!user && user.serverId) ? user.serverId : null
    }
    Visit.write(() => {
      Visit.create(data);
      SidekiqJob.create(data.uuid, 'uploadVisit');
    });
  }
})();

export default visitService;
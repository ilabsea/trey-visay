import authStorage from "../auth/storage";
import Visit from '../models/Visit';
import SidekiqJob from '../models/SidekiqJob';
import uuidv4 from '../utils/uuidv4';
import {pageAttrs, detailScreenAttrs} from '../constants/visit_constant';

const visitService = (() => {
  return {
    recordVisitPage,
    recordVisitDetailScreen,
    recordAppVisit,
  }

  function recordVisitPage(code, name = null, parentCode = null) {
    if (!!parentCode)
      return _saveAndSubmitToServer({...pageAttrs[code], code: code, name: name, parent_code: parentCode});

    _saveAndSubmitToServer(pageAttrs[code])
  }

  function recordVisitDetailScreen(type, pageableId) {
    _saveAndSubmitToServer({ ...detailScreenAttrs[type], pageable_id: pageableId });
  }

  function recordAppVisit() {
    const data = {
      code: 'app_visit',
      name: 'App visit',
      parent_code: null,
      pageable_type: 'Page'
    };
    _saveAndSubmitToServer(data);
  }

  // private method
  async function _saveAndSubmitToServer(params) {
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
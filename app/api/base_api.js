import client from "./client";

export default class BaseApi {
  constructor(responsibleModel, subModel = '') {
    this.responsibleModel = responsibleModel;
    this.subModel = subModel;
  }

  load = (updatedAt, successCallback, failureCallback) => {
    client.get(this.responsibleModel, {updated_at: updatedAt})
          .then((res) => {
            if (res.ok)
              successCallback && successCallback(res.data)
            else
              failureCallback && failureCallback(res)
          })
  }
}